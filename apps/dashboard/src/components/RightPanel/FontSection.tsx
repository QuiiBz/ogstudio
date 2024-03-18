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
import { setValue } from "../../lib/inputs";
import { showMixed } from "../../lib/elements";

const SPACES_REGEX = /\s+/g;

interface FontSectionProps {
  selectedElements: OGElement[];
}

type OGTextElement = (OGPElement | OGDynamicElement) & OGBaseElement;

export function FontSection({ selectedElements }: FontSectionProps) {
  const updateElements = useElementsStore((state) => state.updateElements);

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

            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              fontFamily: font,
              fontWeight: FONT_WEIGHTS[font].includes(
                selectedElement.fontWeight,
              )
                ? selectedElement.fontWeight
                : 400,
            }));
            updateElements(updatedElements);
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

            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              fontWeight: Number(value),
            }));
            updateElements(updatedElements);
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
          onChange={(value) => {
            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              fontSize: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              fontSize:
                direction === "down"
                  ? selectedElement.fontSize - 1
                  : selectedElement.fontSize + 1,
            }));
            updateElements(updatedElements);
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
            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              color: value,
            }));
            updateElements(updatedElements);
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
            const updatedElement = textElements.map((selectedElement) => ({
              ...selectedElement,
              lineHeight: setValue(value, 5),
            }));
            updateElements(updatedElement);
          }}
          onKeyDown={(direction) => {
            const updatedElements = textElements.map((selectedElement) => {
              if (selectedElement.lineHeight === 5 && direction === "up")
                return selectedElement;
              if (selectedElement.lineHeight === 0 && direction === "down")
                return selectedElement;

              return {
                ...selectedElement,
                lineHeight:
                  direction === "down"
                    ? selectedElement.lineHeight - 1
                    : selectedElement.lineHeight + 1,
              };
            });
            updateElements(updatedElements);
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
            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              letterSpacing: setValue(value),
            }));
            updateElements(updatedElements);
          }}
          onKeyDown={(direction) => {
            const updatedElements = textElements.map((selectedElement) => {
              if (selectedElement.letterSpacing === 10 && direction === "up")
                return selectedElement;
              if (selectedElement.letterSpacing === -10 && direction === "down")
                return selectedElement;

              return {
                ...selectedElement,
                letterSpacing:
                  direction === "down"
                    ? selectedElement.letterSpacing - 1
                    : selectedElement.letterSpacing + 1,
              };
            });
            updateElements(updatedElements);
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

            const updatedElements = textElements.map((selectedElement) => ({
              ...selectedElement,
              align: value as "left" | "right" | "center",
            }));
            updateElements(updatedElements);
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
              const updatedElement = textEditable.map((element) => ({
                ...element,
                content: value,
              }));
              updateElements(updatedElement);
            }}
            type="textarea"
            // @ts-expect-error provided element is OGPElement
            value={textEditable[0].content as string}
          />
        ) : null}
        {selectedElement.tag === "span" ? (
          <Input
            className="col-span-full"
            onChange={(value) => {
              // Remove all spaces
              const newValue = value.replaceAll(SPACES_REGEX, "");

              updateElement({
                ...selectedElement,
                content: newValue,
              });
            }}
            type="text"
            value={selectedElement.content}
          />
        ) : null}
      </div>
    </>
  );
}
