import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { getSession } from "@ogstudio/auth/api";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = openai("gpt-4o-mini");

export interface GenerateRequest {
  prompt: string;
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prompt } = (await request.json()) as GenerateRequest;

  const result = streamText({
    model,
    system: `You are a creative design engineer. I will give you a TypeScript definition of a schema that describes elements like a block, a text, a rounded text. You are going to design and code an open-graph image (NOT a website, so NO header/footer) following this schema, as a list of OGElement. The image size is 1200 by 630px, and the default font is Inter. Font size must be between 50 and 150px, line height should always be 1 and letter spacing should be between -10 and 10. All positions are absolute. Return a list of elements in JSON (last elements in the array are displayed above others) following that schema, without any other information or formatting.

export type OGElement = (OGPElement | OGDivElement) & {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  rotate: number;
  blur: number;
  border?: {
    color: string;
    width: number;
    style: "outside" | "inside";
  };
  shadow?: {
    color: string;
    width: number;
    blur: number;
    x: number;
    y: number;
  };
};

export interface OGPElement {
  tag: "p";
  content: string;
  color: string;
  fontFamily: Font;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  align: "left" | "center" | "right";
}

export interface OGDivElement {
  tag: "div";
  radius?: number;
  backgroundColor: string;
  gradient?: {
    start: string;
    end: string;
    angle: number;
    type: "linear" | "radial";
  };
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain";
}`,
    prompt,
  });

  return result.toTextStreamResponse();
}
