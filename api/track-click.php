<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

t2e_apply_cors();
t2e_require_post();

try {
    $body = t2e_read_json();

    $sessionId = (string) ($body['session_id'] ?? '');
    $trigger   = (string) ($body['trigger_source'] ?? '');

    if (!t2e_session_id_valid($sessionId)) {
        t2e_json(['error' => 'invalid_session_id'], 400);
    }
    if (!in_array($trigger, T2E_ALLOWED_TRIGGERS, true)) {
        t2e_json(['error' => 'invalid_trigger_source'], 400);
    }

    $ip = t2e_client_ip();
    $ipHash = $ip !== '' ? t2e_hash_ip($ip) : null;

    if ($ipHash !== null && !t2e_rate_limit_ok($ipHash, 'track')) {
        t2e_json(['error' => 'rate_limited'], 429);
    }

    $userAgent  = t2e_truncate($_SERVER['HTTP_USER_AGENT'] ?? null, 1000);
    $referrer   = t2e_truncate(isset($body['referrer']) ? (string) $body['referrer'] : null, 1000);
    $utmSource   = t2e_truncate(isset($body['utm_source'])   ? (string) $body['utm_source']   : null, 100);
    $utmMedium   = t2e_truncate(isset($body['utm_medium'])   ? (string) $body['utm_medium']   : null, 100);
    $utmCampaign = t2e_truncate(isset($body['utm_campaign']) ? (string) $body['utm_campaign'] : null, 100);

    $pdo = t2e_pdo();
    $stmt = $pdo->prepare(
        'INSERT INTO leads
            (session_id, trigger_source, user_agent, referrer,
             utm_source, utm_medium, utm_campaign, ip_hash)
         VALUES
            (:session_id, :trigger_source, :user_agent, :referrer,
             :utm_source, :utm_medium, :utm_campaign, :ip_hash)'
    );
    $stmt->execute([
        ':session_id'     => $sessionId,
        ':trigger_source' => $trigger,
        ':user_agent'     => $userAgent,
        ':referrer'       => $referrer,
        ':utm_source'     => $utmSource,
        ':utm_medium'     => $utmMedium,
        ':utm_campaign'   => $utmCampaign,
        ':ip_hash'        => $ipHash,
    ]);

    t2e_json([
        'success' => true,
        'lead_id' => (int) $pdo->lastInsertId(),
    ]);
} catch (Throwable $e) {
    error_log('[track-click] ' . $e->getMessage());
    t2e_json(['error' => 'server_error'], 500);
}
