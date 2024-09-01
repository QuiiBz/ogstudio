import { getFontData } from "../../../lib/fonts";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getFontData());
}
