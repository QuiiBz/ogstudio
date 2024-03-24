import { Flex, Button, Text } from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface ModificationsSectionProps {
  selectedElement: OGElement;
}

export function ModificationsSection({
  selectedElement,
}: ModificationsSectionProps) {
  const removeElement = useElementsStore((state) => state.removeElement);

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Modifications</Text>
      <Button
        className="col-span-full"
        color="red"
        onClick={() => {
          removeElement(selectedElement.id);
        }}
        variant="soft"
      >
        <DeleteIcon /> Delete
      </Button>
    </Flex>
  );
}
