import { Flex, Separator } from "@radix-ui/themes";
import { ExportSection } from "./ExportSection";
import { ModificationSection } from "./ModificationsSection";
import { ElementsSection } from "./ElementsSection";
import { SplashSection } from "./SplashSection";

export function LeftPanel() {
  return (
    <Flex direction="column" gap="4" height="100vh" justify="between" p="4">
      <Flex direction="column" gap="4">
        <SplashSection />
        <Separator className="opacity-50" size="4" />
        <ElementsSection />
      </Flex>
      <Flex direction="column" gap="4">
        <ModificationSection />
        <Separator className="opacity-50" size="4" />
        <ExportSection />
      </Flex>
    </Flex>
  );
}
