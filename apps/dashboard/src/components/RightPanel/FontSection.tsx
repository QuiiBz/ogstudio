import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import type {
  OGBaseElement,
  OGDynamicElement,
  OGPElement,
  OGElement,
} from "../../lib/types";
import { TextIcon } from "../icons/TextIcon";
import type { Font } from "../../lib/fonts";
import { FONTS, FONT_WEIGHTS } from "../../lib/fonts";
import { BoldIcon } from "../icons/BoldIcon";
import { FontSizeIcon } from "../icons/FontSizeIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { LineHeightIcon } from "../icons/LineHeightIcon";
import { AlignLeftIcon } from "../icons/AlignLeftIcon";
import { LetterSpacingIcon } from "../icons/LetterSpacingIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface FontSectionProps {
  selectedElements: OGElement[];
}

type OGTextElement = (OGPElement | OGDynamicElement) & OGBaseElement;

function showMixed(
  selectedElements: OGTextElement[],
  paramName:
    | "fontFamily"
    | "fontWeight"
    | "fontSize"
    | "lineHeight"
    | "letterSpacing"
    | "align"
    | "color",
) {
  const elementsValues = selectedElements.map((element) => element[paramName]);
  return !elementsValues.every((value) => value === elementsValues[0]);
}

function setValue(value: string | number, max?: number) {
  if (typeof value === "string") {
    const numberValue = Number(value.replace(/\D/g, ""));

    if (max) return numberValue > max ? max : numberValue;
    return numberValue;
  }

  return value;
}

export function FontSection({ selectedElements }: FontSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  const textElements = selectedElements.filter(
    (element) => element.tag !== "div",
  ) as OGTextElement[];
  const textEditable = textElements.filter((element) => element.tag !== "span");

  if (!textElements.length) {
    return null;
  }

  return (
    <>
      <div className="h-[1px] w-full bg-gray-100" />
      <p className="text-xs text-gray-600">Font</p>
      <div className="grid grid-cols-2 gap-2">
        <Select
          onChange={(value) => {
            const font = value as unknown as Font;
            if (value === "Mixed") return;
            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                fontFamily: font,
                fontWeight: FONT_WEIGHTS[font].includes(
                  selectedElement.fontWeight,
                )
                  ? selectedElement.fontWeight
                  : 400,
              });
            });
          }}
          value={
            showMixed(textElements, "fontFamily")
              ? "Mixed"
              : textElements[0].fontFamily
          }
          values={
            showMixed(textElements, "fontFamily")
              ? [...FONTS, "Mixed"]
              : [...FONTS]
          }
        >
          <TextIcon />
        </Select>
        <Select
          onChange={(value) => {
            if (value === "Mixed") return;
            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                fontWeight: Number(value),
              });
            });
          }}
          value={
            showMixed(textElements, "fontWeight")
              ? "Mixed"
              : String(textElements[0].fontWeight)
          }
          values={
            showMixed(textElements, "fontWeight")
              ? [
                  ...FONT_WEIGHTS[textElements[0].fontFamily].map(String),
                  "Mixed",
                ]
              : FONT_WEIGHTS[textElements[0].fontFamily].map(String)
          }
        >
          <BoldIcon />
        </Select>
        <Input
          onChange={(value): void => {
            if (!value) return;

            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                fontSize: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                fontSize:
                  direction === "down"
                    ? selectedElement.fontSize - 1
                    : selectedElement.fontSize + 1,
              });
            });
          }}
          suffix="px"
          trackArrowDirection
          type={showMixed(textElements, "fontSize") ? "text" : "number"}
          value={
            showMixed(textElements, "fontSize")
              ? "Mixed"
              : textElements[0].fontSize
          }
        >
          <FontSizeIcon />
        </Input>
        <Input
          onChange={(value) => {
            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                color: value,
              });
            });
          }}
          type="color"
          value={
            showMixed(textElements, "color") ? "#ffffff" : textElements[0].color
          }
        >
          <ColorIcon />
        </Input>
        <Input
          max={5}
          min={0}
          onChange={(value) => {
            if (!value) return;

            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                lineHeight: setValue(value, 5),
              });
            });
          }}
          onKeyDown={(direction) => {
            textElements.forEach((selectedElement) => {
              if (selectedElement.lineHeight === 5 && direction === "up")
                return;
              if (selectedElement.lineHeight === 0 && direction === "down")
                return;

              updateElement({
                ...selectedElement,
                lineHeight:
                  direction === "down"
                    ? selectedElement.lineHeight - 1
                    : selectedElement.lineHeight + 1,
              });
            });
          }}
          trackArrowDirection
          type={showMixed(textElements, "lineHeight") ? "text" : "number"}
          value={
            showMixed(textElements, "lineHeight")
              ? "Mixed"
              : textElements[0].lineHeight
          }
        >
          <LineHeightIcon />
        </Input>
        <Input
          max={10}
          min={-10}
          onChange={(value) => {
            if (!value) return;

            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                letterSpacing: setValue(value),
              });
            });
          }}
          onKeyDown={(direction) => {
            textElements.forEach((selectedElement) => {
              if (selectedElement.letterSpacing === 10 && direction === "up")
                return;
              if (selectedElement.letterSpacing === -10 && direction === "down")
                return;

              updateElement({
                ...selectedElement,
                letterSpacing:
                  direction === "down"
                    ? selectedElement.letterSpacing - 1
                    : selectedElement.letterSpacing + 1,
              });
            });
          }}
          trackArrowDirection
          type={showMixed(textElements, "letterSpacing") ? "text" : "number"}
          value={
            showMixed(textElements, "letterSpacing")
              ? "Mixed"
              : textElements[0].letterSpacing
          }
        >
          <LetterSpacingIcon />
        </Input>
        <Select
          onChange={(value) => {
            if (value === "Mixed") return;

            textElements.forEach((selectedElement) => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                align: value,
              });
            });
          }}
          value={
            showMixed(textElements, "align") ? "Mixed" : textElements[0].align
          }
          values={
            showMixed(textElements, "align")
              ? ["left", "right", "center", "Mixed"]
              : ["left", "right", "center"]
          }
        >
          <AlignLeftIcon />
        </Select>
        {textEditable.length === 1 ? (
          <Input
            className="col-span-full"
            onChange={(value) => {
              updateElement({
                ...textEditable[0],
                // @ts-expect-error provided element is OGPElement
                content: value,
              });
            }}
            type="textarea"
            // @ts-expect-error provided element is OGPElement
            value={textEditable[0].content as string}
          />
        ) : null}
      </div>
    </>
  );
}
