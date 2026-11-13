import "server-only";
import { accessSync, constants, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { ContactFormValues } from "@/lib/schemas/contact";

/**
 * Where the SQLite file lives:
 * 1. CONTACT_DB_PATH, when set;
 * 2. ./data/contact.db (gitignored) when the project folder is writable — local dev and `next start`;
 * 3. the OS temp folder on read-only deploys (e.g. Vercel). It works there, but the data is ephemeral.
 */
function resolveDbPath(): string {
  if (process.env.CONTACT_DB_PATH) return process.env.CONTACT_DB_PATH;

  const dataDir = path.join(process.cwd(), "data");
  try {
    mkdirSync(dataDir, { recursive: true });
    accessSync(dataDir, constants.W_OK);
    return path.join(dataDir, "contact.db");
  } catch {
    return path.join(tmpdir(), "luma-contact.db");
  }
}

let db: DatabaseSync | undefined;

function getDb(): DatabaseSync {
  if (!db) {
    const dbPath = resolveDbPath();
    mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        question   TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }
  return db;
}

/** Stores one contact message. Values must already be validated by `contactSchema`. */
export function saveContactMessage({ name, email, question }: ContactFormValues): void {
  getDb().prepare("INSERT INTO contact_messages (name, email, question) VALUES (?, ?, ?)").run(name, email, question);
}
