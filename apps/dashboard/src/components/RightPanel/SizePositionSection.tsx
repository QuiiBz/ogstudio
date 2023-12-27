import { useOg } from "../OgEditor";
import { Input } from '../forms/Input'
import type { OGElement } from "../../lib/types";

interface SizePositionSectionProps {
  selectedElement: OGElement
}

export function SizePositionSection({ selectedElement }: SizePositionSectionProps) {
  const { updateElement } = useOg()

  return (
    <>
      <p className="text-xs text-gray-600">Size & Position</p>
      <div className="grid grid-cols-2 gap-2">
        <Input onChange={value => {
          updateElement({
            ...selectedElement,
            x: value,
          });
        }} suffix="px" type="number" value={selectedElement.x}>
          X
        </Input>
        <Input onChange={value => {
          updateElement({
            ...selectedElement,
            y: value,
          });
        }} suffix="px" type="number" value={selectedElement.y}>
          Y
        </Input>
        <Input onChange={value => {
          updateElement({
            ...selectedElement,
            width: value,
          });
        }} suffix="px" type="number" value={selectedElement.width}>
          W
        </Input>
        <Input onChange={value => {
          updateElement({
            ...selectedElement,
            height: value,
          });
        }} suffix="px" type="number" value={selectedElement.height}>
          H
        </Input>
      </div>
    </>
  )
}
