import { getFontData } from "../../../lib/fonts";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  return Response.json(await getFontData());
}
