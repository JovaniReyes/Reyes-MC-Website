import { create } from "zustand";

export const useMapControls = create(set => ({
  isMapOpen: false,
  advance:      null,
  teleport:     null,
  toggleMap: null,
  toggleFloor:  null,
  closeMap : null,

  registerHandlers: ({advance, teleport, toggleFloor}) => set({ advance, teleport, toggleFloor}),
  registerToggleMap: (toggle, closeM) => set({toggleMap: toggle, closeMap: closeM}),
  openMap:(val) => set({isMapOpen: val})
}));
