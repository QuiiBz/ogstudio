import type { OGBaseElement, OGDivElement, OGElement } from "../../lib/types";
import { Input } from "../forms/Input";
import { CornerIcon } from "../icons/CornerIcon";
import { OpacityIcon } from "../icons/OpacityIcon";
import { RotateIcon } from "../icons/RotateIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface MiscellanousSectionProps {
  selectedElements: OGElement[];
}

type OGBoxElement = OGBaseElement & OGDivElement;

function showMixed(
  selectedElements: OGElement[] | OGBoxElement[],
  paramName: "opacity" | "rotate" | "radius",
) {
  // @ts-expect-error need to think how to fix this type problem
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- provided type for both element types
  const elementsValues = selectedElements.map((element) => element[paramName]);
  return !elementsValues.every((value) => value === elementsValues[0]);
}

function setValue(value: string | number, max?: number) {
  if (typeof value === "string") {
    const numberValue = Number(value.replace(/^\D-/g, ""));
    if (max) return numberValue > max ? max : numberValue;
    return numberValue;
  }

  return value;
}

export function MiscellanousSection({
  selectedElements,
}: MiscellanousSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);
  const boxElements = selectedElements.filter(
    (element) => element.tag === "div",
  ) as OGBoxElement[];

  return (
    <>
      <p className="text-xs text-gray-600">Miscellaneous</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input
          max={100}
          min={0}
          onChange={(value) => {
            if (!value) return;

            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                opacity: setValue(value, 100),
              });
            });
          }}
          onKeyDown={(direction) => {
            selectedElements.forEach((selectedElement) => {
              if (selectedElement.opacity === 100 && direction === "up") return;
              if (selectedElement.opacity === 0 && direction === "down") return;

              updateElement({
                ...selectedElement,
                opacity:
                  direction === "down"
                    ? selectedElement.opacity - 1
                    : selectedElement.opacity + 1,
              });
            });
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
            if (!value) return;

            selectedElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                rotate: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            selectedElements.forEach((selectedElement) => {
              if (selectedElement.rotate === 360 && direction === "up") return;
              if (selectedElement.rotate === -360 && direction === "down")
                return;

              updateElement({
                ...selectedElement,
                rotate:
                  direction === "down"
                    ? selectedElement.rotate - 1
                    : selectedElement.rotate + 1,
              });
            });
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
              if (!value) return;

              boxElements.forEach((selectedElement) => {
                updateElement({
                  ...selectedElement,
                  radius: setValue(value),
                });
              });
            }}
            onKeyDown={(direction) => {
              boxElements.forEach((selectedElement) => {
                const radius = Math.round(selectedElement.radius ?? 0);
                if (radius === 999 && direction === "up") return;
                if (radius === 0 && direction === "down") return;

                updateElement({
                  ...selectedElement,
                  radius: direction === "down" ? radius - 1 : radius + 1,
                });
              });
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
