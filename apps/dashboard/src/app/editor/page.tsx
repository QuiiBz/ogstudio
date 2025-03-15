import { Editor } from "../../components/Editor";

export const metadata = {
  title: "Editor - OG Studio",
  openGraph: {
    siteName: "OG Studio",
    images:
      "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
    type: "website",
    url: "https://ogstudio.app/editor",
  },
};

export const dynamic = "force-static";

export default function EditorPage() {
  return <Editor />;
}
