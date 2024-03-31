import { Flex, Grid, IconButton, Text, TextField } from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { WidthIcon } from "../icons/WidthIcon";
import { GradientIcon } from "../icons/GradientIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { ColorPicker } from "../ColorPicker";

interface ShadowSectionProps {
  selectedElement: OGElement;
}

export function ShadowSection({ selectedElement }: ShadowSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  return (
    <Flex direction="column" gap="2">
      <Flex justify="between">
        <Text size="1">Shadow</Text>
        {selectedElement.shadow ? (
          <IconButton
            color="gray"
            onClick={() => {
              updateElement({
                ...selectedElement,
                shadow: undefined,
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
                shadow: {
                  color: "#000000",
                  width: 5,
                  blur: 5,
                  x: 0,
                  y: 0,
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
      {selectedElement.shadow ? (
        <Grid columns="2" gap="2">
          <TextField.Root
            color="gray"
            onChange={(event) => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  x: event.target.valueAsNumber,
                },
              });
            }}
            type="number"
            value={selectedElement.shadow.x}
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
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  y: event.target.valueAsNumber,
                },
              });
            }}
            type="number"
            value={selectedElement.shadow.y}
            variant="soft"
          >
            <TextField.Slot>Y</TextField.Slot>
            <TextField.Slot>px</TextField.Slot>
          </TextField.Root>
          <TextField.Root
            color="gray"
            max={99}
            min={0}
            onChange={(event) => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  blur: event.target.valueAsNumber,
                },
              });
            }}
            type="number"
            value={selectedElement.shadow.blur}
            variant="soft"
          >
            <TextField.Slot>
              <GradientIcon />
            </TextField.Slot>
            <TextField.Slot>px</TextField.Slot>
          </TextField.Root>
          {selectedElement.tag === "p" ||
          selectedElement.tag === "span" ? null : (
            <TextField.Root
              color="gray"
              max={99}
              min={0}
              onChange={(event) => {
                updateElement({
                  ...selectedElement,
                  // @ts-expect-error wtf?
                  shadow: {
                    ...selectedElement.shadow,
                    width: event.target.valueAsNumber,
                  },
                });
              }}
              type="number"
              value={selectedElement.shadow.width}
              variant="soft"
            >
              <TextField.Slot>
                <WidthIcon />
              </TextField.Slot>
              <TextField.Slot>px</TextField.Slot>
            </TextField.Root>
          )}
          <ColorPicker
            onChange={(color) => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  color,
                },
              });
            }}
            value={selectedElement.shadow.color}
          />
        </Grid>
      ) : null}
    </Flex>
  );
}
