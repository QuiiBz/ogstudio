import type { SessionObject } from "../../../lib/auth/api";
import { getSession } from "../../../lib/auth/api";

export type MeResponse = SessionObject;

export async function GET() {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(session);
}
