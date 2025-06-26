// Exp/stores/assetStore.ts
import { create } from "zustand";


export const useAssetStore = create((set) => ({
  pending: 0,
  start: () => set((s) => ({ pending: s.pending + 1 })),
  done:  () => set((s) => ({ pending: Math.max(0, s.pending - 1) })),
}));
