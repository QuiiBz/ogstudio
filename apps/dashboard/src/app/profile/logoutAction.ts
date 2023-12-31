"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth/api";
import { lucia } from "../../lib/auth/lucia";

export async function logoutAction() {
  const { session } = await getSession()

  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/login");
}


