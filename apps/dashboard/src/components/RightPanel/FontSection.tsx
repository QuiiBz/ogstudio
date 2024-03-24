import {
  Flex,
  Grid,
  Text,
  Select,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import type { Font } from "../../lib/fonts";
import { FONTS, FONT_WEIGHTS } from "../../lib/fonts";
import { FontSizeIcon } from "../icons/FontSizeIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { LineHeightIcon } from "../icons/LineHeightIcon";
import { LetterSpacingIcon } from "../icons/LetterSpacingIcon";
import { useElementsStore } from "../../stores/elementsStore";

const SPACES_REGEX = /\s+/g;

interface FontSectionProps {
  selectedElement: OGElement;
}

export function FontSection({ selectedElement }: FontSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  if (selectedElement.tag !== "p" && selectedElement.tag !== "span") {
    return null;
  }

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Font</Text>
      <Grid columns="2" gap="2">
        <Select.Root
          onValueChange={(value) => {
            const font = value as unknown as Font;

            updateElement({
              ...selectedElement,
              fontFamily: font,
              fontWeight: FONT_WEIGHTS[font].includes(
                selectedElement.fontWeight,
              )
                ? selectedElement.fontWeight
                : 400,
            });
          }}
          value={selectedElement.fontFamily}
        >
          <Select.Trigger />
          <Select.Content>
            {FONTS.map((font) => (
              <Select.Item key={font} value={font}>
                {font}
              </Select.Item>
            ))}
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
          <Select.Trigger />
          <Select.Content>
            {FONT_WEIGHTS[selectedElement.fontFamily].map((weight) => (
              <Select.Item key={weight} value={String(weight)}>
                {weight}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <TextField.Root
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              fontSize: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.fontSize}
        >
          <TextField.Slot>
            <FontSizeIcon />
          </TextField.Slot>
          <TextField.Slot>px</TextField.Slot>
        </TextField.Root>
        <TextField.Root
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              color: event.target.value,
            });
          }}
          // @ts-expect-error wtf?
          type="color"
          value={selectedElement.color}
        >
          <TextField.Slot>
            <ColorIcon />
          </TextField.Slot>
        </TextField.Root>
        <TextField.Root
          max={5}
          min={0}
          onChange={(event) => {
            updateElement({
              ...selectedElement,
              lineHeight: event.target.valueAsNumber,
            });
          }}
          type="number"
          value={selectedElement.lineHeight}
        >
          <TextField.Slot>
            <LineHeightIcon />
          </TextField.Slot>
        </TextField.Root>
        <TextField.Root
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
        >
          <TextField.Slot>
            <LetterSpacingIcon />
          </TextField.Slot>
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
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="left">Left</Select.Item>
            <Select.Item value="right">Right</Select.Item>
            <Select.Item value="center">Center</Select.Item>
          </Select.Content>
        </Select.Root>
        {selectedElement.tag === "p" ? (
          <TextArea
            className="col-span-full"
            onChange={(event) => {
              updateElement({
                ...selectedElement,
                content: event.target.value,
              });
            }}
            value={selectedElement.content}
          />
        ) : null}
        {selectedElement.tag === "span" ? (
          <TextField.Root
            className="col-span-full"
            onChange={(event) => {
              // Remove all spaces
              const newValue = event.target.value.replaceAll(SPACES_REGEX, "");

              updateElement({
                ...selectedElement,
                content: newValue,
              });
            }}
            value={selectedElement.content}
          />
        ) : null}
      </Grid>
    </Flex>
  );
}
