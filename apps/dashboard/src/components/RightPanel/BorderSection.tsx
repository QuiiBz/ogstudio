import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import { WidthIcon } from "../icons/WidthIcon";
import { BorderStyleIcon } from "../icons/BorderStyleIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { setValue } from "../../lib/inputs";
import { showMixed } from "../../lib/elements";

interface BorderSectionProps {
  selectedElements: OGElement[];
}

export function BorderSection({ selectedElements }: BorderSectionProps) {
  const updateElements = useElementsStore((state) => state.updateElements);

  if (
    selectedElements[0].border &&
    selectedElements.find((element) => !element.border)
  )
    return;

  if (
    !selectedElements[0].border &&
    selectedElements.find((element) => element.border)
  )
    return;

  return (
    <>
      <div className="h-[1px] w-full bg-gray-100" />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Border</p>
        {selectedElements[0].border ? (
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  border: undefined,
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
                  border: {
                    color: "#000000",
                    width: 1,
                    style: "outside",
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            type="button"
          >
            <AddIcon />
          </button>
        )}
      </div>
      {selectedElements[0].border ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <Input
            onChange={(value) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    color: value,
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            type="color"
            value={
              showMixed(selectedElements, "color", "border")
                ? "#ffffff"
                : selectedElements[0].border.color
            }
          >
            <ColorIcon />
          </Input>
          <Input
            max={99}
            min={0}
            onChange={(value) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    width: setValue(value),
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            onKeyDown={(direction) => {
              const updatedElements = selectedElements.map(
                (selectedElement) => {
                  if (!selectedElement.border) return selectedElement;

                  if (selectedElement.border.width === 99 && direction === "up")
                    return selectedElement;
                  if (
                    selectedElement.border.width === 0 &&
                    direction === "down"
                  )
                    return selectedElement;

                  return {
                    ...selectedElement,
                    border: {
                      ...selectedElement.border,
                      width:
                        direction === "down"
                          ? selectedElement.border.width - 1
                          : selectedElement.border.width + 1,
                    },
                  };
                },
              );
              updateElements(updatedElements);
            }}
            suffix="px"
            trackArrowDirection
            type={
              showMixed(selectedElements, "width", "border") ? "text" : "number"
            }
            value={
              showMixed(selectedElements, "width", "border")
                ? "Mixed"
                : selectedElements[0].border.width
            }
          >
            <WidthIcon />
          </Input>
          <Select
            onChange={(value) => {
              if (value === "Mixed") return;

              const updatedElements = selectedElements.map(
                (selectedElement) => ({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    style: value as "outside" | "inside",
                  },
                }),
              ) as OGElement[];
              updateElements(updatedElements);
            }}
            value={
              showMixed(selectedElements, "style", "border")
                ? "Mixed"
                : selectedElements[0].border.style
            }
            values={
              showMixed(selectedElements, "style", "border")
                ? ["outside", "inside", "Mixed"]
                : ["outside", "inside"]
            }
          >
            <BorderStyleIcon />
          </Select>
        </div>
      ) : null}
    </>
  );
}
