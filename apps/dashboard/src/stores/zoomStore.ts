import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ZoomState {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useZoomStore = create(
  persist<ZoomState>(
    (set, get) => ({
      zoom: 100,
      zoomIn: () => {
        if (get().zoom >= 100) {
          return;
        }

        set((state) => ({ zoom: state.zoom + 10 }));
      },
      zoomOut: () => {
        if (get().zoom <= 10) {
          return;
        }

        set((state) => ({ zoom: state.zoom - 10 }));
      },
    }),
    {
      name: "zoom",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
