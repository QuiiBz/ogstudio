import { Button } from "../Button";
import { useOg } from "../OgEditor";
import { DeleteIcon } from "../icons/DeleteIcon";
import { RedoIcon } from "../icons/RedoIcon";
import { UndoIcon } from "../icons/UndoIcon";

export function ModificationSection() {
  const { undoRedo, reset } = useOg()

  return (
    <>
      <p className="text-xs text-gray-600">Modifications</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button icon={<UndoIcon />} onClick={() => { undoRedo('undo'); }}>Undo</Button>
        <Button icon={<RedoIcon />} onClick={() => { undoRedo('redo'); }}>Redo</Button>
        <Button className="col-span-full" icon={<DeleteIcon />} onClick={() => { reset(); }} variant="danger">Reset</Button>
      </div>
    </>
  )
}
