import React, {useState, useLayoutEffect, useEffect } from "react";
import "../../Styles/Modal.scss";
import { useModalStore } from "../../Exp/stores/modalStore";
import {playSound} from "../../Utils/buttonSound";
import {useMiniModalsStore} from "../../Exp/stores/miniModals"

const Modal = () => {
    const {isModalOpen, modalTitle, modalContent, closeModal, animation, modalType} = useModalStore();
    const { closeAllMiniModals } = useMiniModalsStore();
    const type = (modalType === "Code" || modalType === "Citation") ? "button " : "";
    if(!isModalOpen && animation !== "exit") return null;

    const handleCloseModal = () =>{
        //closeModal();
        //closeAllMiniModals();
        //playSound();
    }
    const handleCloseBtn = () =>{
        closeModal();
        //closeAllMiniModals();
        playSound();
    }

    return (
        <>
            {isModalOpen && <div onClick={handleCloseModal} className="overlay"> </div>}
            <div className={`modal ${type}${animation}`}>
                <div className="modal-header">
                    <div className="modal-header-wrapper">
                    <h1 className="modal-title">{modalTitle}</h1>
                    <button onClick={handleCloseBtn} className="modal-close-button"> <svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="14" width="2" height="2" transform="rotate(-180 2 14)" fill="currentColor"/><rect x="4" y="12" width="2" height="2" transform="rotate(-180 4 12)" fill="currentColor"/><rect x="6" y="10" width="2" height="2" transform="rotate(-180 6 10)" fill="currentColor"/><rect x="6" y="6" width="2" height="2" transform="rotate(-180 6 6)" fill="currentColor"/><rect x="4" y="4" width="2" height="2" transform="rotate(-180 4 4)" fill="currentColor"/><rect x="2" y="2" width="2" height="2" transform="rotate(-180 2 2)" fill="currentColor"/><rect x="12" width="2" height="2" fill="currentColor"/><rect x="10" y="2" width="2" height="2" fill="currentColor"/><rect x="8" y="4" width="2" height="2" fill="currentColor"/><rect x="6" y="6" width="2" height="2" fill="currentColor"/><rect x="8" y="8" width="2" height="2" fill="currentColor"/><rect x="10" y="10" width="2" height="2" fill="currentColor"/><rect x="12" y="12" width="2" height="2" fill="currentColor"/> </svg>
                    </button>
                    </div>
                </div>
                <div className="modal-body"> {modalContent} </div>
            </div>
        </>
    )
}
export default Modal