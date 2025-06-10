// miniModalsStore.js
import { create } from "zustand";

// Each mini-modal is an object with its own ID, content, etc.
export const useMiniModalsStore = create((set) => ({
  miniModals: [],
  animation: "",
  
  openMiniModal: (modalId, content) =>
    set((state) => ({
      miniModals: [
        ...state.miniModals,
        {
          id: modalId,
          content,
        },
      ],
      animation: "enter"
  })),

  closeMiniModal: (modalId) => set((state) => ({
      miniModals: state.miniModals.filter((m) => m.id !== modalId),
    })),

  closeAllMiniModals: () => {
    set({animation: "exit"});
    setTimeout(() => {
      set({miniModals: []});
    }, 500);
  }
}));
