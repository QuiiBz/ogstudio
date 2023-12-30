import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';
import type { OGElement } from "../../lib/types";
import { NotVisibleIcon } from "../icons/NotVisibleIcon"
import { TextIcon } from "../icons/TextIcon"
import { VisibleIcon } from "../icons/VisibleIcon"
import { BoxIcon } from "../icons/BoxIcon"
import { CircleIcon } from "../icons/CircleIcon"
import { ImageIcon } from "../icons/ImageIcon"
import { MagicWandIcon } from "../icons/MagicWandIcon"
import { useElementsStore } from "../../stores/elementsStore";

interface ElementRowProps {
  element: OGElement
}

export function ElementRow({ element }: ElementRowProps) {
  const selectedElementId = useElementsStore(state => state.selectedElementId)
  const setSelectedElementId = useElementsStore(state => state.setSelectedElementId)
  const updateElement = useElementsStore(state => state.updateElement)
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

  return (
    <div className="flex justify-between items-center cursor-auto group" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <button
        className={`flex gap-2 select-none py-1 text-gray-600 hover:text-gray-900 w-full ${selectedElementId === element.id ? '!text-blue-500' : ''} ${!element.visible ? '!text-gray-300' : ''}`}
        onClick={() => { setSelectedElementId(element.id); }}
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
        {element.name}
      </button>
      <button
        className={`text-gray-600 hover:text-gray-900 hidden group-hover:block ${!element.visible ? '!block' : ''}`}
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
