import { ExportSection } from "./ExportSection";
import { ModificationSection } from "./ModificationsSection";
import { ElementsSection } from "./ElementsSection";

export function LeftPanel() {
  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <ElementsSection />
      <div className="h-[1px] w-full bg-gray-100" />
      <ModificationSection />
      <div className="h-[1px] w-full bg-gray-100" />
      <ExportSection />
    </div >
  )
}
