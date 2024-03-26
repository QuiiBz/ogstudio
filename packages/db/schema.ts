import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  githubId: integer("github_id").unique(),
  googleId: text("google_id").unique(),
  name: text("name").notNull(), // Migrated from username
  avatar: text("avatar").notNull().default(""),
});

export const sessionTable = sqliteTable("user_session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});
