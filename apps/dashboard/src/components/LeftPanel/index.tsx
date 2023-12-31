import { ExportSection } from "./ExportSection";
import { ModificationSection } from "./ModificationsSection";
import { ElementsSection } from "./ElementsSection";
import { SplashSection } from "./SplashSection";

export function LeftPanel() {
  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <div className="flex flex-col items-start gap-4">
        <SplashSection />
        <div className="h-[1px] w-full bg-gray-100" />
        <ElementsSection />
      </div>
      <div className="flex flex-col items-start gap-4">
        <ModificationSection />
        <div className="h-[1px] w-full bg-gray-100" />
        <ExportSection />
      </div>
    </div >
  )
}
