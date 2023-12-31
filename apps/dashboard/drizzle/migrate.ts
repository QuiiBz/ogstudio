import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { client, db } from '../src/lib/db/db';

async function run() {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle' });
  // Don't forget to close the connection, otherwise the script will hang
  client.close();
}

run().then(null).catch(console.error)

