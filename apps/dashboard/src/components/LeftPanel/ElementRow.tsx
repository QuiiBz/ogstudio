import { clsx } from "clsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { OGElement } from "../../lib/types";
import { NotVisibleIcon } from "../icons/NotVisibleIcon";
import { TextIcon } from "../icons/TextIcon";
import { VisibleIcon } from "../icons/VisibleIcon";
import { BoxIcon } from "../icons/BoxIcon";
import { CircleIcon } from "../icons/CircleIcon";
import { ImageIcon } from "../icons/ImageIcon";
import { MagicWandIcon } from "../icons/MagicWandIcon";
import { useElementsStore } from "../../stores/elementsStore";

interface ElementRowProps {
  element: OGElement;
}

export function ElementRow({ element }: ElementRowProps) {
  const selectedElementsId = useElementsStore(
    (state) => state.selectedElementsId,
  );
  const setSelectedElementsId = useElementsStore(
    (state) => state.setSelectedElementsId,
  );
  const updateElements = useElementsStore((state) => state.updateElements);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id });
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function onSubmit(newName: string) {
    let finalName = newName;

    if (!finalName) {
      if (element.tag === "p") {
        finalName = "Text";
      } else if (element.tag === "div" && element.backgroundImage) {
        finalName = "Image";
      } else if (
        element.tag === "div" &&
        !element.backgroundImage &&
        !element.radius
      ) {
        finalName = "Box";
      } else if (
        element.tag === "div" &&
        !element.backgroundImage &&
        element.radius
      ) {
        finalName = "Rounded box";
      } else {
        finalName = "Dynamic text";
      }
    }

    updateElements([
      {
        ...element,
        name: newName,
      },
    ]);

    setIsEditing(false);
  }

  return (
    <div
      className="flex justify-between items-center cursor-auto group h-7"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <button
        className={clsx(
          "flex items-center gap-2 select-none text-gray-600 hover:text-gray-900 w-full",
          { "!text-blue-500": selectedElementsId.includes(element.id) },
          { "!text-gray-300": !element.visible },
        )}
        onClick={(event) => {
          setSelectedElementsId(
            event.shiftKey ? [...selectedElementsId, element.id] : [element.id],
          );
        }}
        onDoubleClick={(event) => {
          if (isEditing || !element.visible) {
            return;
          }

          event.preventDefault();
          setIsEditing(true);
        }}
        type="button"
      >
        {element.tag === "p" ? <TextIcon height="1.4em" width="1.4em" /> : null}
        {element.tag === "div" && element.backgroundImage ? (
          <ImageIcon height="1.4em" width="1.4em" />
        ) : null}
        {element.tag === "div" &&
        !element.backgroundImage &&
        !element.radius ? (
          <BoxIcon height="1.4em" width="1.4em" />
        ) : null}
        {element.tag === "div" && !element.backgroundImage && element.radius ? (
          <CircleIcon height="1.4em" width="1.4em" />
        ) : null}
        {element.tag === "span" ? (
          <MagicWandIcon height="1.4em" width="1.4em" />
        ) : null}
        {isEditing ? (
          <input
            // eslint-disable-next-line -- Usability and accessibility for users is not reduced here
            autoFocus
            className="w-48 outline-blue-500 outline-1 outline-offset-[3px] elementNameInput"
            defaultValue={element.name}
            onBlur={(event) => {
              onSubmit(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Escape") {
                event.currentTarget.blur();
              }
            }}
            type="text"
          />
        ) : (
          element.name
        )}
      </button>
      <button
        className={`text-gray-600 hover:text-gray-900 hidden group-hover:block ${
          !element.visible ? "!block" : ""
        }`}
        onClick={() => {
          updateElements([
            {
              ...element,
              visible: !element.visible,
            },
          ]);
        }}
        type="button"
      >
        {element.visible ? <VisibleIcon /> : <NotVisibleIcon />}
      </button>
    </div>
  );
}
