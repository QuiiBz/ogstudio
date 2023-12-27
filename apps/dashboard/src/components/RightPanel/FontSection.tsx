import { useOg } from "../OgEditor";
import { Input } from '../forms/Input'
import { Select } from '../forms/Select'
import type { OGElement } from "../../lib/types";
import { TextIcon } from "../icons/TextIcon";
import type { Font } from "../../lib/fonts";
import { FONTS, FONT_WEIGHTS } from "../../lib/fonts";
import { BoldIcon } from "../icons/BoldIcon";
import { FontSizeIcon } from "../icons/FontSizeIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { LineHeightIcon } from "../icons/LineHeightIcon";
import { AlignLeftIcon } from "../icons/AlignLeftIcon";
import { LetterSpacingIcon } from "../icons/LetterSpacingIcon";

interface FontSectionProps {
  selectedElement: OGElement
}

export function FontSection({ selectedElement }: FontSectionProps) {
  const { updateElement } = useOg()

  if (selectedElement.tag !== 'p' && selectedElement.tag !== 'span') {
    return null
  }

  return (
    <>
      <p className="text-xs text-gray-600">Font</p>
      <div className="grid grid-cols-2 gap-2">
        <Select onChange={value => {
          const font = value as unknown as Font

          updateElement({
            ...selectedElement,
            fontFamily: font,
            fontWeight: FONT_WEIGHTS[font].includes(selectedElement.fontWeight) ? selectedElement.fontWeight : 400,
          });
        }} value={selectedElement.fontFamily} values={[...FONTS]}>
          <TextIcon />
        </Select>
        <Select onChange={value => {
          updateElement({
            ...selectedElement,
            fontWeight: Number(value),
          });
        }} value={String(selectedElement.fontWeight)} values={FONT_WEIGHTS[selectedElement.fontFamily].map(String)}>
          <BoldIcon />
        </Select>
        <Input onChange={value => {
          updateElement({
            ...selectedElement,
            fontSize: value,
          });
        }} suffix="px" type="number" value={selectedElement.fontSize}>
          <FontSizeIcon />
        </Input>
        <Input onChange={value => {
          updateElement({
            ...selectedElement,
            color: value,
          });
        }} type="color" value={selectedElement.color}>
          <ColorIcon />
        </Input>
        <Input max={5} min={0} onChange={value => {
          updateElement({
            ...selectedElement,
            lineHeight: value,
          });
        }} type="number" value={selectedElement.lineHeight}>
          <LineHeightIcon />
        </Input>
        <Input max={5} min={0} onChange={() => { updateElement(selectedElement); }} type="number" value={0}>
          <LetterSpacingIcon />
        </Input>
        <Select onChange={value => {
          updateElement({
            ...selectedElement,
            // @ts-expect-error wtf?
            align: value,
          });
        }} value={selectedElement.align} values={['left', 'right', 'center']}>
          <AlignLeftIcon />
        </Select>
        {selectedElement.tag === 'p' ? (
          <Input className="col-span-full" onChange={value => {
            updateElement({
              ...selectedElement,
              content: value,
            });
          }} type="textarea" value={selectedElement.content} />
        ) : null}
      </div>
    </>
  )
}

