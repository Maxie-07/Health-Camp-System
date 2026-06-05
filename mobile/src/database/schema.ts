export const SCHEMA_VERSION = 1;

export const TABLES = {
  beneficiaries: `
    CREATE TABLE IF NOT EXISTS beneficiaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      server_id INTEGER,
      full_name TEXT NOT NULL,
      phone TEXT,
      national_id TEXT,
      qr_code TEXT,
      camp_location TEXT,
      updated_at TEXT
    );
  `,
  visits: `
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      server_id INTEGER,
      beneficiary_id INTEGER NOT NULL,
      visit_date TEXT,
      vitals TEXT,
      diagnosis TEXT,
      treatment TEXT,
      updated_at TEXT
    );
  `,
  sync_queue: `
    CREATE TABLE IF NOT EXISTS sync_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `,
};
