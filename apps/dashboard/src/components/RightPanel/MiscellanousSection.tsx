import { Flex, Button, Grid, Text, TextField } from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { CornerIcon } from "../icons/CornerIcon";
import { RotateIcon } from "../icons/RotateIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { MagicWandIcon } from "../icons/MagicWandIcon";
import { TextIcon } from "../icons/TextIcon";

interface MiscellanousSectionProps {
  selectedElement: OGElement;
}

export function MiscellanousSection({
  selectedElement,
}: MiscellanousSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Miscellanous</Text>
      <Grid columns="2" gap="2">
        <TextField.Root
          color="gray"
          max={360}
          min={-360}
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              rotate: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.rotate}
          variant="soft"
        >
          <TextField.Slot>
            <RotateIcon />
          </TextField.Slot>
          <TextField.Slot>deg</TextField.Slot>
        </TextField.Root>
        {selectedElement.tag === "div" ? (
          <TextField.Root
            color="gray"
            max={999}
            min={0}
            onChange={(event) => {
              updateElement({
                ...selectedElement,
                radius: event.target.valueAsNumber,
              });
            }}
            type="number"
            value={selectedElement.radius}
            variant="soft"
          >
            <TextField.Slot>
              <CornerIcon />
            </TextField.Slot>
            <TextField.Slot>px</TextField.Slot>
          </TextField.Root>
        ) : null}
        {selectedElement.tag === "p" ? (
          <Button
            className="col-span-full"
            onClick={() => {
              updateElement({
                ...selectedElement,
                tag: "span",
                content: selectedElement.content
                  .toLowerCase()
                  .replace(/\s/g, "-"),
                name:
                  selectedElement.name === "Text"
                    ? "Dynamic text"
                    : selectedElement.name,
              });
            }}
            variant="soft"
          >
            <MagicWandIcon /> Turn in Dynamic text
          </Button>
        ) : null}
        {selectedElement.tag === "span" ? (
          <Button
            className="col-span-full"
            color="gray"
            onClick={() => {
              updateElement({
                ...selectedElement,
                tag: "p",
                name:
                  selectedElement.name === "Dynamic text"
                    ? "Text"
                    : selectedElement.name,
              });
            }}
            variant="soft"
          >
            <TextIcon />
            Turn into normal text
          </Button>
        ) : null}
      </Grid>
    </Flex>
  );
}
