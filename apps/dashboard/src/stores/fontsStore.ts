import { create } from "zustand";
import { DEFAULT_FONTS, Font, maybeLoadFont } from "../lib/fonts";

interface FontsState {
  installedFonts: Set<string>;
  /** install the font based on its name */
  installFont: (font: string) => void;
  allFonts: Font[];
}

if (typeof window !== "undefined") {
  fetch("/api/fonts")
    .then((res) => res.json())
    .then((fonts) => {
      useFontsStore.getState().allFonts = fonts;
    });
}

export const useFontsStore = create<FontsState>((set) => ({
  installedFonts: new Set(DEFAULT_FONTS),
  allFonts: [],
  installFont: (name) => {
    set((state) => {
      state.installedFonts.add(name);

      return state;
    });
  },
}));
