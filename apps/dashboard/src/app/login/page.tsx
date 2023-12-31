import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth/api";
import { lucia } from "../../lib/auth/lucia";

async function logout() {
  "use server";
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

export default function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <Link href="/login/github">Sign in with GitHub</Link>
      <form action={logout}>
        <button>Sign out</button>
      </form>
    </>
  );
}
