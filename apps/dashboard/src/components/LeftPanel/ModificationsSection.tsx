import { useElementsStore } from "../../stores/elementsStore";
import { Button } from "../forms/Button";
import { DeleteIcon } from "../icons/DeleteIcon";
import { RedoIcon } from "../icons/RedoIcon";
import { UndoIcon } from "../icons/UndoIcon";

export function ModificationSection() {
  const { undo, redo, pastStates } = useElementsStore.temporal.getState();
  const setElements = useElementsStore((state) => state.setElements);

  function reset() {
    const initialState = pastStates.length >= 1 ? pastStates[0] : undefined;

    if (initialState?.elements) {
      setElements(initialState.elements);
    }
  }

  return (
    <>
      <p className="text-xs text-gray-600">Modifications</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button icon={<UndoIcon />} onClick={undo}>
          Undo
        </Button>
        <Button icon={<RedoIcon />} onClick={redo}>
          Redo
        </Button>
        <Button
          className="col-span-full"
          icon={<DeleteIcon />}
          onClick={() => {
            reset();
          }}
          variant="danger"
        >
          Reset
        </Button>
      </div>
    </>
  );
}
