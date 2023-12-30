import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import type { OGElement } from "../../lib/types";
import { NotVisibleIcon } from "../icons/NotVisibleIcon"
import { TextIcon } from "../icons/TextIcon"
import { VisibleIcon } from "../icons/VisibleIcon"
import { useOg } from "../OgEditor"
import { BoxIcon } from "../icons/BoxIcon"
import { CircleIcon } from "../icons/CircleIcon"
import { ImageIcon } from "../icons/ImageIcon"
import { MagicWandIcon } from "../icons/MagicWandIcon"
import { CheckIcon } from "../icons/CheckIcon";

interface ElementRowProps {
  element: OGElement
}

export function ElementRow({ element }: ElementRowProps) {
  const { selectedElement, setSelectedElement, updateElement } = useOg()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function onSubmit(event: FormEvent) {
    event.preventDefault()

    if (!element.name) {
      let defaultName = ""

      if (element.tag === 'p') {
        defaultName = "Text"
      } else if (element.tag === 'div' && element.backgroundImage) {
        defaultName = "Image"
      } else if (element.tag === 'div' && !element.backgroundImage && !element.radius) {
        defaultName = "Box"
      } else if (element.tag === 'div' && !element.backgroundImage && element.radius) {
        defaultName = "Rounded box"
      } else {
        defaultName = "Dynamic text"
      }

      updateElement({
        ...element,
        name: defaultName
      })
    }

    setIsEditing(false)
  }

  return (
    <div className="flex justify-between items-center pb-2 cursor-auto" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <button
        className={`flex items-center gap-2 select-none text-gray-600 hover:text-gray-900 w-full ${selectedElement === element.id ? '!text-blue-500' : ''} ${!element.visible ? '!text-gray-300' : ''}`}
        onClick={() => { setSelectedElement(element.id); }}
        onDoubleClick={() => {
          if (isEditing)
            return

          setIsEditing(true)
        }}
        type="button"
      >
        {element.tag === 'p'
          ? <TextIcon height="1.4em" width="1.4em" />
          : null
        }
        {element.tag === 'div' && element.backgroundImage
          ? <ImageIcon height="1.4em" width="1.4em" />
          : null
        }
        {element.tag === 'div' && !element.backgroundImage && !element.radius
          ? <BoxIcon height="1.4em" width="1.4em" />
          : null
        }
        {element.tag === 'div' && !element.backgroundImage && element.radius
          ? <CircleIcon height="1.4em" width="1.4em" />
          : null
        }
        {element.tag === 'span'
          ? <MagicWandIcon height="1.4em" width="1.4em" />
          : null
        }
        {isEditing ? (
          <form className="flex items-center gap-2" onSubmit={onSubmit} ref={formRef}>
            <input
              
              // eslint-disable-next-line -- Usability and accessibility for users is not reduced here
              autoFocus
              className="w-48"
              id="elementNameInput"
              onChange={({ target }) => {
                updateElement({
                  ...element,
                  name: target.value
                })
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  formRef.current?.requestSubmit()
                }
              }}
              type="text"
              value={element.name}
            />
            <button
              className="text-gray-600 hover:text-gray-900"
              type="submit"
            >
              <CheckIcon />
            </button>
          </form>
        ) : element.name}
      </button>
      <button
        className="text-gray-600 hover:text-gray-900"
        onClick={() => {
          updateElement({
            ...element,
            visible: !element.visible,
          });
        }}
        type="button"
      >
        {element.visible ? <VisibleIcon /> : <NotVisibleIcon />}
      </button>
    </div>
  )
}
