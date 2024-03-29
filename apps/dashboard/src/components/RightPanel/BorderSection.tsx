import {
  Flex,
  Grid,
  IconButton,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { WidthIcon } from "../icons/WidthIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface BorderSectionProps {
  selectedElement: OGElement;
}

export function BorderSection({ selectedElement }: BorderSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  return (
    <Flex direction="column" gap="2">
      <Flex justify="between">
        <Text size="1">Border</Text>
        {selectedElement.border ? (
          <IconButton
            color="gray"
            onClick={() => {
              updateElement({
                ...selectedElement,
                border: undefined,
              });
            }}
            size="1"
            variant="ghost"
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            color="gray"
            onClick={() => {
              updateElement({
                ...selectedElement,
                border: {
                  color: "#000000",
                  width: 1,
                  style: "outside",
                },
              });
            }}
            size="1"
            variant="ghost"
          >
            <AddIcon />
          </IconButton>
        )}
      </Flex>
      {selectedElement.border ? (
        <Grid columns="2" gap="2">
          <TextField.Root
            onChange={(event) => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                border: {
                  ...selectedElement.border,
                  color: event.target.value,
                },
              });
            }}
            value={selectedElement.border.color}
            variant="soft"
            color="gray"
            // @ts-expect-error wtf?
            type="color"
          >
            <TextField.Slot>
              <ColorIcon />
            </TextField.Slot>
          </TextField.Root>
          <TextField.Root
            color="gray"
            max={99}
            min={0}
            onChange={(event) => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                border: {
                  ...selectedElement.border,
                  width: event.target.valueAsNumber,
                },
              });
            }}
            type="number"
            value={selectedElement.border.width}
            variant="soft"
          >
            <TextField.Slot>
              <WidthIcon />
            </TextField.Slot>
            <TextField.Slot>px</TextField.Slot>
          </TextField.Root>
          <Select.Root
            onValueChange={(value) => {
              updateElement({
                ...selectedElement,
                border: {
                  ...selectedElement.border,
                  // @ts-expect-error wtf?
                  style: value,
                },
              });
            }}
            value={selectedElement.border.style}
          >
            <Select.Trigger color="gray" variant="soft" />
            <Select.Content variant="soft">
              <Select.Item value="outside">Outside</Select.Item>
              <Select.Item value="inside">Inside</Select.Item>
            </Select.Content>
          </Select.Root>
        </Grid>
      ) : null}
    </Flex>
  );
}
