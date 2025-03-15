import { cookies } from "next/headers";
import { github, generateState } from "@ogstudio/auth/arctic";

export async function GET() {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  (await cookies()).set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
