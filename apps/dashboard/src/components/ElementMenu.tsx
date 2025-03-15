import { ContextMenu } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useElementsStore } from "../stores/elementsStore";
import type { OGElement } from "../lib/types";
import { hasElementInClipboard } from "./OgEditor";

interface ElementMenuProps {
  element: OGElement;
  showGlobalShortcuts?: boolean;
  children: ReactNode;
}

export function ElementMenu({
  element,
  showGlobalShortcuts,
  children,
}: ElementMenuProps) {
  const removeElement = useElementsStore((state) => state.removeElement);
  const { undo, redo, pastStates, futureStates } =
    useElementsStore.temporal.getState();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content variant="soft">
        <ContextMenu.Item
          onClick={() => {
            const event = new KeyboardEvent("keydown", {
              key: "c",
              ctrlKey: true,
            });

            document.body.dispatchEvent(event);
          }}
          shortcut="⌘ C"
        >
          Copy
        </ContextMenu.Item>
        <ContextMenu.Item
          onClick={() => {
            const event = new KeyboardEvent("keydown", {
              key: "v",
              ctrlKey: true,
            });

            document.body.dispatchEvent(event);
          }}
          shortcut="⌘ V"
          disabled={!hasElementInClipboard()}
        >
          Paste
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item
          onClick={() => {
            const { elements, setElements } = useElementsStore.getState();
            const oldIndex = elements.findIndex(
              (current) => current.id === element.id,
            );
            const newIndex = elements.length - 1;

            const newElements = arrayMove(elements, oldIndex, newIndex);
            setElements(newElements);
          }}
        >
          Bring to front
        </ContextMenu.Item>
        <ContextMenu.Item
          onClick={() => {
            const { elements, setElements } = useElementsStore.getState();
            const oldIndex = elements.findIndex(
              (current) => current.id === element.id,
            );
            const newIndex = 0;

            const newElements = arrayMove(elements, oldIndex, newIndex);
            setElements(newElements);
          }}
        >
          Bring to back
        </ContextMenu.Item>
        <ContextMenu.Separator />
        {showGlobalShortcuts ? (
          <>
            <ContextMenu.Item
              disabled={pastStates.length === 0}
              onClick={() => {
                undo();
              }}
              shortcut="⌘ Z"
            >
              Undo
            </ContextMenu.Item>
            <ContextMenu.Item
              disabled={futureStates.length === 0}
              onClick={() => {
                redo();
              }}
              shortcut="⌘ ⇧ Z"
            >
              Redo
            </ContextMenu.Item>
          </>
        ) : null}
        <ContextMenu.Item
          color="red"
          onClick={() => {
            removeElement(element.id);
          }}
          shortcut="⌫"
        >
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
