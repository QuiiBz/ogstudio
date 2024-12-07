import * as htmlparser2 from "htmlparser2";
import { META_KEYS, type MetaTags } from "../../../../lib/meta";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(url);
    const text = await response.text();

    // @ts-expect-error missing values
    const tempData: Record<MetaTags, string> = {};

    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        if (
          name === "meta" &&
          META_KEYS.includes(
            (attributes.name || attributes.property) as MetaTags,
          )
        ) {
          tempData[(attributes.name || attributes.property) as MetaTags] =
            attributes.content;
        }
      },
    });

    parser.write(text);
    parser.end();

    return new Response(JSON.stringify(tempData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch URL", { status: 500 });
  }
}
