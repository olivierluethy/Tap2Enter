<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function t2e_pdo(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $host = t2e_env('DB_HOST', 'localhost');
    $name = t2e_env('DB_NAME');
    $user = t2e_env('DB_USER');
    $pass = t2e_env('DB_PASS', '');
    $charset = t2e_env('DB_CHARSET', 'utf8mb4');

    if (!$name || !$user) {
        throw new RuntimeException('Database credentials not configured.');
    }

    $dsn = "mysql:host=$host;dbname=$name;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}
