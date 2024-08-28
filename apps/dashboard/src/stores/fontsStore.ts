import { create } from "zustand";
import { DEFAULT_FONTS, type Font } from "../lib/fonts";

interface FontsState {
  installedFonts: Set<string>;
  /** install the font based on its name */
  installFont: (font: string) => void;
  allFonts: Font[];
}

if (typeof window !== "undefined") {
  void fetch("/api/fonts")
    .then((res) => res.json())
    .then((fonts) => {
      useFontsStore.getState().allFonts = fonts as Font[];
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
