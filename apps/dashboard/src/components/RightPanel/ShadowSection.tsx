import type { OGBaseElement, OGDivElement, OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { Input } from "../forms/Input";
import { WidthIcon } from "../icons/WidthIcon";
import { GradientIcon } from "../icons/GradientIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface ShadowSectionProps {
  selectedElements: OGElement[];
}

type OGBoxElement = OGBaseElement & OGDivElement;

function showMixed(
  selectedElements: OGElement[],
  paramName: "width" | "blur" | "x" | "y" | "color",
) {
  const elementsValues = selectedElements.map(
    // @ts-expect-error all elements have shadow
    (element) => element.shadow[paramName],
  );
  return !elementsValues.every((value) => value === elementsValues[0]);
}

function setValue(value: string | number) {
  if (typeof value === "number") return value;

  const numberValue = Number(value);
  return isNaN(numberValue) ? Number(value.replace(/\D/g, "")) : numberValue;
}

export function ShadowSection({ selectedElements }: ShadowSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);
  const boxElements = selectedElements.filter(
    (element) => element.tag === "div",
  ) as OGBoxElement[];

  if (
    selectedElements[0].shadow &&
    selectedElements.find((element) => !element.shadow)
  )
    return;

  if (
    !selectedElements[0].shadow &&
    selectedElements.find((element) => element.shadow)
  )
    return;

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Shadow</p>
        {selectedElements[0].shadow ? (
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              selectedElements.forEach((selectedElement) => {
                updateElement({
                  ...selectedElement,
                  shadow: undefined,
                });
              });
            }}
            type="button"
          >
            <DeleteIcon />
          </button>
        ) : (
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              selectedElements.forEach((selectedElement) => {
                updateElement({
                  ...selectedElement,
                  shadow: {
                    color: "#000000",
                    width: 5,
                    blur: 5,
                    x: 0,
                    y: 0,
                  },
                });
              });
            }}
            type="button"
          >
            <AddIcon />
          </button>
        )}
      </div>
      {selectedElements[0].shadow ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          {!boxElements.length ? null : (
            <Input
              max={99}
              min={0}
              onChange={(value) => {
                boxElements.forEach((selectedElement) => {
                  if (!selectedElement.shadow) return;

                  updateElement({
                    ...selectedElement,
                    shadow: {
                      ...selectedElement.shadow,
                      width: setValue(value),
                    },
                  });
                });
              }}
              onKeyDown={(direction) => {
                boxElements.forEach((selectedElement) => {
                  if (!selectedElement.shadow) return;

                  if (selectedElement.shadow.width === 99 && direction === "up")
                    return;
                  if (
                    selectedElement.shadow.width === 0 &&
                    direction === "down"
                  )
                    return;

                  updateElement({
                    ...selectedElement,
                    shadow: {
                      ...selectedElement.shadow,
                      width:
                        direction === "down"
                          ? selectedElement.shadow.width - 1
                          : selectedElement.shadow.width + 1,
                    },
                  });
                });
              }}
              suffix="px"
              trackArrowDirection
              type={showMixed(boxElements, "width") ? "text" : "number"}
              // @ts-expect-error all elements have shadow
              value={
                showMixed(boxElements, "width")
                  ? "Mixed"
                  : boxElements[0].shadow?.width
              }
            >
              <WidthIcon />
            </Input>
          )}
          <Input
            max={99}
            min={0}
            onChange={(value) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    blur: setValue(value),
                  },
                });
              });
            }}
            onKeyDown={(direction) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                if (selectedElement.shadow.blur === 99 && direction === "up")
                  return;
                if (selectedElement.shadow.blur === 0 && direction === "down")
                  return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    blur:
                      direction === "down"
                        ? selectedElement.shadow.blur - 1
                        : selectedElement.shadow.blur + 1,
                  },
                });
              });
            }}
            suffix="px"
            trackArrowDirection
            type={showMixed(selectedElements, "blur") ? "text" : "number"}
            value={
              showMixed(selectedElements, "blur")
                ? "Mixed"
                : selectedElements[0].shadow.blur
            }
          >
            <GradientIcon />
          </Input>
          <Input
            onChange={(value) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    x: setValue(value),
                  },
                });
              });
            }}
            onKeyDown={(direction) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    x:
                      direction === "down"
                        ? selectedElement.shadow.x - 1
                        : selectedElement.shadow.x + 1,
                  },
                });
              });
            }}
            suffix="px"
            trackArrowDirection
            type={showMixed(selectedElements, "x") ? "text" : "number"}
            value={
              showMixed(selectedElements, "x")
                ? "Mixed"
                : selectedElements[0].shadow.x
            }
          >
            X
          </Input>
          <Input
            onChange={(value) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    y: setValue(value),
                  },
                });
              });
            }}
            onKeyDown={(direction) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    y:
                      direction === "down"
                        ? selectedElement.shadow.y - 1
                        : selectedElement.shadow.y + 1,
                  },
                });
              });
            }}
            suffix="px"
            trackArrowDirection
            type={showMixed(selectedElements, "y") ? "text" : "number"}
            value={
              showMixed(selectedElements, "y")
                ? "Mixed"
                : selectedElements[0].shadow.y
            }
          >
            Y
          </Input>
          <Input
            onChange={(value) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.shadow) return;

                updateElement({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    color: value,
                  },
                });
              });
            }}
            type="color"
            value={
              showMixed(selectedElements, "color")
                ? "#ffffff"
                : selectedElements[0].shadow.color
            }
          >
            <ColorIcon />
          </Input>
        </div>
      ) : null}
    </>
  );
}
