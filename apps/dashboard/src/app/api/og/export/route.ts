import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { getSession } from "@ogstudio/auth/api";
import { db } from "@ogstudio/db/db";
import { imagesTable } from "@ogstudio/db/schema";
import type { OGElement } from "../../../../lib/types";

export interface ExportRequest {
  id: string;
  elements: OGElement[];
  name: string;
}

export interface ExportResponse {
  key: string;
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, elements, name } = (await request.json()) as ExportRequest;
  const key = `${session.user.id}:${id}`;

  await kv.set(key, JSON.stringify(elements));

  // upsert
  await db.insert(imagesTable).values({
    id: key,
    userId: session.user.id,
    elements: JSON.stringify(elements),
    createdAt: Date.now(),
    name,
  });

  const encodedKey = btoa(key);
  revalidatePath(`/api/og/${encodedKey}`);

  return Response.json({ key: encodedKey });
}
