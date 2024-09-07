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
import { useMemo, type ReactNode } from "react";
import { useElementsStore } from "../stores/elementsStore";
import { ColorIcon } from "./icons/ColorIcon";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}

export function ColorPicker({ value, onChange, children }: ColorPickerProps) {
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
        <Button color="gray" style={{ color: value }} variant="soft">
          {children ? children : <ColorIcon />}
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
            <Grid columns="6">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => {
                    onChange(color);
                  }}
                  className="rounded-md w-6 h-6 border"
                  style={{
                    backgroundColor: color,
                    borderColor: "var(--gray-6)",
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
