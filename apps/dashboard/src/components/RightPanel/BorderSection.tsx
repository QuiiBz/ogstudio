import { useOg } from "../OgEditor";
import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { Input } from '../forms/Input'
import { Select } from '../forms/Select'
import { WidthIcon } from "../icons/WidthIcon";
import { BorderStyleIcon } from "../icons/BorderStyleIcon";

interface BorderSectionProps {
  selectedElement: OGElement
}

export function BorderSection({ selectedElement }: BorderSectionProps) {
  const { updateElement } = useOg()

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Border</p>
        {selectedElement.border ? (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElement,
              border: undefined,
            });
          }} type="button">
            <DeleteIcon />
          </button>
        ) : (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElement,
              border: {
                color: '#000000',
                width: 1,
                style: 'outside',
              },
            });
          }} type="button">
            <AddIcon />
          </button>
        )}
      </div>
      {
        selectedElement.border ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Input onChange={value => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                border: {
                  ...selectedElement.border,
                  color: value,
                }
              });
            }} type="color" value={selectedElement.border.color}>
              <ColorIcon />
            </Input>
            <Input max={99} min={0} onChange={value => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                border: {
                  ...selectedElement.border,
                  width: value,
                }
              });
            }} suffix="px" type="number" value={selectedElement.border.width}>
              <WidthIcon />
            </Input>
            <Select onChange={value => {
              updateElement({
                ...selectedElement,
                border: {
                  ...selectedElement.border,
                  // @ts-expect-error wtf?
                  style: value,
                }
              });
            }} value={selectedElement.border.style} values={['outside', 'inside']}>
              <BorderStyleIcon />
            </Select>
          </div>
        ) : null
      }
    </>
  )
}

