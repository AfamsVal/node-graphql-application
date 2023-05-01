import { Connection } from "mysql2/promise";

async function getUserByUsername(db: Connection, userId: string) {
  const [rows] = await db.execute("SELECT * FROM users WHERE id = ? LIMIT 1", [
    userId,
  ]);
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

export { getUserByUsername };
