import { kv } from "@vercel/kv";
import { getSession } from "../../../../lib/auth/api";
import type { OGElement } from "../../../../lib/types";

export interface ExportRequest {
  id: string;
  elements: OGElement[];
}

export interface ExportResponse {
  key: string;
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, elements } = (await request.json()) as ExportRequest;
  const key = `${session.user.id}:${id}`;

  await kv.set(key, JSON.stringify(elements));

  return Response.json({ key: btoa(key) });
}
