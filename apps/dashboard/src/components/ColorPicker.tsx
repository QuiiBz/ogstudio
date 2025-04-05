import {
  Button,
  Flex,
  Grid,
  Popover,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { HexAlphaColorPicker } from "react-colorful";
import { useMemo } from "react";
import { useElementsStore } from "../stores/elementsStore";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const elements = useElementsStore((state) => state.elements);
  const colors = useMemo(() => {
    // Loop through all elements and extract all colors in the image
    const set = new Set<string>();

    for (const element of elements) {
      if ("color" in element) {
        set.add(element.color);
      }

      if ("backgroundColor" in element) {
        set.add(element.backgroundColor);
      }

      if (element.border?.color) {
        set.add(element.border.color);
      }

      if (element.shadow?.color) {
        set.add(element.shadow.color);
      }

      if ("gradient" in element && element.gradient) {
        set.add(element.gradient.start);
        set.add(element.gradient.end);
      }
    }

    return Array.from(set);
  }, [elements]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          color="gray"
          variant="soft"
          className="font-mono flex justify-between px-2"
        >
          <div
            className="w-[14px] h-[14px] rounded-full border border-[var(--gray-6)]"
            style={{ backgroundColor: value }}
          />
          {value}
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth="268px">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text size="1">Color picker</Text>
            <HexAlphaColorPicker color={value} onChange={onChange} />
            <TextField.Root
              color="gray"
              onChange={(event) => {
                const newValue = event.target.value;

                if (newValue.startsWith("#")) {
                  onChange(newValue);
                } else {
                  onChange(`#${newValue}`);
                }
              }}
              value={value}
              variant="soft"
              // eslint-disable-next-line -- Usability and accessibility for users is not reduced here
              autoFocus
            />
          </Flex>
          <Separator className="opacity-50" size="4" />
          <Flex direction="column" gap="2">
            <Text size="1">Recently used</Text>
            <Grid columns="8" gap="2">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => {
                    onChange(color);
                  }}
                  className="rounded-full w-6 h-6 cursor-pointer border border-[var(--gray-6)]"
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </Grid>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
