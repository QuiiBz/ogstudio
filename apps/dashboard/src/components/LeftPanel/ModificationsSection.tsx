import { Text, Button, Grid, Flex, Dialog } from "@radix-ui/themes";
import { useElementsStore } from "../../stores/elementsStore";
import { DeleteIcon } from "../icons/DeleteIcon";
import { RedoIcon } from "../icons/RedoIcon";
import { UndoIcon } from "../icons/UndoIcon";
import { MagicWandIcon } from "../icons/MagicWandIcon";
import { AIGenerateModal } from "../AIGenerateModal";

export function ModificationSection() {
  const { undo, redo, pastStates, futureStates } =
    useElementsStore.temporal.getState();
  const setElements = useElementsStore((state) => state.setElements);

  function reset() {
    const initialState = pastStates.length >= 1 ? pastStates[0] : undefined;

    if (initialState?.elements) {
      setElements(initialState.elements);
    }
  }

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Modifications</Text>
      <Grid columns="2" gap="2">
        <Button
          color="gray"
          disabled={pastStates.length === 0}
          onClick={() => {
            undo();
          }}
          variant="soft"
        >
          <UndoIcon /> Undo
        </Button>
        <Button
          color="gray"
          disabled={futureStates.length === 0}
          onClick={() => {
            redo();
          }}
          variant="soft"
        >
          <RedoIcon /> Redo
        </Button>
        <Button
          className="col-span-full"
          color="red"
          disabled={pastStates.length === 0}
          onClick={() => {
            reset();
          }}
          variant="soft"
        >
          <DeleteIcon /> Reset
        </Button>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button className="col-span-full" color="blue" variant="soft">
              <MagicWandIcon />
              Generate image with AI
            </Button>
          </Dialog.Trigger>
          <Dialog.Content minWidth="980px" size="4">
            <AIGenerateModal />
          </Dialog.Content>
        </Dialog.Root>
      </Grid>
    </Flex>
  );
}
