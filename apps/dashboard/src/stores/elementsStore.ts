import { create } from "zustand";
import { temporal } from "zundo";
import type { OGElement } from "../lib/types";
import { maybeLoadFont } from "../lib/fonts";

interface ElementsState {
  imageId: string;
  elements: OGElement[];
  setElements: (elements: OGElement[]) => void;
  loadImage: (imageId: string) => void;
  selectedElementsId: string[];
  setSelectedElementsId: (id: string[]) => void;
  addElement: (element: OGElement) => void;
  removeElement: (elementId: string) => void;
  updateElement: (element: OGElement) => void;
}

export const useElementsStore = create<ElementsState>()(
  temporal(
    (set, get) => ({
      imageId: "",
      elements: [],
      setElements: (elements) => {
        set({ elements });
      },
      loadImage: (imageId) => {
        const elements = JSON.parse(
          localStorage.getItem(imageId) || "[]",
        ) as OGElement[];

        set({ imageId, elements, selectedElementsId: [] });

        // Immediately load fonts for elements that will be visible on the page.
        elements.forEach((element) => {
          if (element.tag === "p" || element.tag === "span") {
            maybeLoadFont(element.fontFamily, element.fontWeight);
          }
        });

        useElementsStore.temporal.getState().clear();
      },
      selectedElementsId: [],
      setSelectedElementsId: (ids) => {
        const newIds = [];

        ids.forEach((id) => {
          const element = get().elements.find((item) => item.id === id);

          // Don't allow selecting hidden elements
          if (element && !element.visible) {
            return;
          }

          newIds.push(id);
        });

        set({ selectedElementsId: ids });

        // Blur the currently focused DOM element (e.g. an input) when the user
        // edits an element
        if (document.activeElement instanceof HTMLElement) {
          if (document.activeElement.className.includes("elementNameInput")) {
            return;
          }

          document.activeElement.blur();
        }
      },
      addElement: (element) => {
        set((state) => {
          const elements = [...state.elements, element];

          return { elements, selectedElementsId: [element.id] };
        });
      },
      removeElement: (elementId) => {
        set((state) => {
          const elements = state.elements.filter(
            (element) => element.id !== elementId,
          );

          return { elements };
        });
      },
      updateElement: (element) => {
        set((state) => {
          const elements = state.elements.map((e) =>
            e.id === element.id ? element : e,
          );

          // If the element was hidden, and it was the currently selected element,
          // unselect it
          if (
            !element.visible &&
            state.selectedElementsId.includes(element.id)
          ) {
            state.setSelectedElementsId([
              ...state.selectedElementsId.filter((id) => id !== element.id),
            ]);
          }

          // Again, try to load the font if it's a text, because the font family or weight
          // might have changed
          if (
            (element.tag === "p" || element.tag === "span") &&
            element.visible
          ) {
            maybeLoadFont(element.fontFamily, element.fontWeight);
          }

          return { elements };
        });
      },
    }),
    {
      onSave: (_, state) => {
        localStorage.setItem(state.imageId, JSON.stringify(state.elements));
      },
    },
  ),
);
