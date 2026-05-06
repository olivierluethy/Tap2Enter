-- Tap2Enter — rate_limits table
-- Simple sliding-window-ish rate limit keyed by ip_hash + endpoint.
-- One row per (ip_hash, endpoint, minute-bucket). Cheap to write, cheap to GC.

CREATE TABLE IF NOT EXISTS rate_limits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip_hash VARCHAR(64) NOT NULL,
  endpoint VARCHAR(64) NOT NULL,
  window_start TIMESTAMP NOT NULL,
  hits INT NOT NULL DEFAULT 1,
  UNIQUE KEY uniq_window (ip_hash, endpoint, window_start),
  INDEX idx_window_start (window_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
