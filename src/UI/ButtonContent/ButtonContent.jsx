
import "./ButtonContent.scss";

/* ─── utility hooks ─── */
import { useMapControls } from "../../Exp/stores/mapControlsStore";
import { useModalStore } from "../../Exp/stores/modalStore";
import { useAudioStore } from "../../Exp/stores/audioStore";
import { playSound } from "../../Utils/buttonSound";
import ButtonContentData from "./ButtonContentData";

/* ─── images ─── */
import { audioMuteSymbol, audioPlaySymbol } from "../../Utils/preLoadUIImages";
import bookImg from "../../images/Buttons/BookSymbol.png";
import codeImg from "../../images/Buttons/CodeSymbol.png";
import mapImg from "../../images/Buttons/MapSymbol.webp";

const ButtonContent = ({ ContentID }) => {
  const content = ButtonContentData[ContentID];
  if (!content) return <div>Content Not Found</div>;
  return (
    <div className="content-container">
      {content.content.map((section, sIdx) => (
        <div key={sIdx} className="content-section">
          <h2 className="section-header">{section.header}</h2>
          {section.paragraphs.map(({ text, highlight }, pIdx) => (
            <p key={pIdx} className={`section-paragraph${highlight ? " accent-first-line" : ""}`}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

const ModalToggleButton = ({ title, modalTitle, contentID, imgSrc, imgAlt, posClass }) => {
  const { isModalOpen, modalTitle: curTitle, checkForOpenModal, closeModal } = useModalStore();
  const { isMapOpen, closeMap } = useMapControls();
  const handleClick = () => {
    playSound();
    //Toggle modals between open and closed
    if (isModalOpen && curTitle === modalTitle) {
      closeModal();
      return;
    }
    //Close map and open new modal
    if (isMapOpen && closeMap){
      closeMap();
      useModalStore.getState().openAfterMapCloses(modalTitle, <ButtonContent ContentID={contentID}/>, contentID);
      return;
    }
    //Check for previously open modal, close if one is open and open the new modal
    checkForOpenModal(modalTitle, <ButtonContent ContentID={contentID}/>, contentID);
  };
  return (
    <button className={`toggle-button ${posClass}`} title={title} onClick={handleClick}>
      <img className="button-img" src={imgSrc} alt={imgAlt} />
    </button>
  );
};


export const AudioToggle = () => {
  const { isAudioEnabled, setIsAudioEnabled, pauseMusic, playMusic } = useAudioStore();
  //Toggle the audio between playing and mute
  const toggleAudio = () => {
    if (isAudioEnabled) pauseMusic();
    else playMusic();
    playSound();
    setIsAudioEnabled(!isAudioEnabled);
  };
  return (
    <button className="toggle-button audio-position" title="AudioBtn" onClick={toggleAudio}>
      <img
        src={isAudioEnabled ? audioPlaySymbol : audioMuteSymbol}
        alt={isAudioEnabled ? "Audio Play Symbol" : "Audio Mute Symbol"}
        className="button-img"
      />
    </button>
  );
};

//Fast travel map toggle button
export const MapToggle = () => {
  const { isMapOpen, toggleMap, closeMap } = useMapControls();
  const { isModalOpen, closeModal } = useModalStore();
  const handleClick = () => {
    playSound();
    //Toggle the map between open and closed
    if (isMapOpen && closeMap) {
      closeMap();
      return;
    }
    //Before opening map, close any open modals, then open the map
    if (isModalOpen) closeModal();
    if (toggleMap) toggleMap();
  };
  return (
    <button className="toggle-button map-position" title="MapBtn" onClick={handleClick}>
      <img src={mapImg} alt="Map symbol" className="button-img" />
    </button>
  );
};

//Citations toggle button
export const CitationToggle = () => (
  <ModalToggleButton
    title="CitationBtn"
    modalTitle="Citations"
    contentID="Cites"
    imgSrc={bookImg}
    imgAlt="Book symbol"
    posClass="cite-position"
  />
);

//Code roadmap toggle button
export const CodeToggle = () => (
  <ModalToggleButton
    title="CodeBtn"
    modalTitle="Project Roadmap"
    contentID="Code"
    imgSrc={codeImg}
    imgAlt="Code symbol"
    posClass="code-position"
  />
);

//Project info toggle button
export const ProjectToggle = ({ modalTitle, contentID }) => {
  const { checkForOpenModal } = useModalStore();
  const handleClick = () => {
    playSound();
    checkForOpenModal(modalTitle, <ButtonContent ContentID={contentID}/>, contentID);
  };
  return (
    <button className="button-default" title="ProjectBtn" onClick={handleClick}>
      {modalTitle}
    </button>
  );
};

export default AudioToggle;
