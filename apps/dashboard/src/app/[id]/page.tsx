import { OgEditor } from "../../components/OgEditor"
import { INITIAL_ELEMENTS } from "../../lib/elements"

interface EditorProps {
  params: {
    id: string
  }
}

export default function Editor({ params: { id } }: EditorProps) {
  return (
    <OgEditor height={630} initialElements={INITIAL_ELEMENTS} localStorageKey={id} width={1200} />
  )
}
