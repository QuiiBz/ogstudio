import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import { WidthIcon } from "../icons/WidthIcon";
import { BorderStyleIcon } from "../icons/BorderStyleIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface BorderSectionProps {
  selectedElements: OGElement[];
}

function showMixed(
  selectedElements: OGElement[],
  paramName: "color" | "width" | "style",
) {
  const elementsValues = selectedElements.map(
    // @ts-expect-error all elements have border
    (element) => element.border[paramName],
  );
  return !elementsValues.every((value) => value === elementsValues[0]);
}

function setValue(value: string | number) {
  if (typeof value === "number") return value;

  const numberValue = Number(value);
  return isNaN(numberValue) ? Number(value.replace(/\D/g, "")) : numberValue;
}

export function BorderSection({ selectedElements }: BorderSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

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
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Border</p>
        {selectedElements[0].border ? (
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => {
              selectedElements.forEach((selectedElement) => {
                updateElement({
                  ...selectedElement,
                  border: undefined,
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
                  border: {
                    color: "#000000",
                    width: 1,
                    style: "outside",
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
      {selectedElements[0].border ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <Input
            onChange={(value) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.border) return;

                updateElement({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    color: value,
                  },
                });
              });
            }}
            type="color"
            value={
              showMixed(selectedElements, "color")
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
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.border) return;

                updateElement({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    width: setValue(value),
                  },
                });
              });
            }}
            onKeyDown={(direction) => {
              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.border) return;

                if (selectedElement.border.width === 99 && direction === "up")
                  return;
                if (selectedElement.border.width === 0 && direction === "down")
                  return;

                updateElement({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    width:
                      direction === "down"
                        ? selectedElement.border.width - 1
                        : selectedElement.border.width + 1,
                  },
                });
              });
            }}
            suffix="px"
            trackArrowDirection
            type={showMixed(selectedElements, "width") ? "text" : "number"}
            value={
              showMixed(selectedElements, "width")
                ? "Mixed"
                : selectedElements[0].border.width
            }
          >
            <WidthIcon />
          </Input>
          <Select
            onChange={(value) => {
              if (value === "Mixed") return;

              selectedElements.forEach((selectedElement) => {
                if (!selectedElement.border) return;

                updateElement({
                  ...selectedElement,
                  border: {
                    ...selectedElement.border,
                    style: value as "outside" | "inside",
                  },
                });
              });
            }}
            value={
              showMixed(selectedElements, "style")
                ? "Mixed"
                : selectedElements[0].border.style
            }
            values={
              showMixed(selectedElements, "style")
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
