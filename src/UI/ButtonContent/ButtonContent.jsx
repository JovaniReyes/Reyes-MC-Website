
import "./ButtonContent.scss";

/* ─── utility hooks ─── */
import { useMapControls } from "../../Exp/stores/mapControlsStore";
import { useModalStore } from "../../Exp/stores/modalStore";
import { useAudioStore } from "../../Exp/stores/audioStore";
import { playSound } from "../../Utils/buttonSound";
import ButtonContentData from "./ButtonContentData";
const Images = ({ img1, img2, imgText1, imgText2, isCreatorSection}) => {
  /* add a class so CSS knows how many we’re dealing with */
  const howMany = isCreatorSection ? "creator" : (img1 && img2 ? "two" : "one");

  return (
    <div className={`paragraph-images ${howMany}`}>
      {img1 && (<div className="image-wrap">
        <img src={img1} alt="" draggable="false" />
        {imgText1 && <div className="image-caption">{imgText1}</div>}
      </div>)}
      {img2 && (<div className="image-wrap">
        <img src={img2} alt="" draggable="false" />
        {imgText2 && <div className="image-caption">{imgText2}</div>}
      </div>)}
    </div>
  );
};
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
          {section.paragraphs.map(({ text, highlight, link, glow, img1, img2, imgText1, imgText2 }, pIdx) => {
            const classNames = `section-paragraph${highlight ? " accent-first-line" : ""}`;

            /* 1 ▸ non-linked paragraph --------------------------------- */
            if (!highlight || !link) {
              return (
                <div key={pIdx} className="paragraph-block">
                  <p className={classNames}>
                    {text}
                  </p>
                  {(img1 || img2) && (
                      <>
                        <Images img1={img1} img2={img2} />
                        <br />
                      </>
                    )}
                </div>
              );
            }

            /* 2 ▸ split once at the first newline ---------------------- */
            const nlIdx = text.search(/\r?\n/);
            const firstLine = nlIdx !== -1 ? text.slice(0, nlIdx) : text;
            const nlLen = nlIdx !== -1 && text[nlIdx] === "\r" ? 2 : 1;
            const restText  = nlIdx !== -1 ? text.slice(nlIdx + nlLen) : "";

            /* 3 ▸ render block ----------------------------------------- */
            return (
              <div key={pIdx} className="paragraph-block">
                <p className={classNames}>
                  {/* centred, glowing link */}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`highlight-link first-line${glow ? " glow" : ""}`}
                  >
                    {firstLine}
                  </a>

                  {/* indented remainder */}
                  {restText && <span className="indent-rest">{restText}</span>}
                </p>
                {/* optional images */}
                {(img1 || img2) && (
                  <Images img1={img1} img2={img2} imgText1={imgText1} imgText2={imgText2} isCreatorSection={section.header == "Creators"} />
                )}

                {/* single guaranteed break now lives *after* images */}
                <br />
                <br />
              </div>
            );
          })}
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
    <button className="button-project" title="ProjectBtn" onClick={handleClick} isProject={true}>
      {modalTitle}
    </button>
  );
};

export default AudioToggle;
