import { FONTS, WEIGHTS } from "../lib/fonts";
import { Button } from "./Button";
import { Input, Select } from "./Labels";
import { useOg } from "./OgPlayground";
import { AddIcon } from "./icons/AddIcon";
import { AlignLeftIcon } from "./icons/AlignLeftIcon";
import { BoldIcon } from "./icons/BoldIcon";
import { BorderStyleIcon } from "./icons/BorderStyleIcon";
import { ColorIcon } from "./icons/ColorIcon";
import { CornerIcon } from "./icons/CornerIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EndIcon } from "./icons/EndIcon";
import { FontSizeIcon } from "./icons/FontSizeIcon";
import { GradientIcon } from "./icons/GradientIcon";
import { ImagePositionIcon } from "./icons/ImagePositionIcon";
import { ImageSizeIcon } from "./icons/ImageSizeIcon";
import { LetterSpacingIcon } from "./icons/LetterSpacingIcon";
import { LineHeightIcon } from "./icons/LineHeightIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { OpacityIcon } from "./icons/OpacityIcon";
import { RotateIcon } from "./icons/RotateIcon";
import { SquareIcon } from "./icons/SquareIcon";
import { StartIcon } from "./icons/StartIcon";
import { TextIcon } from "./icons/TextIcon";
import { WidthIcon } from "./icons/WidthIcon";

export function RightPanel() {
  const { elements, selectedElement, updateElement, removeElement } = useOg()
  const selectedElementData = elements.find(element => element.id === selectedElement)

  if (!selectedElementData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-600 text-center">Create or select an element <br /> to get started.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      <p className="text-xs text-gray-600">Size & Position</p>
      <div className="grid grid-cols-2 gap-2">
        <Input max={1200 - selectedElementData.width} min={0} onChange={value => {
          updateElement({
            ...selectedElementData,
            x: value,
          });
        }} suffix="px" type="number" value={selectedElementData.x}>
          X
        </Input>
        <Input max={630 - selectedElementData.height} min={0} onChange={value => {
          updateElement({
            ...selectedElementData,
            y: value,
          });
        }} suffix="px" type="number" value={selectedElementData.y}>
          Y
        </Input>
        <Input onChange={value => {
          updateElement({
            ...selectedElementData,
            width: value,
          });
        }} suffix="px" type="number" value={selectedElementData.width}>
          W
        </Input>
        <Input onChange={value => {
          updateElement({
            ...selectedElementData,
            height: value,
          });
        }} suffix="px" type="number" value={selectedElementData.height}>
          H
        </Input>
      </div>
      <div className="h-[1px] w-full bg-gray-100" />
      {selectedElementData.tag === 'p' || selectedElementData.tag === 'span' ? (
        <>
          <p className="text-xs text-gray-600">Font</p>
          <div className="grid grid-cols-2 gap-2">
            <Select onChange={value => {
              updateElement({
                ...selectedElementData,
                fontFamily: value as unknown as typeof FONTS[number],
                fontWeight: WEIGHTS[value as unknown as typeof FONTS[number]].includes(selectedElementData.fontWeight) ? selectedElementData.fontWeight : 400,
              });
            }} value={selectedElementData.fontFamily} values={[...FONTS]}>
              <TextIcon />
            </Select>
            <Select onChange={value => {
              updateElement({
                ...selectedElementData,
                fontWeight: Number(value),
              });
            }} value={String(selectedElementData.fontWeight)} values={WEIGHTS[selectedElementData.fontFamily].map(String)}>
              <BoldIcon />
            </Select>
            <Input onChange={value => {
              updateElement({
                ...selectedElementData,
                fontSize: value,
              });
            }} suffix="px" type="number" value={selectedElementData.fontSize}>
              <FontSizeIcon />
            </Input>
            <Input onChange={value => {
              updateElement({
                ...selectedElementData,
                color: value,
              });
            }} type="color" value={selectedElementData.color}>
              <ColorIcon />
            </Input>
            <Input max={5} min={0} onChange={value => {
              updateElement({
                ...selectedElementData,
                lineHeight: value,
              });
            }} type="number" value={selectedElementData.lineHeight}>
              <LineHeightIcon />
            </Input>
            <Input max={5} min={0} onChange={() => { updateElement(selectedElementData); }} type="number" value={0}>
              <LetterSpacingIcon />
            </Input>
            <Select onChange={value => {
              updateElement({
                ...selectedElementData,
                // @ts-expect-error wtf?
                align: value,
              });
            }} value={selectedElementData.align} values={['left', 'right', 'center']}>
              <AlignLeftIcon />
            </Select>
            {selectedElementData.tag === 'p' ? (
              <Input className="col-span-full" onChange={value => {
                updateElement({
                  ...selectedElementData,
                  content: value,
                });
              }} type="textarea" value={selectedElementData.content} />
            ) : null}
          </div>
        </>
      ) : null}
      {selectedElementData.tag === 'div' && !selectedElementData.backgroundImage ? (
        <>
          {!selectedElementData.gradient ? (
            <>
              <p className="text-xs text-gray-600">Background color</p>
              <div className="grid grid-cols-1 gap-2 w-full">
                <Input onChange={value => {
                  updateElement({
                    ...selectedElementData,
                    backgroundColor: value,
                  });
                }} type="color" value={selectedElementData.backgroundColor}>
                  <ColorIcon />
                </Input>
              </div>
            </>
          ) : null}
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background gradient</p>
            {selectedElementData.gradient ? (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElementData,
                  gradient: undefined,
                });
              }} type="button">
                <DeleteIcon />
              </button>
            ) : (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElementData,
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
          {selectedElementData.gradient ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input onChange={value => {
                updateElement({
                  ...selectedElementData,
                  // @ts-expect-error wtf?
                  gradient: {
                    ...selectedElementData.gradient,
                    start: value,
                  }
                });
              }} type="color" value={selectedElementData.gradient.start}>
                <StartIcon />
              </Input>
              <Input onChange={value => {
                updateElement({
                  ...selectedElementData,
                  // @ts-expect-error wtf?
                  gradient: {
                    ...selectedElementData.gradient,
                    end: value,
                  }
                });
              }} type="color" value={selectedElementData.gradient.end}>
                <EndIcon />
              </Input>
              <Select onChange={value => {
                updateElement({
                  ...selectedElementData,
                  gradient: {
                    ...selectedElementData.gradient,
                    // @ts-expect-error wtf?
                    type: value,
                  },
                });
              }} value={selectedElementData.gradient.type} values={['linear', 'radial']}>
                <GradientIcon />
              </Select>
              {selectedElementData.gradient.type === 'linear' ? (
                <Input max={360} min={-360} onChange={value => {
                  updateElement({
                    ...selectedElementData,
                    // @ts-expect-error wtf?
                    gradient: {
                      ...selectedElementData.gradient,
                      angle: value,
                    },
                  });
                }} suffix="deg" type="number" value={selectedElementData.gradient.angle}>
                  <SquareIcon />
                </Input>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
      {selectedElementData.tag === 'div' && !selectedElementData.gradient ? (
        <>
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background image</p>
            {selectedElementData.backgroundImage ? (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElementData,
                  backgroundImage: undefined,
                });
              }} type="button">
                <DeleteIcon />
              </button>
            ) : (
              <button className="text-gray-600 hover:text-gray-900" onClick={() => {
                updateElement({
                  ...selectedElementData,
                  backgroundImage: 'https://source.unsplash.com/random',
                  backgroundSize: 'cover',
                });
              }} type="button">
                <AddIcon />
              </button>
            )}
          </div>
          {selectedElementData.backgroundImage ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input className="col-span-full" onChange={value => {
                updateElement({
                  ...selectedElementData,
                  backgroundImage: value,
                });
              }} type="text" value={selectedElementData.backgroundImage}>
                <LinkIcon />
              </Input>
              <Select onChange={value => {
                updateElement({
                  ...selectedElementData,
                  // @ts-expect-error wtf?
                  backgroundSize: value,
                });
              }} value={selectedElementData.backgroundSize ?? ''} values={['contain', 'cover']}>
                <ImageSizeIcon />
              </Select>
              <Select onChange={() => { updateElement(selectedElementData); }} value="center" values={["center"]}>
                <ImagePositionIcon />
              </Select>
            </div>
          ) : null}
        </>
      ) : null}
      <div className="h-[1px] w-full bg-gray-100" />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Border</p>
        {selectedElementData.border ? (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElementData,
              border: undefined,
            });
          }} type="button">
            <DeleteIcon />
          </button>
        ) : (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElementData,
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
      {selectedElementData.border ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <Input onChange={value => {
            updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              border: {
                ...selectedElementData.border,
                color: value,
              }
            });
          }} type="color" value={selectedElementData.border.color}>
            <ColorIcon />
          </Input>
          <Input max={99} min={0} onChange={value => {
            updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              border: {
                ...selectedElementData.border,
                width: value,
              }
            });
          }} suffix="px" type="number" value={selectedElementData.border.width}>
            <WidthIcon />
          </Input>
          <Select onChange={value => {
            updateElement({
              ...selectedElementData,
              border: {
                ...selectedElementData.border,
                // @ts-expect-error wtf?
                style: value,
              }
            });
          }} value={selectedElementData.border.style} values={['outside', 'inside']}>
            <BorderStyleIcon />
          </Select>
        </div>
      ) : null}
      <div className="h-[1px] w-full bg-gray-100" />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Shadow</p>
        {selectedElementData.shadow ? (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElementData,
              shadow: undefined,
            });
          }} type="button">
            <DeleteIcon />
          </button>
        ) : (
          <button className="text-gray-600 hover:text-gray-900" onClick={() => {
            updateElement({
              ...selectedElementData,
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
      {selectedElementData.shadow ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          {selectedElementData.tag === 'p' || selectedElementData.tag === 'span' ? null : (
            <Input max={99} min={0} onChange={value => {
              updateElement({
                ...selectedElementData,
                // @ts-expect-error wtf?
                shadow: {
                  ...selectedElementData.shadow,
                  width: value,
                }
              });
            }} suffix="px" type="number" value={selectedElementData.shadow.width}>
              <WidthIcon />
            </Input>
          )}
          <Input max={99} min={0} onChange={value => {
            updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              shadow: {
                ...selectedElementData.shadow,
                blur: value,
              }
            });
          }} suffix="px" type="number" value={selectedElementData.shadow.blur}>
            <GradientIcon />
          </Input>
          <Input onChange={value => {
            updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              shadow: {
                ...selectedElementData.shadow,
                x: value,
              }
            });
          }} suffix="px" type="number" value={selectedElementData.shadow.x}>
            X
          </Input>
          <Input onChange={value => {
            updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              shadow: {
                ...selectedElementData.shadow,
                y: value,
              }
            });
          }} suffix="px" type="number" value={selectedElementData.shadow.y}>
            Y
          </Input>
          <Input onChange={value => {
            updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              shadow: {
                ...selectedElementData.shadow,
                color: value,
              }
            });
          }} type="color" value={selectedElementData.shadow.color}>
            <ColorIcon />
          </Input>
        </div>
      ) : null}
      <div className="h-[1px] w-full bg-gray-100" />
      <p className="text-xs text-gray-600">Miscellaneous</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input max={100} min={0} onChange={value => {
          updateElement({
            ...selectedElementData,
            opacity: value,
          });
        }} suffix="%" type="number" value={selectedElementData.opacity}>
          <OpacityIcon />
        </Input>
        <Input max={360} min={-360} onChange={value => {
          updateElement({
            ...selectedElementData,
            rotate: value,
          });
        }} suffix="deg" type="number" value={selectedElementData.rotate}>
          <RotateIcon />
        </Input>
        {selectedElementData.tag === 'div' ? (
          <Input max={999} min={0} onChange={value => {
            updateElement({
              ...selectedElementData,
              radius: value,
            });
          }} suffix="px" type="number" value={selectedElementData.radius ?? 0}>
            <CornerIcon />
          </Input>
        ) : null}
      </div>
      <div className="h-[1px] w-full bg-gray-100" />
      <p className="text-xs text-gray-600">Modifications</p>
      <div className="grid grid-cols-1 gap-2 w-full">
        <Button icon={<DeleteIcon />} onClick={() => { removeElement(selectedElementData.id); }} variant="danger">Delete</Button>
      </div>
    </div >
  )
}
