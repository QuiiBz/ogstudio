import { Text, Button, Flex, Dialog } from "@radix-ui/themes";
import { ExportModal } from "../ExportModal";
import { ExportIcon } from "../icons/ExportIcon";

export function ExportSection() {
  return (
    <Flex direction="column" gap="2">
      <Text size="1">Export</Text>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="col-span-full" color="green" variant="soft">
            <ExportIcon />
            Export or download image
          </Button>
        </Dialog.Trigger>
        <Dialog.Content minWidth="980px" size="4">
          <ExportModal />
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
