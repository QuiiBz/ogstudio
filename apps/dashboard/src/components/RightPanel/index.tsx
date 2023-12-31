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
    <div className="flex flex-col justify-between p-4 h-full">
      <div className="flex flex-col items-start gap-4">
        <SizePositionSection selectedElement={selectedElementData} />
        <div className="h-[1px] w-full bg-gray-100" />
        <FontSection selectedElement={selectedElementData} />
        <BackgroundSection selectedElement={selectedElementData} />
        <div className="h-[1px] w-full bg-gray-100" />
        <BorderSection selectedElement={selectedElementData} />
        <div className="h-[1px] w-full bg-gray-100" />
        <ShadowSection selectedElement={selectedElementData} />
        <div className="h-[1px] w-full bg-gray-100" />
        <MiscellanousSection selectedElement={selectedElementData} />
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="h-[1px] w-full bg-gray-100" />
        <ModificationsSection selectedElement={selectedElementData} />
      </div>
    </div>
  );
}
