import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import { config } from "dotenv";

if (!process.env.DATABASE_URL) {
  config({
    path: "../../apps/dashboard/.env",
  });
}

export const client = createClient({
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_AUTH_TOKEN ?? "",
});

export const db = drizzle(client);
export { eq } from 'drizzle-orm'
