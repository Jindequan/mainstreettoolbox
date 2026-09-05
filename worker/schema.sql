CREATE TABLE IF NOT EXISTS hits (
  day    TEXT NOT NULL,           -- UTC 日期 'YYYY-MM-DD'
  slug   TEXT NOT NULL,           -- 工具标识（allowlist 校验）
  iphash TEXT NOT NULL,           -- SHA-256(ip|ua) 前 12 hex —— 无法反推 IP
  n      INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (day, slug, iphash)
);
CREATE INDEX IF NOT EXISTS idx_hits_slug_day ON hits (slug, day);
