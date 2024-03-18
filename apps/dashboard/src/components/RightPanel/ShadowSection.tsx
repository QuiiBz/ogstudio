import type { OGBaseElement, OGDivElement, OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { Input } from "../forms/Input";
import { WidthIcon } from "../icons/WidthIcon";
import { GradientIcon } from "../icons/GradientIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { setValue } from "../../lib/inputs";
import { showMixed } from "../../lib/elements";

interface ShadowSectionProps {
  selectedElements: OGElement[];
}

type OGBoxElement = OGBaseElement & OGDivElement;

export function ShadowSection({ selectedElements }: ShadowSectionProps) {
  const updateElements = useElementsStore((state) => state.updateElements);
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
      <div className="h-[1px] w-full bg-gray-100" />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Shadow</p>
        {selectedElements[0].shadow ? (
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  shadow: undefined,
                }),
              );
              updateElements(updatedElements);
            }}
            type="button"
          >
            <DeleteIcon />
          </button>
        ) : (
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  shadow: {
                    color: "#000000",
                    width: 5,
                    blur: 5,
                    x: 0,
                    y: 0,
                  },
                }),
              );
              updateElements(updatedElements);
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
                const updatedElements = boxElements.map((selectedElement) => ({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    width: setValue(value),
                  },
                })) as OGElement[];
                updateElements(updatedElements);
              }}
              onKeyDown={(direction) => {
                const updatedElements = boxElements.map((selectedElement) => {
                  if (!selectedElement.shadow) return selectedElement;

                  if (selectedElement.shadow.width === 99 && direction === "up")
                    return selectedElement;
                  if (
                    selectedElement.shadow.width === 0 &&
                    direction === "down"
                  )
                    return selectedElement;

                  return {
                    ...selectedElement,
                    shadow: {
                      ...selectedElement.shadow,
                      width:
                        direction === "down"
                          ? selectedElement.shadow.width - 1
                          : selectedElement.shadow.width + 1,
                    },
                  };
                });
                updateElements(updatedElements);
              }}
              suffix="px"
              trackArrowDirection
              type={
                showMixed(boxElements, "width", "shadow") ? "text" : "number"
              }
              // @ts-expect-error all elements have shadow
              value={
                showMixed(boxElements, "width", "shadow")
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
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    blur: setValue(value),
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            onKeyDown={(direction) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => {
                  if (!selectedElement.shadow) return selectedElement;

                  if (selectedElement.shadow.blur === 99 && direction === "up")
                    return selectedElement;
                  if (selectedElement.shadow.blur === 0 && direction === "down")
                    return selectedElement;

                  return {
                    ...selectedElement,
                    shadow: {
                      ...selectedElement.shadow,
                      blur:
                        direction === "down"
                          ? selectedElement.shadow.blur - 1
                          : selectedElement.shadow.blur + 1,
                    },
                  };
                },
              );
              updateElements(updatedElements);
            }}
            suffix="px"
            trackArrowDirection
            type={
              showMixed(selectedElements, "blur", "shadow") ? "text" : "number"
            }
            value={
              showMixed(selectedElements, "blur", "shadow")
                ? "Mixed"
                : selectedElements[0].shadow.blur
            }
          >
            <GradientIcon />
          </Input>
          <Input
            onChange={(value) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    x: setValue(value),
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            onKeyDown={(direction) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => {
                  if (!selectedElement.shadow) return selectedElement;

                  return {
                    ...selectedElement,
                    shadow: {
                      ...selectedElement.shadow,
                      x:
                        direction === "down"
                          ? selectedElement.shadow.x - 1
                          : selectedElement.shadow.x + 1,
                    },
                  };
                },
              );
              updateElements(updatedElements);
            }}
            suffix="px"
            trackArrowDirection
            type={
              showMixed(selectedElements, "x", "shadow") ? "text" : "number"
            }
            value={
              showMixed(selectedElements, "x", "shadow")
                ? "Mixed"
                : selectedElements[0].shadow.x
            }
          >
            X
          </Input>
          <Input
            onChange={(value) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    y: setValue(value),
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            onKeyDown={(direction) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => {
                  if (!selectedElement.shadow) return selectedElement;

                  return {
                    ...selectedElement,
                    shadow: {
                      ...selectedElement.shadow,
                      y:
                        direction === "down"
                          ? selectedElement.shadow.y - 1
                          : selectedElement.shadow.y + 1,
                    },
                  };
                },
              );
              updateElements(updatedElements);
            }}
            suffix="px"
            trackArrowDirection
            type={
              showMixed(selectedElements, "y", "shadow") ? "text" : "number"
            }
            value={
              showMixed(selectedElements, "y", "shadow")
                ? "Mixed"
                : selectedElements[0].shadow.y
            }
          >
            Y
          </Input>
          <Input
            onChange={(value) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  shadow: {
                    ...selectedElement.shadow,
                    color: value,
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            type="color"
            value={
              showMixed(selectedElements, "color", "shadow")
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
