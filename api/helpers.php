<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

function t2e_apply_cors(): void {
    $allowed = array_filter(array_map('trim', explode(',', t2e_env('ALLOWED_ORIGINS', '') ?? '')));
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 600');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function t2e_require_post(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        t2e_json(['error' => 'method_not_allowed'], 405);
    }
}

function t2e_json($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function t2e_read_json(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return [];
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        t2e_json(['error' => 'invalid_json'], 400);
    }
    return $data;
}

function t2e_client_ip(): string {
    return $_SERVER['REMOTE_ADDR'] ?? '';
}

function t2e_hash_ip(string $ip): string {
    $salt = t2e_env('IP_HASH_SALT', '') ?? '';
    if ($salt === '') {
        // Fail loud rather than silently weakening the hash.
        throw new RuntimeException('IP_HASH_SALT not configured.');
    }
    return hash('sha256', $salt . '|' . $ip);
}

function t2e_session_id_valid(string $s): bool {
    // Accept UUID v4-ish (8-4-4-4-12) plus any 32+ char alnum-with-dashes.
    return (bool) preg_match('/^[0-9a-fA-F-]{32,64}$/', $s);
}

function t2e_truncate(?string $s, int $max): ?string {
    if ($s === null) return null;
    $s = trim($s);
    if ($s === '') return null;
    return mb_substr($s, 0, $max);
}

/**
 * Per-IP-hash + per-endpoint rate limit. Returns true when within budget,
 * false when over. Uses a 1-minute bucket so we never need a cleanup cron
 * for correctness — old buckets just sit there until you GC.
 */
function t2e_rate_limit_ok(string $ipHash, string $endpoint): bool {
    $maxPerMinute = (int) (t2e_env('RATE_LIMIT_PER_MINUTE', '10') ?? '10');
    if ($maxPerMinute <= 0) return true;

    $pdo = t2e_pdo();
    $bucket = (new DateTimeImmutable('@' . (time() - (time() % 60))))
        ->setTimezone(new DateTimeZone('UTC'))
        ->format('Y-m-d H:i:s');

    $stmt = $pdo->prepare(
        'INSERT INTO rate_limits (ip_hash, endpoint, window_start, hits)
         VALUES (:ip, :ep, :win, 1)
         ON DUPLICATE KEY UPDATE hits = hits + 1'
    );
    $stmt->execute([':ip' => $ipHash, ':ep' => $endpoint, ':win' => $bucket]);

    $stmt = $pdo->prepare(
        'SELECT hits FROM rate_limits WHERE ip_hash = :ip AND endpoint = :ep AND window_start = :win'
    );
    $stmt->execute([':ip' => $ipHash, ':ep' => $endpoint, ':win' => $bucket]);
    $hits = (int) ($stmt->fetchColumn() ?: 0);

    // Best-effort GC of buckets older than 1h. Cheap, runs on ~every request.
    try {
        $pdo->exec("DELETE FROM rate_limits WHERE window_start < (NOW() - INTERVAL 1 HOUR)");
    } catch (Throwable $e) {
        // ignore
    }

    return $hits <= $maxPerMinute;
}
