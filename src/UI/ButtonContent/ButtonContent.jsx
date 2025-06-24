// ToggleButtons.jsx — merged AudioToggle, MapToggle, and ButtonContent logic

import React from "react";
import "./ButtonContent.scss";

/* ─── utility hooks ─── */
import { playSound }     from "../../Utils/buttonSound";
import { useModalStore } from "../../Exp/stores/modalStore";
import { useAudioStore } from "../../Exp/stores/audioStore";
import { useMapControls } from "../../Exp/stores/mapControlsStore";

/* ─── images ─── */
import audioPlaySymbol from "../../images/Buttons/AudioPlaySymbol.png";
import audioMuteSymbol from "../../images/Buttons/AudioMuteSymbol.png";
import bookImg         from "../../images/Buttons/BookSymbol.png";
import codeImg         from "../../images/Buttons/CodeSymbol.png";
import mapImg          from "../../images/Buttons/MapSymbol.webp";

/* ─── long-form content data ─── */
import ButtonContentData from "./ButtonContentData";

/* ------------------------------------------------------------------
 *  <ButtonContent /> — renders long‑form text sections
 * ------------------------------------------------------------------ */
const ButtonContent = ({ ContentID }) => {
  const content = ButtonContentData[ContentID];
  if (!content) return <div>Content Not Found</div>;

  return (
    <div className="content-container">
      {content.content.map((section, sIdx) => (
        <div key={sIdx} className="content-section">
          <h2 className="section-header">{section.header}</h2>
          {section.paragraphs.map(({ text, highlight }, pIdx) => (
            <p
              key={pIdx}
              className={`section-paragraph${highlight ? " accent-first-line" : ""}`}
            >
              {text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------
 *  Modal‑opening toggle with mutual‑exclusion logic
 * ------------------------------------------------------------------ */
const ModalToggleButton = ({
  title,
  modalTitle,
  contentID,
  imgSrc,
  imgAlt,
  posClass,
}) => {
  const {
    isModalOpen,
    modalTitle: curTitle,
    checkForOpenModal,
    closeModal,
  } = useModalStore();

  const { isMapOpen, closeMap } = useMapControls();

  const handleClick = () => {
    playSound();

    /* If clicking same button while its modal is open ⇒ close it */
    if (isModalOpen && curTitle === modalTitle) {
      closeModal();
      return;
    }

    /* Otherwise ensure the map is closed first */
    if (isMapOpen && closeMap){
      closeMap();
      useModalStore.getState().openAfterMapCloses(
        modalTitle,
        <ButtonContent ContentID={contentID} />,
        contentID
      );
      return;
    }

    /* open / switch modal content */
    checkForOpenModal(
      modalTitle,
      <ButtonContent ContentID={contentID} />,
      contentID,
    );
  };

  return (
    <button
      className={`toggle-button ${posClass}`}
      title={title}
      onClick={handleClick}
    >
      <img className="button-img" src={imgSrc} alt={imgAlt} />
    </button>
  );
};

/* ------------------------------------------------------------------
 *  AudioToggle — play / pause background music
 * ------------------------------------------------------------------ */
export const AudioToggle = () => {
  const { isAudioEnabled, setIsAudioEnabled, pauseMusic, playMusic } =
    useAudioStore();

  const toggleAudio = () => {
    if (isAudioEnabled) pauseMusic();
    else playMusic();
    playSound();
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <button
      className="toggle-button audio-position"
      title="AudioBtn"
      onClick={toggleAudio}
    >
      <img
        src={isAudioEnabled ? audioPlaySymbol : audioMuteSymbol}
        alt={isAudioEnabled ? "Audio Play Symbol" : "Audio Mute Symbol"}
        className="button-img"
      />
    </button>
  );
};

/* ------------------------------------------------------------------
 *  MapToggle — opens / closes the fast‑travel map
 *               and makes it mutually exclusive with modals
 * ------------------------------------------------------------------ */
export const MapToggle = () => {
  const { isMapOpen, toggleMap, closeMap } = useMapControls();
  const { isModalOpen, closeModal }     = useModalStore();

  const handleClick = () => {
    playSound();

    /* If map is open ⇒ close it (toggle) */
    if (isMapOpen && closeMap) {
      if (closeMap) closeMap();
      return;
    }

    /* close any open modal first */
    if (isModalOpen) closeModal();

    /* open the map */
    if (toggleMap) toggleMap();
  };

  return (
    <button
      className="toggle-button map-position"
      title="MapBtn"
      onClick={handleClick}
    >
      <img src={mapImg} alt="Map symbol" className="button-img" />
    </button>
  );
};

/* ------------------------------------------------------------------
 *  Legacy export wrappers (names unchanged)                           
 * ------------------------------------------------------------------ */
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
/* ------------------------------------------------------------------
 *  ProjectToggle — opens a modal with the current project’s write-up
 *                   (same mutual-exclusion logic as other toggles)
 * ------------------------------------------------------------------ */
export const ProjectToggle = ({ modalTitle, contentID }) => {

  const {
    isModalOpen,
    modalTitle: curTitle,
    checkForOpenModal,
    closeModal,
  } = useModalStore();

  const { isMapOpen, closeMap } = useMapControls();

  const handleClick = () => {
    playSound();

    /* clicking again on an open modal ⇒ close it */
    if (isModalOpen && curTitle === modalTitle) {
      closeModal();
      return;
    }

    /* if the map is open, close it first, then open the modal */
    if (isMapOpen && closeMap) {
      closeMap();
      useModalStore
        .getState()
        .openAfterMapCloses(
          modalTitle,
          <ButtonContent ContentID={contentID} />,
          contentID,
        );
      return;
    }

    /* otherwise just open / switch the modal */
    checkForOpenModal(
      modalTitle,
      <ButtonContent ContentID={contentID} />,
      contentID,
    );
  };

  /* ❗  Uses the original `.button-default` styles (no imgSrc / posClass) */
  return (
    <button
      className="button-default"
      title="ProjectBtn"
      onClick={handleClick}
    >
      {modalTitle}
    </button>
  );
};

/* keep the legacy default export intact */
export default AudioToggle;
