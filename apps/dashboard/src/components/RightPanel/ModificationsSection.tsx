import type { OGElement } from "../../lib/types";
import { Button } from "../forms/Button";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface ModificationsSectionProps {
  selectedElement: OGElement
}

export function ModificationsSection({ selectedElement }: ModificationsSectionProps) {
  const removeElement = useElementsStore(state => state.removeElement)

  return (
    <>
      <p className="text-xs text-gray-600">Modifications</p>
      <div className="grid grid-cols-1 gap-2 w-full">
        <Button icon={<DeleteIcon />} onClick={() => { removeElement(selectedElement.id); }} variant="danger">Delete</Button>
      </div>
    </>
  )
}
