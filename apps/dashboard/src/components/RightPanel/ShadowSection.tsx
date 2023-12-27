import { useOg } from "../OgEditor";
import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import { ColorIcon } from "../icons/ColorIcon";
import { Input } from '../forms/Input'
import { WidthIcon } from "../icons/WidthIcon";
import { GradientIcon } from "../icons/GradientIcon";

interface ShadowSectionProps {
  selectedElement: OGElement
}

export function ShadowSection({ selectedElement }: ShadowSectionProps) {
  const { updateElement } = useOg()

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Shadow</p>
        {selectedElement.shadow ? (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElement,
              shadow: undefined,
            });
          }} type="button">
            <DeleteIcon />
          </button>
        ) : (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElement,
              shadow: {
                color: '#000000',
                width: 5,
                blur: 5,
                x: 0,
                y: 0,
              },
            });
          }} type="button">
            <AddIcon />
          </button>
        )}
      </div>
      {
        selectedElement.shadow ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            {selectedElement.tag === 'p' || selectedElement.tag === 'span' ? null : (
              <Input max={99} min={0} onChange={value => {
                updateElement({
                  ...selectedElement,
                  // @ts-expect-error wtf?
                  shadow: {
                    ...selectedElement.shadow,
                    width: value,
                  }
                });
              }} suffix="px" type="number" value={selectedElement.shadow.width}>
                <WidthIcon />
              </Input>
            )}
            <Input max={99} min={0} onChange={value => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  blur: value,
                }
              });
            }} suffix="px" type="number" value={selectedElement.shadow.blur}>
              <GradientIcon />
            </Input>
            <Input onChange={value => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  x: value,
                }
              });
            }} suffix="px" type="number" value={selectedElement.shadow.x}>
              X
            </Input>
            <Input onChange={value => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  y: value,
                }
              });
            }} suffix="px" type="number" value={selectedElement.shadow.y}>
              Y
            </Input>
            <Input onChange={value => {
              updateElement({
                ...selectedElement,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElement.shadow,
                  color: value,
                }
              });
            }} type="color" value={selectedElement.shadow.color}>
              <ColorIcon />
            </Input>
          </div>
        ) : null
      }
    </>
  )
}

