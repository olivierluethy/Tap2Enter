<?php
declare(strict_types=1);

// Minimal .env loader. No Composer on shared hosting — keep it tiny.
function t2e_load_env(string $path): void {
    if (!is_readable($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) return;
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || $line[0] === ';') continue;
        $eq = strpos($line, '=');
        if ($eq === false) continue;
        $key = trim(substr($line, 0, $eq));
        $val = trim(substr($line, $eq + 1));
        if ((str_starts_with($val, '"') && str_ends_with($val, '"'))
            || (str_starts_with($val, "'") && str_ends_with($val, "'"))) {
            $val = substr($val, 1, -1);
        }
        if ($key !== '' && getenv($key) === false) {
            putenv("$key=$val");
            $_ENV[$key] = $val;
        }
    }
}

t2e_load_env(__DIR__ . '/.env');

function t2e_env(string $key, ?string $default = null): ?string {
    $v = getenv($key);
    if ($v === false || $v === '') {
        return $_ENV[$key] ?? $default;
    }
    return $v;
}

const T2E_ALLOWED_TRIGGERS = [
    'demo_hero',
    'demo_other',
    'early_access_hero',
    'early_access_nav',
    'early_access_cta',
];
