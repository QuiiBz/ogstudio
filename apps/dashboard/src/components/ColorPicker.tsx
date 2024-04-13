import { Button, Flex, Popover, TextField } from "@radix-ui/themes";
import { HexAlphaColorPicker } from "react-colorful";
import type { ReactNode } from "react";
import { ColorIcon } from "./icons/ColorIcon";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}

export function ColorPicker({ value, onChange, children }: ColorPickerProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button color="gray" style={{ color: value }} variant="soft">
          {children ? children : <ColorIcon />}
          {value}
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth="268px">
        <Flex direction="column" gap="2">
          <HexAlphaColorPicker color={value} onChange={onChange} />
          <TextField.Root
            color="gray"
            onChange={(event) => {
              const newValue = event.target.value;

              if (!newValue.startsWith("#")) {
                return;
              }

              onChange(newValue);
            }}
            value={value}
            variant="soft"
          />
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
