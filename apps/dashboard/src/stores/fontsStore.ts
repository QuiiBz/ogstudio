import { create } from "zustand";
import { DEFAULT_FONTS, type Font } from "../lib/fonts";

interface FontsState {
  installedFonts: Set<string>;
  installFont: (font: string) => void;
  allFonts: Font[];
}

// If we are in a browser, fetch the available fonts from the API
if (typeof window !== "undefined") {
  void fetch("/api/fonts")
    .then((response) => response.json())
    .then((fonts) => {
      useFontsStore.getState().allFonts = fonts as Font[];
    })
    // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable, no-console -- the error is logged
    .catch(console.error);
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
