// Exp/stores/assetStore.ts
import { create } from "zustand";

type useState = {
  pending: number;
  start: (state: number) => void;
  done: (state: number) => void;
};

export const useAssetStore = create<useState>((set) => ({
  pending: 0,
  start: () => set((s) => ({ pending: s.pending + 1 })),
  done:  () => set((s) => ({ pending: Math.max(0, s.pending - 1) })),
}));
