import type { SessionObject } from "@ogstudio/auth/api";
import { getSession } from "@ogstudio/auth/api";
import { db, eq } from "@ogstudio/db/db";
import { imagesTable } from "@ogstudio/db/schema";

export interface MeResponse {
  session: SessionObject;
  images: (typeof imagesTable.$inferInsert)[];
}

export async function GET() {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const images = await db
    .select()
    .from(imagesTable)
    .where(eq(imagesTable.userId, session.user.id))
    .all();

  return Response.json({
    session,
    images,
  });
}
