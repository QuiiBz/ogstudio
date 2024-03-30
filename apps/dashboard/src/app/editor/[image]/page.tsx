import { Editor } from "../../../components/Editor";

export const metadata = {
  title: "Editor - OG Studio",
  description: "Figma-like OG (Open Graph) Image builder.",
};

export const dynamic = "force-static";

export default function EditorPage() {
  return <Editor />;
}
