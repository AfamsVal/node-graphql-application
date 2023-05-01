import { createConnection, Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection: Connection;

async function connect(): Promise<Connection> {
  if (!connection) {
    if (process.env.NODE_ENV === "production") {
      // production configuration
      connection = await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
    } else if (process.env.NODE_ENV === "test") {
      // test configuration
      connection = await createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "test_db",
      });
    } else {
      //developement
      connection = await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "dev_test",
      });
    }
  }
  try {
    await connection.connect();
    console.log("Connected to MySQL server");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return connection;
}

async function query(sql: string, values?: any[]): Promise<any> {
  const conn = await connect();
  try {
    const [rows, fields] = await conn.query(sql, values);
    return rows;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { connect, query };
