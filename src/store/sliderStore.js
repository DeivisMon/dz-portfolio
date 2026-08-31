import { create } from "zustand";
import { sliderData } from "../data/sliderData";

function pickRandomImages(count = 8) {
  const shuffled = [...sliderData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const useSliderStore = create((set, get) => ({
  selectedImages: null,
  justHandedOff: false,

  initSelection: () => {
    if (!get().selectedImages) {
      set({ selectedImages: pickRandomImages(8) });
    }
  },

  markHandoff: () => set({ justHandedOff: true }),
  clearHandoff: () => set({ justHandedOff: false }),
}));
