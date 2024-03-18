import type { OGBaseElement, OGDivElement, OGElement } from "../../lib/types";
import { Input } from "../forms/Input";
import { CornerIcon } from "../icons/CornerIcon";
import { OpacityIcon } from "../icons/OpacityIcon";
import { RotateIcon } from "../icons/RotateIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { setValue } from "../../lib/inputs";
import { showMixed } from "../../lib/elements";

interface MiscellanousSectionProps {
  selectedElements: OGElement[];
}

type OGBoxElement = OGBaseElement & OGDivElement;

export function MiscellanousSection({
  selectedElements,
}: MiscellanousSectionProps) {
  const updateElements = useElementsStore((state) => state.updateElements);
  const boxElements = selectedElements.filter(
    (element) => element.tag === "div",
  ) as OGBoxElement[];

  return (
    <>
      <div className="h-[1px] w-full bg-gray-100" />
      <p className="text-xs text-gray-600">Miscellaneous</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input
          max={100}
          min={0}
          onChange={(value) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              opacity: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = selectedElements.map((selectedElement) => {
              if (selectedElement.opacity === 100 && direction === "up")
                return selectedElement;
              if (selectedElement.opacity === 0 && direction === "down")
                return selectedElement;

              return {
                ...selectedElement,
                opacity:
                  direction === "down"
                    ? selectedElement.opacity - 1
                    : selectedElement.opacity + 1,
              };
            });
            updateElements(updatedElements);
          }}
          suffix="%"
          trackArrowDirection
          type={showMixed(selectedElements, "opacity") ? "text" : "number"}
          value={
            showMixed(selectedElements, "opacity")
              ? "Mixed"
              : selectedElements[0].opacity
          }
        >
          <OpacityIcon />
        </Input>
        <Input
          max={360}
          min={-360}
          onChange={(value) => {
            const updatedElements = selectedElements.map((selectedElement) => ({
              ...selectedElement,
              rotate: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = selectedElements.map((selectedElement) => {
              if (selectedElement.rotate === 360 && direction === "up")
                return selectedElement;
              if (selectedElement.rotate === -360 && direction === "down")
                return selectedElement;

              return {
                ...selectedElement,
                rotate:
                  direction === "down"
                    ? selectedElement.rotate - 1
                    : selectedElement.rotate + 1,
              };
            });
            updateElements(updatedElements);
          }}
          suffix="deg"
          trackArrowDirection
          type={showMixed(selectedElements, "rotate") ? "text" : "number"}
          value={
            showMixed(selectedElements, "rotate")
              ? "Mixed"
              : selectedElements[0].rotate
          }
        >
          <RotateIcon />
        </Input>
        {boxElements.length ? (
          <Input
            max={999}
            min={0}
            onChange={(value) => {
              const updatedElements = boxElements.map((selectedElement) => ({
                ...selectedElement,
                radius: setValue(value),
              }));
              updateElements(updatedElements);
            }}
            onKeyDown={(direction) => {
              const updatedElements = boxElements.map((selectedElement) => {
                const radius = Math.round(selectedElement.radius ?? 0);
                if (radius === 999 && direction === "up")
                  return selectedElement;
                if (radius === 0 && direction === "down")
                  return selectedElement;

                return {
                  ...selectedElement,
                  radius: direction === "down" ? radius - 1 : radius + 1,
                };
              });
              updateElements(updatedElements);
            }}
            suffix="px"
            trackArrowDirection
            type={showMixed(boxElements, "radius") ? "text" : "number"}
            value={
              showMixed(boxElements, "radius")
                ? "Mixed"
                : boxElements[0].radius ?? 0
            }
          >
            <CornerIcon />
          </Input>
        ) : null}
      </div>
    </>
  );
}
