import { getSession } from "@ogstudio/auth/api";
import { db, eq, and } from "@ogstudio/db/db";
import { imagesTable } from "@ogstudio/db/schema";

export interface DeleteRequest {
  id: string;
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await request.json()) as DeleteRequest;
  const key = `${session.user.id}:${id}`;

  await db
    .delete(imagesTable)
    .where(
      and(eq(imagesTable.id, key), eq(imagesTable.userId, session.user.id)),
    );

  return Response.json({ success: true });
}
