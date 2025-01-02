import { Editor } from "../../components/Editor";

export const metadata = {
  title: "Editor - OG Studio",
  openGraph: {
    url: "https://ogstudio.app/editor",
  },
};

export const dynamic = "force-static";

export default function EditorPage() {
  return <Editor />;
}
