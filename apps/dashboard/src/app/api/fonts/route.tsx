import { getFontData } from "../../../lib/fonts";

export const revalidate = "force-cache"
export const runtime = "nodejs"

export async function GET() {
  return Response.json(await getFontData())
}
