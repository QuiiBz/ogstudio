import { Flex, Grid, Text, Select, TextField, Tooltip } from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { FontSizeIcon } from "../icons/FontSizeIcon";
import { LineHeightIcon } from "../icons/LineHeightIcon";
import { LetterSpacingIcon } from "../icons/LetterSpacingIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { ColorPicker } from "../ColorPicker";
import { FontPreview } from "../FontPreview";
import { useFontsStore } from "../../stores/fontsStore";

const SPACES_REGEX = /\s+/g;

interface FontSectionProps {
  selectedElement: OGElement;
}

export function FontSection({ selectedElement }: FontSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);
  const { allFonts, installedFonts, installFont } = useFontsStore(({ allFonts, installedFonts, installFont }) => ({ allFonts, installedFonts, installFont }));

  if (selectedElement.tag !== "p" && selectedElement.tag !== "span") {
    return null;
  }

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Font</Text>
      <Grid columns="2" gap="2">
        <Select.Root
          onValueChange={(value) => {
            const font = value;
            const weights = allFonts.find((f) => f.name === font)?.weights;

            if (!installedFonts.has(font)) {
              installFont(font);
            }

            updateElement({
              ...selectedElement,
              fontFamily: font,
              fontWeight: weights?.includes(
                selectedElement.fontWeight,
              )
                ? selectedElement.fontWeight
                : 400,
            });
          }}
          value={selectedElement.fontFamily}
        >
          <Select.Trigger color="gray" variant="soft" />
          <Select.Content variant="soft">
            <Select.Group>
              <Select.Label>Installed fonts</Select.Label>
              {Array.from(installedFonts.values()).map((font) => (
                <Select.Item key={font} value={font}>
                  <FontPreview font={font} />
                </Select.Item>
              ))}
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>All fonts (from FontSource)</Select.Label>
              {allFonts.filter((font) => !installedFonts.has(font.name)).map((font) => (
                <Select.Item key={font.name} value={font.name}>
                  <FontPreview font={font.name} />
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Select.Root
          onValueChange={(value) => {
            updateElement({
              ...selectedElement,
              fontWeight: Number(value),
            });
          }}
          value={String(selectedElement.fontWeight)}
        >
          <Select.Trigger color="gray" variant="soft" />
          <Select.Content variant="soft">
            {allFonts.find(({ name }) => name === selectedElement.fontFamily)?.weights?.map((weight) => (
              <Select.Item key={weight} value={String(weight)}>
                {weight}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <TextField.Root
          color="gray"
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              fontSize: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.fontSize}
          variant="soft"
        >
          <Tooltip content="Font size">
            <TextField.Slot>
              <FontSizeIcon />
            </TextField.Slot>
          </Tooltip>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <ColorPicker
          onChange={(color) => {
            updateElement({
              ...selectedElement,
              color,
            });
          }}
          value={selectedElement.color}
        />
        <TextField.Root
          color="gray"
          max={5}
          min={0}
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              lineHeight: event.target.valueAsNumber,
            });
          }}
          step={0.1}
          type="number"
          value={selectedElement.lineHeight}
          variant="soft"
        >
          <Tooltip content="Line height">
            <TextField.Slot>
              <LineHeightIcon />
            </TextField.Slot>
          </Tooltip>
        </TextField.Root>
        <TextField.Root
          color="gray"
          max={10}
          min={-10}
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              letterSpacing: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.letterSpacing}
          variant="soft"
        >
          <Tooltip content="Letter spacing">
            <TextField.Slot>
              <LetterSpacingIcon />
            </TextField.Slot>
          </Tooltip>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <Select.Root
          onValueChange={(value) => {
            updateElement({
              ...selectedElement,
              // @ts-expect-error wtf?
              align: value,
            });
          }}
          value={selectedElement.align}
        >
          <Select.Trigger color="gray" variant="soft" />
          <Select.Content variant="soft">
            <Select.Item value="left">Left</Select.Item>
            <Select.Item value="right">Right</Select.Item>
            <Select.Item value="center">Center</Select.Item>
          </Select.Content>
        </Select.Root>
        <TextField.Root
          className="col-span-full"
          color="gray"
          onChange={(event) => {
            const content =
              selectedElement.tag === "span"
                ? event.target.value.replaceAll(SPACES_REGEX, "")
                : event.target.value;

            updateElement({
              ...selectedElement,
              content,
            });
          }}
          value={selectedElement.content}
        />
      </Grid>
    </Flex>
  );
}
