import { Flex, IconButton, Text, TextField, Tooltip } from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { useElementsStore } from "../../stores/elementsStore";
import { AlignVerticallyIcon } from "../icons/AlignVertically";
import { AlignHorizontallyIcon } from "../icons/AlignHorizontally";

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
      <Flex direction="row" gap="2">
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
        <Tooltip content="Align vertically">
          <IconButton
            size="2"
            variant="soft"
            color="gray"
            onClick={() => {
              updateElement({
                ...selectedElement,
                y: (630 - selectedElement.height) / 2,
              });
            }}
          >
            <AlignVerticallyIcon />
          </IconButton>
        </Tooltip>
      </Flex>
      <Flex direction="row" gap="2">
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
        <Tooltip content="Align horizontally">
          <IconButton
            size="2"
            variant="soft"
            color="gray"
            onClick={() => {
              updateElement({
                ...selectedElement,
                x: (1200 - selectedElement.width) / 2,
              });
            }}
          >
            <AlignHorizontallyIcon />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
