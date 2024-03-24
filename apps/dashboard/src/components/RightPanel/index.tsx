import { Flex, Separator } from "@radix-ui/themes";
import { useElementsStore } from "../../stores/elementsStore";
import { BackgroundSection } from "./BackgroundSection";
import { BorderSection } from "./BorderSection";
import { FontSection } from "./FontSection";
import { MiscellanousSection } from "./MiscellanousSection";
import { ModificationsSection } from "./ModificationsSection";
import { ShadowSection } from "./ShadowSection";
import { SizePositionSection } from "./SizePositionSection";

export function RightPanel() {
  const { selectedElementId, elements } = useElementsStore();
  const selectedElementData = elements.find(
    (element) => element.id === selectedElementId,
  );

  if (!selectedElementData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-600 text-center">
          Create or select an element <br /> to get started.
        </p>
      </div>
    );
  }

  return (
    <Flex direction="column" gap="4" height="100vh" justify="between" p="4">
      <Flex direction="column" gap="4">
        <SizePositionSection selectedElement={selectedElementData} />
        <Separator className="opacity-50" size="4" />
        <FontSection selectedElement={selectedElementData} />
        <BackgroundSection selectedElement={selectedElementData} />
        <Separator className="opacity-50" size="4" />
        <BorderSection selectedElement={selectedElementData} />
        <Separator className="opacity-50" size="4" />
        <ShadowSection selectedElement={selectedElementData} />
        <Separator className="opacity-50" size="4" />
        <MiscellanousSection selectedElement={selectedElementData} />
      </Flex>
      <ModificationsSection selectedElement={selectedElementData} />
    </Flex>
  );
}
