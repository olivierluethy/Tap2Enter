-- Tap2Enter — leads table
-- Each click creates a row (email NULL). Modal-submit later UPDATES the same
-- row by (lead_id, session_id) so we can distinguish "clicked but didn't
-- convert" from "clicked + entered email".

CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  session_id VARCHAR(64) NOT NULL,
  trigger_source ENUM(
    'demo_hero',
    'demo_other',
    'early_access_hero',
    'early_access_nav',
    'early_access_cta'
  ) NOT NULL,
  email VARCHAR(255) NULL,
  email_submitted_at TIMESTAMP NULL,
  user_agent TEXT NULL,
  referrer TEXT NULL,
  utm_source VARCHAR(100) NULL,
  utm_medium VARCHAR(100) NULL,
  utm_campaign VARCHAR(100) NULL,
  ip_hash VARCHAR(64) NULL,
  INDEX idx_session (session_id),
  INDEX idx_created (created_at),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
