import { cookies } from "next/headers";
// eslint-disable-next-line import/named -- missing types?
import { cache } from "react";
import type { Session, User } from "lucia";
import { lucia } from "./lucia";

export interface SessionObject {
  user: User | null;
  session: Session | null;
}

export async function getSession(): Promise<SessionObject> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  if (result.session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!result.session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  return result;
}

export const getCachedSession = cache(getSession);
