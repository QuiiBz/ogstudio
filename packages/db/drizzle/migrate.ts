import { config } from "dotenv";

import { migrate } from "drizzle-orm/libsql/migrator";
import { client, db } from "../db";

if (!process.env.DATABASE_URL) {
  config({
    path: "../../apps/dashboard/.env",
  });
}

async function run() {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./drizzle" });
  // Don't forget to close the connection, otherwise the script will hang
  client.close();
}

run().then(null).catch(console.error);
