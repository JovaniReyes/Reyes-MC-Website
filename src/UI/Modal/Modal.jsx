import React, {useState, useEffect, useRef } from "react";
import "../../Styles/Modal.scss";
import { useModalStore } from "../../Exp/stores/modalStore";
import {playSound} from "../../Utils/buttonSound";
import {useMiniModalsStore} from "../../Exp/stores/miniModalStore"
import closeSymbol from '../../images/Buttons/CloseSymbol.svg';
import teleportSymbol from "../../images/Buttons/EnderPearl.webp"
import downstairsSymbol from "../../images/Buttons/DownstairsSymbol.webp";
import upstairsSymbol from "../../images/Buttons/UpstairsSymbol.webp";
import { useMapControls } from "../../Exp/stores/mapControlsStore";


const Modal = () => {
    const {isModalOpen, modalTitle, modalContent, closeModal, animation, modalType, isModalMap, isTeleportModal} = useModalStore();
    const { advance, teleport, toggleFloor } = useMapControls();
    const [isDsktpCmdsOpen, setIsDsktpCmdsOpen] = useState(false);
    const { closeAllMiniModals } = useMiniModalsStore();
    const [isFirstFloor, setIsFirstFloor] = useState(true)
    const dsktpCmdsRef = useRef(null);
    
    const type = (modalType === "Code" || modalType === "Citation") ? "button " : "";

    useEffect(() => {
        function handleOutsideClick(click){
            if(isDsktpCmdsOpen && dsktpCmdsRef.current && !dsktpCmdsRef.current.contains(click.target)){
                setIsDsktpCmdsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isDsktpCmdsOpen]);

    if(isTeleportModal) return (<div className={`teleport ${animation}`}/>);
    if(!isModalOpen && animation !== "exit" && !isTeleportModal) return null;

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
    function switchFloor(){
        setIsFirstFloor((prev) => !prev);
    }
    if (isModalMap) {
        return (
        <>
            {/* user-dismiss overlay for map controls */}
            <div className="overlay" onClick={handleCloseModal} />

            {/*  <1414 px → triangular buttons */}
            {/* edge-docked arrows */}
            <button onClick={() => advance?.(-1)}   className="edge-btn left-arrow">  &lt; </button>
            <button onClick={() => advance?.(1)}    className="edge-btn right-arrow"> &gt; </button>

            {/* floating “GO / teleport” + floor toggle stacked together */}
            <div className="mobile-controls">
                <button onClick={teleport} className="control-btn fab"> <img src={teleportSymbol} alt="Teleport" className="teleport-btn-img" /> </button>
                <button onClick={() => {switchFloor(), toggleFloor()}} className="control-btn floor-toggle"> <img src={isFirstFloor ? downstairsSymbol : upstairsSymbol} alt="FloorLevel" className="floor-btn-img"/> </button>
            </div>

            {/* ≥1414 px → dropdown */}
            <div className="desktop-controls">
                <div className={`desktop-dropdown ${isDsktpCmdsOpen ? "open" : ""}`}
                    onClick={() => setIsDsktpCmdsOpen((prev) => !prev)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setIsDsktpCmdsOpen((prev) => !prev)}
                    ref={dsktpCmdsRef}
                >
                    <span>Key Binds</span>
                    <div className={`desktop-dropdown-content ${isDsktpCmdsOpen ? "show" : ""}`}>
                        <ul className="command-list">
                            <li><span className="cmd">Toggle Map Floor Level</span><span className="key">W</span></li>
                            <li>
                                <span className="cmd">Previous Waypoint</span><span className="key">A</span>
                            </li>
                            <li>
                                <span className="cmd">Open/Close Map</span><span className="key">S</span>
                            </li>
                            <li>
                                <span className="cmd">Next Waypoint</span><span className="key">D</span>
                            </li>
                            <li>
                                <span className="cmd">Teleport</span><span className="key">E</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>);
    }
    return (
        <>
            {isModalOpen && <div onClick={handleCloseModal} className="overlay"> </div>}
            <div className={`modal ${type}${animation}`}>
                <div className="modal-header">
                    <div className="modal-header-wrapper">
                    <h1 className="modal-title">{modalTitle}</h1>
                    <button onClick={handleCloseBtn} className="modal-close-button"> <img src={closeSymbol} alt="Close Modal" className="button-img"/></button>
                    </div>
                </div>
                <div className="modal-body"> {modalContent} </div>
            </div>
        </>
    )
}
export default Modal
