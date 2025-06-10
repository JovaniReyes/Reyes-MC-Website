// modalStore.js
import aboutMeData from "../../UI/About/AboutMeData";
import { useMiniModalsStore } from "./miniModalStore";
import { playSound } from "../../Utils/buttonSound";
import { create } from "zustand";
const EXIT_ANIM_MS = 500;          

export const useModalStore = create((set, get) => ({

  // States
  isModalOpen : false,
  modalTitle  : "",
  modalContent: null,
  modalType   : "",
  animation   : "",

  // Opens UI modal 
  openModal: (title, content, type, aboutID ) => {
    // Ignores request if a modal is already open
    if (get().isModalOpen) return;
    set({
      isModalOpen : true,
      modalTitle  : title,
      modalContent: content,
      modalType   : type,
      animation   : "enter",
    });

    //For Mini modals
    if (aboutID) {
      const { openMiniModal, closeAllMiniModals } = useMiniModalsStore.getState();
      closeAllMiniModals();

      aboutMeData[aboutID].miniImgs.forEach((img, idx) => {
        const miniID = `${aboutID}-mini-${idx + 1}`;
        const miniUI = (
          <div style={{ width: "100%", height: "100%" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4%"}}
              src={img}
              alt={`Extra about me #${idx + 2} URL: ${img}`}
            />
          </div>
        );
        setTimeout(() => {
          openMiniModal(miniID, miniUI);
        }, 500);
      });
    }
  },

  //Closes the UI modal
  closeModal: () => {
    set({ animation: "exit" });
    playSound();
    //MiniModal
    const { closeAllMiniModals } = useMiniModalsStore.getState();
    closeAllMiniModals();
    setTimeout(() => set({ isModalOpen: false }), EXIT_ANIM_MS);
  },

  //Opens a UI modal if its a new one, removes the old modal if present on the UI
  checkForOpenModal: (title, content, type, aboutID) => {
    const { isModalOpen, modalTitle, closeModal, openModal } = get();
    if(isModalOpen && modalTitle === title) return;
    else if(isModalOpen){
      closeModal();
      setTimeout(() => openModal(title, content, type, aboutID), EXIT_ANIM_MS);
      return;
    } else{
      openModal(title, content, type, aboutID);
    }
  },

  //Sets animation state
  setAnimation: (anim) => set({ animation: anim }),
}));
