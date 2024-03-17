import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";
import { github } from "../../../../../lib/auth/arctic";
import { db } from "../../../../../lib/db/db";
import { lucia } from "../../../../../lib/auth/lucia";
import { userTable } from "../../../../../lib/db/schema";

// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28
interface GitHubUser {
  id: number;
  avatar_url: string;
  name: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const githubUser = (await githubUserResponse.json()) as GitHubUser;
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.githubId, githubUser.id))
      .get();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);
    await db.insert(userTable).values({
      id: userId,
      githubId: githubUser.id,
      name: githubUser.name,
      avatar: githubUser.avatar_url,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.error(error);

    // the specific error message depends on the provider
    if (error instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
