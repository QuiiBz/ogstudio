import { Button } from "./Button";
import { Input, Select } from "./Labels";
import { useOg } from "./OgPlayground";
import { FONTS, WEIGHTS } from "../_lib/fonts";
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
        <Input type="number" value={selectedElementData.x} suffix="px" min={0} max={1200 - selectedElementData.width} onChange={value => updateElement({
          ...selectedElementData,
          x: value,
        })}>
          X
        </Input>
        <Input type="number" value={selectedElementData.y} suffix="px" min={0} max={630 - selectedElementData.height} onChange={value => updateElement({
          ...selectedElementData,
          y: value,
        })}>
          Y
        </Input>
        <Input type="number" value={selectedElementData.width} suffix="px" onChange={value => updateElement({
          ...selectedElementData,
          width: value,
        })}>
          W
        </Input>
        <Input type="number" value={selectedElementData.height} suffix="px" onChange={value => updateElement({
          ...selectedElementData,
          height: value,
        })}>
          H
        </Input>
      </div>
      <div className="h-[1px] w-full bg-gray-100" />
      {selectedElementData.tag == 'p' || selectedElementData.tag === 'span' ? (
        <>
          <p className="text-xs text-gray-600">Font</p>
          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedElementData.fontFamily} values={[...FONTS]} onChange={value => updateElement({
              ...selectedElementData,
              fontFamily: value as unknown as typeof FONTS[number],
              fontWeight: WEIGHTS[value as unknown as typeof FONTS[number]].includes(selectedElementData.fontWeight) ? selectedElementData.fontWeight : 400,
            })}>
              <TextIcon />
            </Select>
            <Select value={String(selectedElementData.fontWeight)} values={WEIGHTS[selectedElementData.fontFamily].map(String)} onChange={value => updateElement({
              ...selectedElementData,
              fontWeight: Number(value),
            })}>
              <BoldIcon />
            </Select>
            <Input type="number" value={selectedElementData.fontSize} suffix="px" onChange={value => updateElement({
              ...selectedElementData,
              fontSize: value,
            })}>
              <FontSizeIcon />
            </Input>
            <Input type="color" value={selectedElementData.color} onChange={value => updateElement({
              ...selectedElementData,
              color: value,
            })}>
              <ColorIcon />
            </Input>
            <Input type="number" value={selectedElementData.lineHeight} min={0} max={5} onChange={value => updateElement({
              ...selectedElementData,
              lineHeight: value,
            })}>
              <LineHeightIcon />
            </Input>
            <Input type="number" value={0} min={0} max={5} onChange={() => updateElement(selectedElementData)}>
              <LetterSpacingIcon />
            </Input>
            <Select value={selectedElementData.align ?? 'left'} values={['left', 'right', 'center']} onChange={value => updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              align: value,
            })}>
              <AlignLeftIcon />
            </Select>
            {selectedElementData.tag === 'p' ? (
              <Input type="textarea" className="col-span-full" value={selectedElementData.content} onChange={value => updateElement({
                ...selectedElementData,
                content: value,
              })} />
            ) : null}
          </div>
        </>
      ) : null}
      {selectedElementData.tag == 'div' && !selectedElementData.backgroundImage ? (
        <>
          {!selectedElementData.gradient ? (
            <>
              <p className="text-xs text-gray-600">Background color</p>
              <div className="grid grid-cols-1 gap-2 w-full">
                <Input type="color" value={selectedElementData.backgroundColor} onChange={value => updateElement({
                  ...selectedElementData,
                  backgroundColor: value,
                })}>
                  <ColorIcon />
                </Input>
              </div>
            </>
          ) : null}
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-gray-600">Background gradient</p>
            {selectedElementData.gradient ? (
              <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
                ...selectedElementData,
                gradient: undefined,
              })}>
                <DeleteIcon />
              </button>
            ) : (
              <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
                ...selectedElementData,
                gradient: {
                  start: '#000000',
                  end: '#FFFFFF',
                  angle: 90,
                  type: 'linear',
                },
              })}>
                <AddIcon />
              </button>
            )}
          </div>
          {selectedElementData.gradient ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input type="color" value={selectedElementData.gradient.start} onChange={value => updateElement({
                ...selectedElementData,
                // @ts-expect-error wtf?
                gradient: {
                  ...selectedElementData.gradient,
                  start: value,
                }
              })}>
                <StartIcon />
              </Input>
              <Input type="color" value={selectedElementData.gradient.end} onChange={value => updateElement({
                ...selectedElementData,
                // @ts-expect-error wtf?
                gradient: {
                  ...selectedElementData.gradient,
                  end: value,
                }
              })}>
                <EndIcon />
              </Input>
              <Select value={selectedElementData.gradient.type} values={['linear', 'radial']} onChange={value => updateElement({
                ...selectedElementData,
                gradient: {
                  ...selectedElementData.gradient,
                  // @ts-expect-error wtf?
                  type: value,
                },
              })}>
                <GradientIcon />
              </Select>
              {selectedElementData.gradient.type === 'linear' ? (
                <Input type="number" value={selectedElementData.gradient.angle} min={-360} max={360} suffix="deg" onChange={value => updateElement({
                  ...selectedElementData,
                  // @ts-expect-error wtf?
                  gradient: {
                    ...selectedElementData.gradient,
                    angle: value,
                  },
                })}>
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
              <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
                ...selectedElementData,
                backgroundImage: undefined,
              })}>
                <DeleteIcon />
              </button>
            ) : (
              <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
                ...selectedElementData,
                backgroundImage: 'https://source.unsplash.com/random',
                backgroundSize: 'cover',
              })}>
                <AddIcon />
              </button>
            )}
          </div>
          {selectedElementData.backgroundImage ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              <Input className="col-span-full" type="text" value={selectedElementData.backgroundImage} onChange={value => updateElement({
                ...selectedElementData,
                backgroundImage: value,
              })}>
                <LinkIcon />
              </Input>
              <Select value={selectedElementData.backgroundSize ?? ''} values={['contain', 'cover']} onChange={value => updateElement({
                ...selectedElementData,
                // @ts-expect-error wtf?
                backgroundSize: value,
              })}>
                <ImageSizeIcon />
              </Select>
              <Select value="center" values={["center"]} onChange={() => updateElement(selectedElementData)}>
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
          <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
            ...selectedElementData,
            border: undefined,
          })}>
            <DeleteIcon />
          </button>
        ) : (
          <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
            ...selectedElementData,
            border: {
              color: '#000000',
              width: 1,
              style: 'outside',
            },
          })}>
            <AddIcon />
          </button>
        )}
      </div>
      {selectedElementData.border ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          <Input type="color" value={selectedElementData.border.color} onChange={value => updateElement({
            ...selectedElementData,
            // @ts-expect-error wtf?
            border: {
              ...selectedElementData.border,
              color: value,
            }
          })}>
            <ColorIcon />
          </Input>
          <Input type="number" value={selectedElementData.border.width} suffix="px" min={0} max={99} onChange={value => updateElement({
            ...selectedElementData,
            // @ts-expect-error wtf?
            border: {
              ...selectedElementData.border,
              width: value,
            }
          })}>
            <WidthIcon />
          </Input>
          <Select value={selectedElementData.border.style} values={['outside', 'inside']} onChange={value => updateElement({
            ...selectedElementData,
            border: {
              ...selectedElementData.border,
              // @ts-expect-error wtf?
              style: value,
            }
          })}>
            <BorderStyleIcon />
          </Select>
        </div>
      ) : null}
      <div className="h-[1px] w-full bg-gray-100" />
      <div className="flex items-center justify-between w-full">
        <p className="text-xs text-gray-600">Shadow</p>
        {selectedElementData.shadow ? (
          <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
            ...selectedElementData,
            shadow: undefined,
          })}>
            <DeleteIcon />
          </button>
        ) : (
          <button type="button" className="text-gray-600 hover:text-gray-900" onClick={() => updateElement({
            ...selectedElementData,
            shadow: {
              color: '#000000',
              width: 5,
              blur: 5,
              x: 0,
              y: 0,
            },
          })}>
            <AddIcon />
          </button>
        )}
      </div>
      {selectedElementData.shadow ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          {selectedElementData.tag === 'p' || selectedElementData.tag === 'span' ? null : (
            <Input type="number" value={selectedElementData.shadow.width} suffix="px" min={0} max={99} onChange={value => updateElement({
              ...selectedElementData,
              // @ts-expect-error wtf?
              shadow: {
                ...selectedElementData.shadow,
                width: value,
              }
            })}>
              <WidthIcon />
            </Input>
          )}
          <Input type="number" value={selectedElementData.shadow.blur} suffix="px" min={0} max={99} onChange={value => updateElement({
            ...selectedElementData,
            // @ts-expect-error wtf?
            shadow: {
              ...selectedElementData.shadow,
              blur: value,
            }
          })}>
            <GradientIcon />
          </Input>
          <Input type="number" value={selectedElementData.shadow.x} suffix="px" onChange={value => updateElement({
            ...selectedElementData,
            // @ts-expect-error wtf?
            shadow: {
              ...selectedElementData.shadow,
              x: value,
            }
          })}>
            X
          </Input>
          <Input type="number" value={selectedElementData.shadow.y} suffix="px" onChange={value => updateElement({
            ...selectedElementData,
            // @ts-expect-error wtf?
            shadow: {
              ...selectedElementData.shadow,
              y: value,
            }
          })}>
            Y
          </Input>
          <Input type="color" value={selectedElementData.shadow.color} onChange={value => updateElement({
            ...selectedElementData,
            // @ts-expect-error wtf?
            shadow: {
              ...selectedElementData.shadow,
              color: value,
            }
          })}>
            <ColorIcon />
          </Input>
        </div>
      ) : null}
      <div className="h-[1px] w-full bg-gray-100" />
      <p className="text-xs text-gray-600">Miscellaneous</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input type="number" value={selectedElementData.opacity} min={0} max={100} suffix="%" onChange={value => updateElement({
          ...selectedElementData,
          opacity: value,
        })}>
          <OpacityIcon />
        </Input>
        <Input type="number" value={selectedElementData.rotate} min={-360} max={360} suffix="deg" onChange={value => updateElement({
          ...selectedElementData,
          rotate: value,
        })}>
          <RotateIcon />
        </Input>
        {selectedElementData.tag === 'div' ? (
          <Input type="number" value={selectedElementData.radius ?? 0} min={0} max={999} suffix="px" onChange={value => updateElement({
            ...selectedElementData,
            radius: value,
          })}>
            <CornerIcon />
          </Input>
        ) : null}
      </div>
      <div className="h-[1px] w-full bg-gray-100" />
      <p className="text-xs text-gray-600">Modifications</p>
      <div className="grid grid-cols-1 gap-2 w-full">
        <Button onClick={() => removeElement(selectedElementData.id)} variant="danger" icon={<DeleteIcon />}>Delete</Button>
      </div>
    </div >
  )
}
