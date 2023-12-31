import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "../db/schema";
import { db } from "../db/db";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    console.log({ attributes })
    return {
      githubId: attributes.githubId,
      name: attributes.name,
      avatar: attributes.avatar,
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }

  interface DatabaseUserAttributes {
    githubId: number;
    name: string;
    avatar: string;
  }
}
