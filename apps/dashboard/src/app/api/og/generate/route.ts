import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { getSession } from "@ogstudio/auth/api";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const model = groq("llama3-8b-8192");

export interface GenerateRequest {
  prompt: string;
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session.user || !session.session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prompt } = (await request.json()) as GenerateRequest;

  const { textStream } = await streamText({
    model,
    system: `You are a programmer. I will give you a typescript definition of a schema that describes images with a list of elements like a block, a text, a rounded text. The image size is 1200 by 630px, and the default font is Roboto. Return a list of elements in JSON following that schema and the prompt direction, without any other information or formatting.

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

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  void (async () => {
    for await (const chunk of textStream) {
      await writer.write(chunk);
    }

    await writer.close();
  })();

  return new Response(readable);
}
