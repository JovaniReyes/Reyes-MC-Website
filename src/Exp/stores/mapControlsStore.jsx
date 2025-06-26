import { create } from "zustand";

export const useMapControls = create(set => ({
  isMapOpen   : false,
  moveCursor  : null,
  teleport    : null,
  toggleMap   : null,
  toggleFloor : null,
  closeMap    : null,

  registerHandlers: ({moveCursor, teleport, toggleFloor}) => set({ moveCursor, teleport, toggleFloor}),
  registerToggleMap: (toggle, closeM) => set({toggleMap: toggle, closeMap: closeM}),
  openMap:(val) => set({isMapOpen: val})
}));
