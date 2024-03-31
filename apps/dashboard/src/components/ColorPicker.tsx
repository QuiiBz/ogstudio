import { Button, Code, Flex, Popover, TextField } from "@radix-ui/themes";
import { HexColorPicker } from "react-colorful";
import { ColorIcon } from "./icons/ColorIcon";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button color="gray" variant="soft">
          <ColorIcon />
          <Code size="2" style={{ backgroundColor: value }} variant="solid">
            {value}
          </Code>
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth="268px">
        <Flex direction="column" gap="2">
          <HexColorPicker color={value} onChange={onChange} />
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
