"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCachedSession } from "@ogstudio/auth/api";
import { lucia } from "@ogstudio/auth/lucia";

export async function logoutAction() {
  const { session } = await getCachedSession();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}
