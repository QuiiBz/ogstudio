import { Flex, Grid, Text, TextField } from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { useElementsStore } from "../../stores/elementsStore";

interface SizePositionSectionProps {
  selectedElement: OGElement;
}

export function SizePositionSection({
  selectedElement,
}: SizePositionSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Size & position</Text>
      <Grid columns="2" gap="2">
        <TextField.Root
          color="gray"
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              x: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.x}
          variant="soft"
        >
          <TextField.Slot>X</TextField.Slot>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <TextField.Root
          color="gray"
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              y: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.y}
          variant="soft"
        >
          <TextField.Slot>Y</TextField.Slot>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <TextField.Root
          color="gray"
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              width: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.width}
          variant="soft"
        >
          <TextField.Slot>W</TextField.Slot>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <TextField.Root
          color="gray"
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              height: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.height}
          variant="soft"
        >
          <TextField.Slot>H</TextField.Slot>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
      </Grid>
    </Flex>
  );
}
