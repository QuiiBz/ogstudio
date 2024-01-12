import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import type { OGElement, OGDivElement, OGBaseElement } from "../../lib/types";
import { ColorIcon } from "../icons/ColorIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { StartIcon } from "../icons/StartIcon";
import { AddIcon } from "../icons/AddIcon";
import { EndIcon } from "../icons/EndIcon";
import { GradientIcon } from "../icons/GradientIcon";
import { SquareIcon } from "../icons/SquareIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { ImageSizeIcon } from "../icons/ImageSizeIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface BackgroundSectionProps {
  selectedElements: OGElement[];
}

type OGBoxElement = OGBaseElement & OGDivElement;

function showMixed(
  selectedElements: OGBoxElement[],
  paramName:
    | "backgroundColor"
    | "start"
    | "end"
    | "angle"
    | "type"
    | "backgroundImage"
    | "backgroundSize",
  forGradient?: boolean,
) {
  const elementsValues = selectedElements.map((element) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- provided type for both element types
    forGradient && element.gradient
      ? // @ts-expect-error todo: fix ts & eslint errors
        element.gradient[paramName]
      : // @ts-expect-error todo: fix ts & eslint errors
        element[paramName],
  );
  return !elementsValues.every((value) => value === elementsValues[0]);
}

function isSameBg(selectedElements: OGBoxElement[]) {
  if (selectedElements.length === 1) return true;

  const toCompare = selectedElements[0];

  if (toCompare.gradient)
    return selectedElements.slice(1).every((element) => element.gradient);
  if (selectedElements.slice(1).every((element) => element.gradient))
    return false;

  if (toCompare.backgroundImage)
    return selectedElements
      .slice(1)
      .every((element) => element.backgroundImage);
  if (selectedElements.slice(1).every((element) => element.backgroundImage))
    return false;

  return true;
}

function setValue(value: string | number, max?: number) {
  if (typeof value === "string") {
    const numberValue = Number(value.replace(/^\D-/g, ""));
    if (max) return numberValue > max ? max : numberValue;
    return numberValue;
  }

  return value;
}

export function BackgroundSection({
  selectedElements,
}: BackgroundSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);
  const boxElements = selectedElements.filter(
    (element) => element.tag === "div",
  ) as OGBoxElement[];

  if (!boxElements.length) {
    return;
  }

  if (!isSameBg(boxElements)) {
    return;
  }

  return (
    <>
      <div className="h-[1px] w-full bg-gray-100" />
      {!boxElements[0].backgroundImage ? (
        <>
          {!boxElements[0].gradient ? (
            <>
              <p className="text-xs text-gray-600">Background color</p>
              <div className="grid grid-cols-1 gap-2 w-full">
                <Input
                  onChange={(value) => {
                    boxElements.forEach((selectedElement) => {
                      updateElement({
                        ...selectedElement,
                        backgroundColor: value,
                      });
                    });
                  }}
                  type="color"
                  value={
                    showMixed(boxElements, "backgroundColor")
                      ? "#ffffff"
                      : boxElements[0].backgroundColor
                  }
                >
                  <ColorIcon />
                </Input>
              </div>
            </>
          ) : null}
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background gradient</p>
            {boxElements[0].gradient ? (
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => {
                  boxElements.forEach((selectedElement) => {
                    updateElement({
                      ...selectedElement,
                      gradient: undefined,
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
                  boxElements.forEach((selectedElement) => {
                    updateElement({
                      ...selectedElement,
                      gradient: {
                        start: "#000000",
                        end: "#FFFFFF",
                        angle: 90,
                        type: "linear",
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
          {boxElements[0].gradient ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input
                onChange={(value) => {
                  boxElements.forEach((selectedElement) => {
                    if (!selectedElement.gradient) return;

                    updateElement({
                      ...selectedElement,
                      gradient: {
                        ...selectedElement.gradient,
                        start: value,
                      },
                    });
                  });
                }}
                type="color"
                value={
                  showMixed(boxElements, "start", true)
                    ? "#ffffff"
                    : boxElements[0].gradient.start
                }
              >
                <StartIcon />
              </Input>
              <Input
                onChange={(value) => {
                  boxElements.forEach((selectedElement) => {
                    if (!selectedElement.gradient) return;

                    updateElement({
                      ...selectedElement,
                      gradient: {
                        ...selectedElement.gradient,
                        end: value,
                      },
                    });
                  });
                }}
                type="color"
                value={
                  showMixed(boxElements, "end", true)
                    ? "#ffffff"
                    : boxElements[0].gradient.end
                }
              >
                <EndIcon />
              </Input>
              <Select
                onChange={(value) => {
                  if (value === "Mixed") return;

                  boxElements.forEach((selectedElement) => {
                    if (!selectedElement.gradient) return;

                    updateElement({
                      ...selectedElement,
                      gradient: {
                        ...selectedElement.gradient,
                        type: value as "linear" | "radial",
                      },
                    });
                  });
                }}
                value={
                  showMixed(boxElements, "type", true)
                    ? "Mixed"
                    : boxElements[0].gradient.type
                }
                values={
                  showMixed(boxElements, "type", true)
                    ? ["linear", "radial", "Mixed"]
                    : ["linear", "radial"]
                }
              >
                <GradientIcon />
              </Select>
              {boxElements[0].gradient.type === "linear" ? (
                <Input
                  max={360}
                  min={-360}
                  onChange={(value) => {
                    boxElements.forEach((selectedElement) => {
                      if (!selectedElement.gradient) return;

                      updateElement({
                        ...selectedElement,
                        gradient: {
                          ...selectedElement.gradient,
                          angle: setValue(value),
                        },
                      });
                    });
                  }}
                  onKeyDown={(direction) => {
                    boxElements.forEach((selectedElement) => {
                      if (!selectedElement.gradient) return;

                      if (
                        selectedElement.gradient.angle === 360 &&
                        direction === "up"
                      )
                        return;
                      if (
                        selectedElement.gradient.angle === -360 &&
                        direction === "down"
                      )
                        return;

                      updateElement({
                        ...selectedElement,
                        gradient: {
                          ...selectedElement.gradient,
                          angle:
                            direction === "down"
                              ? selectedElement.gradient.angle - 1
                              : selectedElement.gradient.angle + 1,
                        },
                      });
                    });
                  }}
                  suffix="deg"
                  trackArrowDirection
                  type={
                    showMixed(boxElements, "angle", true) ? "text" : "number"
                  }
                  value={
                    showMixed(boxElements, "angle", true)
                      ? "Mixed"
                      : boxElements[0].gradient.angle
                  }
                >
                  <SquareIcon />
                </Input>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
      {!boxElements[0].gradient ? (
        <>
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background image</p>
            {boxElements[0].backgroundImage ? (
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => {
                  boxElements.forEach((selectedElement) => {
                    updateElement({
                      ...selectedElement,
                      backgroundImage: undefined,
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
                  boxElements.forEach((selectedElement) => {
                    updateElement({
                      ...selectedElement,
                      backgroundImage: "https://source.unsplash.com/random",
                      backgroundSize: "cover",
                    });
                  });
                }}
                type="button"
              >
                <AddIcon />
              </button>
            )}
          </div>
          {boxElements[0].backgroundImage ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input
                className="col-span-full"
                onChange={(value) => {
                  boxElements.forEach((selectedElement) => {
                    updateElement({
                      ...selectedElement,
                      backgroundImage: value,
                    });
                  });
                }}
                type="text"
                value={
                  showMixed(boxElements, "backgroundImage")
                    ? "Mixed"
                    : boxElements[0].backgroundImage
                }
              >
                <LinkIcon />
              </Input>
              <Select
                onChange={(value) => {
                  boxElements.forEach((selectedElement) => {
                    updateElement({
                      ...selectedElement,
                      backgroundSize: value as "cover" | "contain",
                    });
                  });
                }}
                value={
                  showMixed(boxElements, "backgroundSize")
                    ? "Mixed"
                    : boxElements[0].backgroundSize ?? ""
                }
                values={
                  showMixed(boxElements, "backgroundSize")
                    ? ["contain", "cover", "Mixed"]
                    : ["contain", "cover"]
                }
              >
                <ImageSizeIcon />
              </Select>
              {/* TODO: image position */}
              {/* Needs https://github.com/vercel/satori/pull/464 */}
              {/* <Select */}
              {/*   onChange={() => { */}
              {/*     updateElement(selectedElement); */}
              {/*   }} */}
              {/*   value="center" */}
              {/*   values={["center"]} */}
              {/* > */}
              {/*   <ImagePositionIcon /> */}
              {/* </Select> */}
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}
