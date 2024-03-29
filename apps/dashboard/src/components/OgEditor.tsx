"use client";
import { useEffect, useRef } from "react";
import type { OGElement } from "../lib/types";
import { createElementId } from "../lib/elements";
import { useZoomStore } from "../stores/zoomStore";
import { useElementsStore } from "../stores/elementsStore";
import { useImagesStore } from "../stores/imagesStore";
import { Element } from "./Element";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { EditorToolbar } from "./EditorToolbar";
import { EditorTitle } from "./EditorTitle";

interface OgProviderProps {
  imageId: string;
  width: number;
  height: number;
}

let elementIdToCopy: string | undefined;

export function OgEditor({ imageId, width, height }: OgProviderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const zoom = useZoomStore((state) => state.zoom);
  const {
    selectedElementId,
    setSelectedElementId,
    elements,
    updateElement,
    removeElement,
    addElement,
    loadImage,
  } = useElementsStore();
  const { undo, redo } = useElementsStore.temporal.getState();
  const setSelectedImageId = useImagesStore(
    (state) => state.setSelectedImageId,
  );

  /**
   * When the editor image is updated or loaded for the first time, reset every
   * state, and load the elements and fonts.
   */
  useEffect(() => {
    loadImage(imageId);

    if (useImagesStore.persist.hasHydrated()) {
      setSelectedImageId(imageId);
    }

    useImagesStore.persist.onFinishHydration(() => {
      setSelectedImageId(imageId);
    });
  }, [imageId, loadImage, setSelectedImageId]);

  useEffect(() => {
    function onContextMenu(event: MouseEvent) {
      event.preventDefault();
      // TODO
    }

    function onClick(event: MouseEvent) {
      const element = event.target as HTMLElement;

      if (
        element.classList.contains("element") ||
        element.classList.contains("handle") ||
        element === rootRef.current
      ) {
        return;
      }

      setSelectedElementId(null);
    }

    function onKeyDown(event: KeyboardEvent) {
      // If we're not focusing the body, don't do anything
      if (event.target !== document.body) {
        return;
      }

      // Move down
      if (event.key === "ArrowDown" && selectedElementId) {
        event.preventDefault();
        const element = elements.find((item) => item.id === selectedElementId);

        if (element) {
          updateElement({
            ...element,
            y: element.y + (event.shiftKey ? 10 : 1),
          });
        }
      }

      // Move up
      if (event.key === "ArrowUp" && selectedElementId) {
        event.preventDefault();
        const element = elements.find((item) => item.id === selectedElementId);

        if (element) {
          updateElement({
            ...element,
            y: element.y - (event.shiftKey ? 10 : 1),
          });
        }
      }

      // Move left
      if (event.key === "ArrowLeft" && selectedElementId) {
        event.preventDefault();
        const element = elements.find((item) => item.id === selectedElementId);

        if (element) {
          updateElement({
            ...element,
            x: element.x - (event.shiftKey ? 10 : 1),
          });
        }
      }

      // Move right
      if (event.key === "ArrowRight" && selectedElementId) {
        event.preventDefault();
        const element = elements.find((item) => item.id === selectedElementId);

        if (element) {
          updateElement({
            ...element,
            x: element.x + (event.shiftKey ? 10 : 1),
          });
        }
      }

      // Delete any selected element
      if (
        (event.key === "Backspace" || event.key === "Delete") &&
        selectedElementId
      ) {
        event.preventDefault();
        removeElement(selectedElementId);
      }

      // Unselect any selected element when pressing escape
      if (event.key === "Escape" && selectedElementId) {
        event.preventDefault();
        setSelectedElementId(null);
      }

      // Undo
      if (event.key === "z" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        undo();
      }

      // Redo
      if (event.key === "Z" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        redo();
      }

      // Copy an element
      if (
        selectedElementId &&
        event.key === "c" &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        elementIdToCopy = selectedElementId;
      }

      // Paste a copied element
      if (event.key === "v" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();

        const elementToCopy = elements.find(
          (item) => item.id === elementIdToCopy,
        );

        if (elementToCopy) {
          const newElement: OGElement = {
            ...elementToCopy,
            x: elementToCopy.x + 10,
            y: elementToCopy.y + 10,
            id: createElementId(),
          };

          addElement(newElement);
          elementIdToCopy = newElement.id;
        }
      }
    }

    const ref = rootRef.current;

    if (ref) {
      ref.addEventListener("contextmenu", onContextMenu);
      ref.addEventListener("click", onClick);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      if (ref) {
        ref.removeEventListener("contextmenu", onContextMenu);
        ref.removeEventListener("click", onClick);
      }

      document.removeEventListener("keydown", onKeyDown);
    };
  }, [
    rootRef,
    selectedElementId,
    removeElement,
    addElement,
    elements,
    setSelectedElementId,
    updateElement,
    redo,
    undo,
  ]);

  return (
    <div className="w-screen h-screen flex flex-row justify-between items-center bg-gray-50 overflow-hidden">
      <div className="w-[300px] min-w-[300px] h-screen border-r border-gray-100 shadow-lg shadow-gray-100 bg-white z-10">
        <LeftPanel />
      </div>
      <EditorTitle />
      <div className="flex flex-col items-center gap-4 fixed transform left-1/2 -translate-x-1/2">
        <div
          className="bg-white shadow-lg shadow-gray-100 relative"
          style={{ width, height, transform: `scale(${zoom / 100})` }}
        >
          <div
            ref={rootRef}
            style={{ display: "flex", width: "100%", height: "100%" }}
          >
            {elements.map((element) => (
              <Element element={element} key={element.id} />
            ))}
          </div>
        </div>
        <div
          className="border border-gray-100 absolute pointer-events-none"
          style={{
            width,
            height,
            transform: `scale(${zoom / 100})`,
          }}
        />
        <EditorToolbar />
      </div>
      <div className="w-[300px] min-w-[300px] h-screen flex flex-col border-l border-gray-100 shadow-lg shadow-gray-100 bg-white z-10">
        <RightPanel />
      </div>
    </div>
  );
}
