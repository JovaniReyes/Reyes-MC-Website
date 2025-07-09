import { downstairsSymbol, upstairsSymbol, teleportSymbol, closeSymbol, moveDefaultSymbol, moveClickedSymbol } from "../../Utils/preLoadUIImages";
import { useMapControls } from "../../Exp/stores/mapControlsStore";
import { useModalStore } from "../../Exp/stores/modalStore";
import { useState, useEffect, useRef } from "react";
import { playSound } from "../../Utils/buttonSound";
import "../../Styles/Modal.scss";

const Modal = () => {
    const {isModalOpen, modalTitle, modalContent, closeModal, animation, modalType, isModalMap, isTeleportModal} = useModalStore();
    const type = (modalType === "Code" || modalType === "Cites") ? "button " : "";
    const { moveCursor, teleport, toggleFloor } = useMapControls();
    const [isFirstFloorImg, setisFirstFloorImg] = useState(true)
    const [isDTCmdsOpen, setIsDTCmdsOpen] = useState(false);
    const [pressedRight, setPressedRight] = useState(false);
    const [pressedLeft, setPressedLeft] = useState(false);
    const dtCmdsRef = useRef(null);
    const isCitations = modalType === "Cites";
    

    useEffect(() => {
        function handleDTCmdClick(click){
            if(isDTCmdsOpen && dtCmdsRef.current && !dtCmdsRef.current.contains(click.target)){
                setIsDTCmdsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleDTCmdClick);
        return () => document.removeEventListener("mousedown", handleDTCmdClick);
    }, [isDTCmdsOpen]);


    if(isTeleportModal) return (<div className={`teleport ${animation}`}/>);
    if(!isModalOpen && animation !== "exit" && !isTeleportModal) return null;


    const handleCloseModal = () =>{
        //closeModal();
        //closeAllMiniModals();
        //playSound();
    }

    const handleCloseBtn = () =>{
        closeModal();
        playSound();
    }
    
    function switchFloorImg(){
        setisFirstFloorImg((prev) => !prev);
    }

    if(isModalMap){
        //Return Map UI controls if the map is open, display Mobile if screen width < 1414px, else Desktop Key Binds
        return (
            <>
                {/* user-dismiss overlay for map controls */}
                <div className="overlay" onClick={handleCloseModal}/>
                <button
                    onPointerDown={() => setPressedLeft(true)}
                    onPointerUp={() => { setPressedLeft(false); moveCursor?.(-1);}}
                    onPointerLeave={() => setPressedLeft(false)}
                    className="mobile-move-btn left-arrow"
                >
                    <img src={pressedLeft ? moveClickedSymbol : moveDefaultSymbol} alt="Move Left" draggable={false}/>
                </button>
                <button
                    onPointerDown={() => setPressedRight(true)}
                    onPointerUp={() => { setPressedRight(false); moveCursor?.(1);}}
                    onPointerLeave={() => setPressedRight(false)}
                    className="mobile-move-btn right-arrow"
                >
                    <img src={pressedRight ? moveClickedSymbol : moveDefaultSymbol} alt="Move Right" draggable={false}/>
                </button>

                {/* floating “GO / teleport” + floor toggle stacked together */}
                <div className="mobile-controls">
                    <button onClick={teleport} className="control-btn fab"> <img src={teleportSymbol} alt="Teleport" className="teleport-btn-img" /> </button>
                    <button onClick={() => {switchFloorImg(), toggleFloor()}} className="control-btn floor-toggle"> <img src={isFirstFloorImg ? downstairsSymbol : upstairsSymbol} alt="FloorLevel" className="floor-btn-img"/> </button>
                </div>

                {/* Desktop key bind dropdown list */}
                <div className="desktop-controls">
                    <div className={`desktop-dropdown ${isDTCmdsOpen ? "open" : ""}`}
                        onClick={() => setIsDTCmdsOpen((prev) => !prev)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setIsDTCmdsOpen((prev) => !prev)}
                        ref={dtCmdsRef}
                    >
                        <span>Key Binds</span>
                        <div className={`desktop-dropdown-content ${isDTCmdsOpen ? "show" : ""}`}>
                            <ul className="command-list">
                                <li> <span className="cmd">Toggle Map Floor Level</span> <span className="key">W</span> </li>
                                <li> <span className="cmd">Previous Waypoint</span>      <span className="key">A</span> </li>
                                <li> <span className="cmd">Open/Close Map</span>         <span className="key">S</span> </li>
                                <li> <span className="cmd">Next Waypoint</span>          <span className="key">D</span> </li>
                                <li> <span className="cmd">Teleport</span>               <span className="key">E</span> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const headerType = !isCitations ? "modal-body" : "modal-body cites";
    return (
        <>
            {isModalOpen && <div className="overlay" onClick={handleCloseModal}> </div>}
            <div className={`modal ${type}${animation}`}>
                <div className="modal-header">
                    <div className="modal-header-wrapper">
                    <h1 className="modal-title">{modalTitle}</h1>
                    <button onClick={handleCloseBtn} className="modal-close-button"> <img src={closeSymbol} alt="Close Modal" className="button-img"/></button>
                    </div>
                </div>
                <div className={headerType}> {modalContent} </div>
            </div>
        </>
    )
}
export default Modal
