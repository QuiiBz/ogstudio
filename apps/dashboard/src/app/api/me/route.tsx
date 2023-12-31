import { getSession } from "../../../lib/auth/api";

export async function GET() {
  const session = await getSession()

  if (!session) {
    return Response.json({ error: 'Invalid session' }, { status: 401 })
  }

  return Response.json(session)
}

