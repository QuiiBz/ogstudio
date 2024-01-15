"use client";
import { useEffect, useRef } from "react";
import type { OGElement } from "../lib/types";
import { createElementId } from "../lib/elements";
import { useZoomStore } from "../stores/zoomStore";
import { useElementsStore } from "../stores/elementsStore";
import { Element } from "./Element";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { EditorToolbar } from "./EditorToolbar";

interface OgProviderProps {
  imageId: string;
  width: number;
  height: number;
}

let elementsIdToCopy: string[] | undefined;

export function OgEditor({ imageId, width, height }: OgProviderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const zoom = useZoomStore((state) => state.zoom);
  const {
    selectedElementsId,
    setSelectedElementsId,
    elements,
    updateElements,
    removeElement,
    addElement,
    loadImage,
  } = useElementsStore();
  const { undo, redo } = useElementsStore.temporal.getState();

  /**
   * When the editor image is updated or loaded for the first time, reset every
   * state, and load the elements and fonts.
   */
  useEffect(() => {
    loadImage(imageId);
  }, [imageId, loadImage]);

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

      setSelectedElementsId([]);
    }

    function onKeyDown(event: KeyboardEvent) {
      // If we're not focusing the body, don't do anything
      if (event.target !== document.body) {
        return;
      }

      const isSelected = Boolean(selectedElementsId.length);

      // Move down
      if (event.key === "ArrowDown" && isSelected) {
        event.preventDefault();
        const selectedElements = elements.filter((item) =>
          selectedElementsId.includes(item.id),
        );
        if (selectedElements.length) {
          const updatedElements = selectedElements.map((selectedElement) => ({
            ...selectedElement,
            y: selectedElement.y + (event.shiftKey ? 10 : 1),
          }));
          updateElements(updatedElements);
        }
      }

      // Move up
      if (event.key === "ArrowUp" && isSelected) {
        event.preventDefault();
        const selectedElements = elements.filter((item) =>
          selectedElementsId.includes(item.id),
        );

        if (selectedElements.length) {
          const updatedElements = selectedElements.map((selectedElement) => ({
            ...selectedElement,
            y: selectedElement.y - (event.shiftKey ? 10 : 1),
          }));
          updateElements(updatedElements);
        }
      }

      // Move left
      if (event.key === "ArrowLeft" && isSelected) {
        event.preventDefault();
        const selectedElements = elements.filter((item) =>
          selectedElementsId.includes(item.id),
        );

        if (selectedElements.length) {
          const updatedElements = selectedElements.map((selectedElement) => ({
            ...selectedElement,
            x: selectedElement.x - (event.shiftKey ? 10 : 1),
          }));
          updateElements(updatedElements);
        }
      }

      // Move right
      if (event.key === "ArrowRight" && isSelected) {
        event.preventDefault();
        const selectedElements = elements.filter((item) =>
          selectedElementsId.includes(item.id),
        );

        if (selectedElements.length) {
          const updatedElements = selectedElements.map((selectedElement) => ({
            ...selectedElement,
            x: selectedElement.x + (event.shiftKey ? 10 : 1),
          }));
          updateElements(updatedElements);
        }
      }

      // Delete any selected element
      if ((event.key === "Backspace" || event.key === "Delete") && isSelected) {
        event.preventDefault();
        selectedElementsId.forEach((selectedElement) => {
          removeElement(selectedElement);
        });
      }

      // Unselect any selected element when pressing escape
      if (event.key === "Escape" && isSelected) {
        event.preventDefault();
        setSelectedElementsId([]);
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
      if (isSelected && event.key === "c" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        elementsIdToCopy = selectedElementsId;
      }

      // Paste a copied element
      if (event.key === "v" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();

        if (elementsIdToCopy) {
          const elementsToCopy = elements.filter(
            (item) => elementsIdToCopy?.includes(item.id),
          );
          elementsToCopy.forEach((elementToCopy) => {
            const newElement: OGElement = {
              ...elementToCopy,
              x: elementToCopy.x + 10,
              y: elementToCopy.y + 10,
              id: createElementId(),
            };
            addElement(newElement);
          });
          setSelectedElementsId(elementsIdToCopy);
        }
      }
    }

    if (rootRef.current) {
      rootRef.current.addEventListener("contextmenu", onContextMenu);
      rootRef.current.addEventListener("click", onClick);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      if (rootRef.current) {
        rootRef.current.removeEventListener("contextmenu", onContextMenu);
        rootRef.current.removeEventListener("click", onClick);
      }

      document.removeEventListener("keydown", onKeyDown);
    };
  }, [
    rootRef,
    selectedElementsId,
    removeElement,
    addElement,
    elements,
    setSelectedElementsId,
    updateElements,
    redo,
    undo,
  ]);

  return (
    <div className="w-screen h-screen flex flex-row justify-between items-center bg-gray-50 overflow-hidden">
      <div className="w-[300px] min-w-[300px] h-screen border-r border-gray-100 shadow-lg shadow-gray-100 bg-white z-10">
        <LeftPanel />
      </div>
      <div className="flex flex-col items-center gap-4 fixed transform left-1/2 -translate-x-1/2">
        <p className="text-xs text-gray-400 z-10">
          {width}x{height}
        </p>
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
            transform: `scale(${zoom / 100}) translateY(${
              32 / (zoom / 100)
            }px)`,
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
