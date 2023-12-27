import type { OGElement } from "../../lib/types";
import { Button } from "../Button";
import { useOg } from "../OgPlayground";
import { DeleteIcon } from "../icons/DeleteIcon";

interface ModificationsSectionProps {
  selectedElement: OGElement
}

export function ModificationsSection({ selectedElement }: ModificationsSectionProps) {
  const { removeElement } = useOg()

  return (
    <>
      <p className="text-xs text-gray-600">Modifications</p>
      <div className="grid grid-cols-1 gap-2 w-full">
        <Button icon={<DeleteIcon />} onClick={() => { removeElement(selectedElement.id); }} variant="danger">Delete</Button>
      </div>
    </>
  )
}
