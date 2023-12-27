import { useOg } from "../OgEditor";
import { Input } from '../forms/Input'
import { Select } from '../forms/Select'
import type { OGElement } from "../../lib/types";
import { ColorIcon } from "../icons/ColorIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { StartIcon } from "../icons/StartIcon";
import { AddIcon } from "../icons/AddIcon";
import { EndIcon } from "../icons/EndIcon";
import { GradientIcon } from "../icons/GradientIcon";
import { SquareIcon } from "../icons/SquareIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { ImageSizeIcon } from "../icons/ImageSizeIcon";
import { ImagePositionIcon } from "../icons/ImagePositionIcon";

interface BackgroundSectionProps {
  selectedElement: OGElement
}

export function BackgroundSection({ selectedElement }: BackgroundSectionProps) {
  const { updateElement } = useOg()

  if (selectedElement.tag !== 'div') {
    return
  }

  return (
    <>
      {!selectedElement.backgroundImage ? (
        <>
          {!selectedElement.gradient ? (
            <>
              <p className="text-xs text-gray-600">Background color</p>
              <div className="grid grid-cols-1 gap-2 w-full">
                <Input onChange={value => {
                  updateElement({
                    ...selectedElement,
                    backgroundColor: value,
                  });
                }} type="color" value={selectedElement.backgroundColor}>
                  <ColorIcon />
                </Input>
              </div>
            </>
          ) : null}
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background gradient</p>
            {selectedElement.gradient ? (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElement,
                  gradient: undefined,
                });
              }} type="button">
                <DeleteIcon />
              </button>
            ) : (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElement,
                  gradient: {
                    start: '#000000',
                    end: '#FFFFFF',
                    angle: 90,
                    type: 'linear',
                  },
                });
              }} type="button">
                <AddIcon />
              </button>
            )}
          </div>
          {selectedElement.gradient ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input onChange={value => {
                updateElement({
                  ...selectedElement,
                  // @ts-expect-error wtf?
                  gradient: {
                    ...selectedElement.gradient,
                    start: value,
                  }
                });
              }} type="color" value={selectedElement.gradient.start}>
                <StartIcon />
              </Input>
              <Input onChange={value => {
                updateElement({
                  ...selectedElement,
                  // @ts-expect-error wtf?
                  gradient: {
                    ...selectedElement.gradient,
                    end: value,
                  }
                });
              }} type="color" value={selectedElement.gradient.end}>
                <EndIcon />
              </Input>
              <Select onChange={value => {
                updateElement({
                  ...selectedElement,
                  gradient: {
                    ...selectedElement.gradient,
                    // @ts-expect-error wtf?
                    type: value,
                  },
                });
              }} value={selectedElement.gradient.type} values={['linear', 'radial']}>
                <GradientIcon />
              </Select>
              {selectedElement.gradient.type === 'linear' ? (
                <Input max={360} min={-360} onChange={value => {
                  updateElement({
                    ...selectedElement,
                    // @ts-expect-error wtf?
                    gradient: {
                      ...selectedElement.gradient,
                      angle: value,
                    },
                  });
                }} suffix="deg" type="number" value={selectedElement.gradient.angle}>
                  <SquareIcon />
                </Input>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
      {!selectedElement.gradient ? (
        <>
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background image</p>
            {selectedElement.backgroundImage ? (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElement,
                  backgroundImage: undefined,
                });
              }} type="button">
                <DeleteIcon />
              </button>
            ) : (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElement,
                  backgroundImage: 'https://source.unsplash.com/random',
                  backgroundSize: 'cover',
                });
              }} type="button">
                <AddIcon />
              </button>
            )}
          </div>
          {selectedElement.backgroundImage ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input className="col-span-full" onChange={value => {
                updateElement({
                  ...selectedElement,
                  backgroundImage: value,
                });
              }} type="text" value={selectedElement.backgroundImage}>
                <LinkIcon />
              </Input>
              <Select onChange={value => {
                updateElement({
                  ...selectedElement,
                  // @ts-expect-error wtf?
                  backgroundSize: value,
                });
              }} value={selectedElement.backgroundSize ?? ''} values={['contain', 'cover']}>
                <ImageSizeIcon />
              </Select>
              <Select onChange={() => { updateElement(selectedElement); }} value="center" values={["center"]}>
                <ImagePositionIcon />
              </Select>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}

