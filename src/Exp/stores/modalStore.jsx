// modalStore.js
import aboutMeData from "../../UI/About/AboutMeData";
import { useMiniModalsStore } from "./miniModalStore";
import { playSound } from "../../Utils/buttonSound";
import { create } from "zustand";
const EXIT_ANIM_MS = 500;          

export const useModalStore = create((set, get) => ({

  // States
  isTeleportModal : false,
  isModalOpen     : false,
  isModalMap      : false,
  isMapOpen       : false,
  animation       : "",
  modalType       : "",
  modalTitle      : "",
  modalContent    : null,
  pendingModal    : null,

  openAfterMapCloses: (title, body, id) => set({pendingModal: {title, body, id}}),
  clearPending: () => set({ pendingModal: null }),

  // Opens UI modal 
  openModal: (title, content, type, aboutID ) => {
    // Ignores request if a modal is already open
    if (get().isModalOpen) return;
    set({
      isModalOpen  : true,
      animation    : "enter",
      modalType    : type,
      modalTitle   : title,
      modalContent : content,
    });

    //For Mini modals
    if (aboutID) {
      const { openMiniModal, closeAllMiniModals } = useMiniModalsStore.getState();
      closeAllMiniModals();

      aboutMeData[aboutID].miniImgs.forEach((img, idx) => {
        const miniID = `${aboutID}-mini-${idx + 1}`;
        const miniUI = (
          <div style={{ width: "100%", height: "100%" }}>
            <img style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4%"}} src={img} alt={`Mini-${idx + 1} URL: ${img}`}/>
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
    //Close out the miniModals before the main modal
    const { closeAllMiniModals } = useMiniModalsStore.getState();
    closeAllMiniModals();
    setTimeout(() => set({ isModalOpen: false }), EXIT_ANIM_MS);
  },

  //Opens a UI modal if its a new one, removes the old modal if present on the UI
  checkForOpenModal: (title, content, type, aboutID) => {
    const { isModalOpen, modalTitle, closeModal, openModal, closeMapModal, isMapOpen } = get();
    if(isMapOpen) closeMapModal();//Close Map
    if(isModalOpen && modalTitle === title) return;//Modal is already open, return
    else if(isModalOpen){//Close the current and open the new modal
      closeModal();
      setTimeout(() => openModal(title, content, type, aboutID), EXIT_ANIM_MS);
      return;
    } else{
      openModal(title, content, type, aboutID);
    }
  },
  /* ───── open a *teleport* modal (purple flash) ───── */
  openTeleportModal: () => {
    const { closeMapModal, openMapModal} = get();
    set({
      isModalOpen     : true,
      isModalMap      : true,
      isMapOpen       : true,
      isTeleportModal : true,
      animation       : "begin",
    });
    closeMapModal()
    setTimeout(() => {//Teleport Modal closes after .5 seconds
      set({ animation:"end", isTeleportModal: false,});
      set({ isModalOpen:false, isModalMap: false });
      openMapModal();
    }, 500);
  },

  openMapModal: () => {
    const { isMapOpen, isModalOpen, closeModal} = get();
    if (isMapOpen) return;
    else if (isModalOpen){
      const { closeAllMiniModals } = useMiniModalsStore.getState();
      closeAllMiniModals();
      closeModal();
      setTimeout(() => set({
        isModalOpen : true,
        isModalMap  : true,
        isMapOpen   : true,
        animation   : "begin",
      }), EXIT_ANIM_MS+500);
    }
    else{
      set({
        isModalOpen : true,
        isModalMap  : true,
        isMapOpen   : true,
        animation   : "begin",
      });
    }
  },

  //
  closeMapModal: () => {
    const { isMapOpen, isTeleportModal } = get();
    if(!isMapOpen && !isTeleportModal) return;
    set({
      isModalOpen : false,
      isModalMap  : false,
      isMapOpen   : false,
      animation   : "end",
    });
  },

  //Sets animation state
  setAnimation: (anim) => set({ animation: anim }),
}));



