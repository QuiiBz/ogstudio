import { clsx } from "clsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Button, Flex, IconButton, TextField } from "@radix-ui/themes";
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
  const selectedElementId = useElementsStore(
    (state) => state.selectedElementId,
  );
  const setSelectedElementId = useElementsStore(
    (state) => state.setSelectedElementId,
  );
  const updateElement = useElementsStore((state) => state.updateElement);
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

    updateElement({
      ...element,
      name: newName,
    });

    setIsEditing(false);
  }

  return (
    <Flex
      align="center"
      className="cursor-auto group"
      height="28px"
      justify="between"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Button
        className="grow justify-start"
        color={selectedElementId === element.id ? undefined : "gray"}
        disabled={!element.visible}
        ml="2"
        mr="4"
        onClick={() => {
          setSelectedElementId(element.id);
        }}
        onDoubleClick={(event) => {
          if (isEditing || !element.visible) {
            return;
          }

          event.preventDefault();
          setIsEditing(true);
        }}
        size="2"
        type="button"
        variant="ghost"
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
          <TextField.Root
            className="w-full elementNameInput"
            defaultValue={element.name}
            onBlur={(event) => {
              onSubmit(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Escape") {
                event.currentTarget.blur();
              }
            }}
            size="1"
            // eslint-disable-next-line -- Usability and accessibility for users is not reduced here
            autoFocus
          />
        ) : (
          element.name
        )}
      </Button>
      <IconButton
        className={clsx("opacity-0 group-hover:opacity-100", {
          "!opacity-100": !element.visible,
        })}
        color="gray"
        mr="1"
        onClick={() => {
          updateElement({
            ...element,
            visible: !element.visible,
          });
        }}
        size="1"
        variant="ghost"
      >
        {element.visible ? <VisibleIcon /> : <NotVisibleIcon />}
      </IconButton>
    </Flex>
  );
}
