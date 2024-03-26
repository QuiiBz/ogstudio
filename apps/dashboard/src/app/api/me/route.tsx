import type { SessionObject } from "@ogstudio/auth/api";
import { getSession } from "@ogstudio/auth/api";

export type MeResponse = SessionObject;

export async function GET() {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(session);
}
