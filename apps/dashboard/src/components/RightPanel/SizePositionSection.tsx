import { Input } from "../forms/Input";
import type { OGElement } from "../../lib/types";
import { useElementsStore } from "../../stores/elementsStore";
import { setValue } from "../../lib/inputs";
import { showMixed } from "../../lib/elements";

interface SizePositionSectionProps {
  selectedElements: OGElement[];
}

export function SizePositionSection({
  selectedElements,
}: SizePositionSectionProps) {
  const updateElements = useElementsStore((state) => state.updateElements);

  return (
    <>
      <p className="text-xs text-gray-600">Size & Position</p>
      <div className="grid grid-cols-2 gap-2">
        <Input
          onChange={(value) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              x: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              x:
                direction === "down"
                  ? selectedElement.x - 1
                  : selectedElement.x + 1,
            }));
            updateElements(updatedElements);
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "x") ? "text" : "number"}
          value={
            showMixed(selectedElements, "x") ? "Mixed" : selectedElements[0].x
          }
        >
          X
        </Input>
        <Input
          onChange={(value) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              y: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              y:
                direction === "down"
                  ? selectedElement.y - 1
                  : selectedElement.y + 1,
            }));
            updateElements(updatedElements);
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "y") ? "text" : "number"}
          value={
            showMixed(selectedElements, "y") ? "Mixed" : selectedElements[0].y
          }
        >
          Y
        </Input>
        <Input
          onChange={(value) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              width: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              width:
                direction === "down"
                  ? selectedElement.width - 1
                  : selectedElement.width + 1,
            }));
            updateElements(updatedElements);
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "width") ? "text" : "number"}
          value={
            showMixed(selectedElements, "width")
              ? "Mixed"
              : selectedElements[0].width
          }
        >
          W
        </Input>
        <Input
          onChange={(value) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              height: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              height:
                direction === "down"
                  ? selectedElement.height - 1
                  : selectedElement.height + 1,
            }));
            updateElements(updatedElements);
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(selectedElements, "height") ? "text" : "number"}
          value={
            showMixed(selectedElements, "height")
              ? "Mixed"
              : selectedElements[0].height
          }
        >
          H
        </Input>
      </div>
    </>
  );
}
