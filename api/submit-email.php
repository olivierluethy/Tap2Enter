<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

t2e_apply_cors();
t2e_require_post();

try {
    $body = t2e_read_json();

    // Honeypot: if a bot filled the hidden "website" field, accept silently.
    // We deliberately return 200 so scrapers can't tell they were caught.
    if (!empty($body['website'])) {
        t2e_json(['success' => true]);
    }

    $sessionId = (string) ($body['session_id'] ?? '');
    $email     = trim((string) ($body['email'] ?? ''));
    $leadId    = isset($body['lead_id']) ? (int) $body['lead_id'] : 0;

    if (!t2e_session_id_valid($sessionId)) {
        t2e_json(['error' => 'invalid_session_id'], 400);
    }
    if ($leadId <= 0) {
        t2e_json(['error' => 'invalid_lead_id'], 400);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) {
        t2e_json(['error' => 'invalid_email'], 400);
    }

    $ip = t2e_client_ip();
    $ipHash = $ip !== '' ? t2e_hash_ip($ip) : null;

    if ($ipHash !== null && !t2e_rate_limit_ok($ipHash, 'submit')) {
        t2e_json(['error' => 'rate_limited'], 429);
    }

    $pdo = t2e_pdo();
    $stmt = $pdo->prepare(
        'UPDATE leads
            SET email = :email,
                email_submitted_at = NOW()
          WHERE id = :id
            AND session_id = :session_id'
    );
    $stmt->execute([
        ':email'      => $email,
        ':id'         => $leadId,
        ':session_id' => $sessionId,
    ]);

    if ($stmt->rowCount() === 0) {
        // Either the lead_id doesn't exist, or session_id doesn't match the
        // row — both look the same from the outside, which is what we want.
        t2e_json(['error' => 'lead_not_found'], 400);
    }

    t2e_json(['success' => true]);
} catch (Throwable $e) {
    error_log('[submit-email] ' . $e->getMessage());
    t2e_json(['error' => 'server_error'], 500);
}
