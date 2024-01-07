import { useElementsStore } from "../../stores/elementsStore";
// import { BackgroundSection } from "./BackgroundSection";
// import { BorderSection } from "./BorderSection";
import { FontSection } from "./FontSection";
import { MiscellanousSection } from "./MiscellanousSection";
import { ModificationsSection } from "./ModificationsSection";
// import { ShadowSection } from "./ShadowSection";
import { SizePositionSection } from "./SizePositionSection";

export function RightPanel() {
  const { selectedElementsId, elements } = useElementsStore();
  const selectedElementsData = elements.filter((element) =>
    selectedElementsId.includes(element.id),
  );

  if (!selectedElementsData.length) {
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
        <SizePositionSection selectedElements={selectedElementsData} />
        <div className="h-[1px] w-full bg-gray-100" />
        <FontSection selectedElements={selectedElementsData} />
        {/* <BackgroundSection selectedElements={selectedElementsData} /> */}
        {/* <div className="h-[1px] w-full bg-gray-100" /> */}
        {/* <BorderSection selectedElement={selectedElementsData} /> */}
        {/* <div className="h-[1px] w-full bg-gray-100" />
        <ShadowSection selectedElement={selectedElementsData} /> */}
        <div className="h-[1px] w-full bg-gray-100" />
        <MiscellanousSection selectedElements={selectedElementsData} />
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="h-[1px] w-full bg-gray-100" />
        <ModificationsSection selectedElements={selectedElementsData} />
      </div>
    </div>
  );
}
