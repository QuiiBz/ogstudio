import { config } from "dotenv";
import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  config({
    path: "../../apps/dashboard/.env",
  });
}

export default {
  schema: "./schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
