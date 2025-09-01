/* ButtonContent.jsx */
import "./ButtonContent.scss"

/* ─── utility hooks ─── */
import { useMapControls } from "../../Exp/stores/mapControlsStore";
import { useModalStore } from "../../Exp/stores/modalStore";
import { useAudioStore } from "../../Exp/stores/audioStore";
import { playSound } from "../../Utils/buttonSound";
import  ContentData from "../../Utils/data/contentData";

import Tabs from "./Tabs";
import { track } from '@vercel/analytics';
import PdfViewer from "../../Utils/PdfViewer";


/* ─── helper for inline images ─── */
export const Images = ({ img1, img2, imgText1, imgText2, img1HRef, isCreatorSection, mobWidth, desWidth,verticalImages }) => {
  const howMany = isCreatorSection ? "creator" : (img1 && img2 ? "two" : "one");
  const styleVars = {};
  if (mobWidth) styleVars["--mob-width"] = typeof mobWidth === "number" ? `${mobWidth}px` : mobWidth;
  if (desWidth) styleVars["--des-width"] = typeof desWidth === "number" ? `${desWidth}px` : desWidth;
  styleVars["--direct"] = verticalImages ? "column" : "row";
  return (
    <div className={`paragraph-images ${howMany}`} style={styleVars}>
      {img1 && (
        <div className="image-wrap">
          {img1HRef 
            ? (<a href={img1HRef} target="_blank" rel="noopener noreferrer"><img src={img1} alt={imgText1} draggable="false" /></a>) 
            : <img src={img1} alt={imgText1} draggable="false" />
          }
          {imgText1 && <div className="image-caption">{imgText1}</div>}
        </div>
      )}
      {img2 && (
        <div className="image-wrap">
          <img src={img2} alt={imgText2} draggable="false" />
          {imgText2 && <div className="image-caption">{imgText2}</div>}
        </div>
      )}
    </div>
  );
};

/* ─── static button images ─── */
import { audioMuteSymbol, audioPlaySymbol } from "../../Utils/preLoadUIImages";
import  bookImg  from "../../images/Buttons/BookSymbol.png";
import  codeImg  from "../../images/Buttons/CodeSymbol.png";
import  mapImg   from "../../images/Buttons/MapSymbol.webp";

/* ---------------------------------------------------------------------- */
/*  Main modal body                                                       */
/* ---------------------------------------------------------------------- */
const ButtonContent = ({ ContentID }) => {
  track("Button Clicked: " + ContentID);
  const data = ContentData[ContentID];
  const isProj = ContentID.substring(0,2)=== "PP";
  const isCitations = ContentID === "Cites" || isProj;
  if (!data) return <div>Content Not Found</div>;

  const phases = data.content;
  const tabLabels = phases.map(p => p.header);
  const renderPhase = (phase) => phase.sections ?? [phase];

  const renderParagraph = (paragraph, sectionHeader, pIdx) => {
    const {
      text, highlight, link, glow,
      img1, img2, imgText1, imgText2,
      mobWidth, desWidth, img1HRef,
      flipLayout, header: paragraphHeader,
      verticalImages, hasPDF,
    } = paragraph;

    const label = paragraphHeader || sectionHeader;
    const pClass = `section-paragraph${highlight ? " accent-first-line" : ""}`;

    const renderImages = () =>
      (img1 || img2) && (
        <Images
          img1HRef={img1HRef}
          img1={img1} img2={img2}
          mobWidth={mobWidth} desWidth={desWidth}
          imgText1={imgText1} imgText2={imgText2}
          verticalImages={verticalImages}
          isCreatorSection={["Creators & Users"].includes(sectionHeader)
          }
        />
      );

    if (flipLayout) {
      return (
        <div className="paragraph-block flipped-layout" key={pIdx}>
          <div className="flipped-wrapper">
            <div className="flipped-header-right">
              {highlight && link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className={`highlight-link${glow ? " glow" : ""}`}>
                  {label}
                </a>
              ): (label) }
            </div>
            <div className="flipped-text"> {text} </div>
          </div>
          {renderImages()}
        </div>
      );
    }

    // Normal layout
    const nl = text.search(/\r?\n/);
    const head = nl !== -1 ? text.slice(0, nl) : text;
    const rest = nl !== -1 ? text.slice(nl + (text[nl] === "\r" ? 2 : 1)) : "";
    if(hasPDF){
      return (
        <div className="paragraph-block" key={pIdx}>
          <PdfViewer />
      </div>
      );
    }

    return (
      <div className="paragraph-block" key={pIdx}>
        <p className={pClass}>
          {highlight ? (
            <>
              {glow ? (<a href={link} target="_blank" rel="noopener noreferrer" className={`highlight-link first-line${glow ? " glow" : ""}`}>
                {head}
              </a>) : <span  className={`highlight-link first-line`}>{head}</span >}
              {rest && <span className="indent-rest">{rest}</span>}
            </>
          ) : (
            text
          )}
        </p>
        {renderImages()}
      </div>
    );
  };

  const renderSection = (section, sIdx) => {
    const sSlug = section.header.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const hasFlipLayout = section.paragraphs?.some(p => p.flipLayout);

    return (
      <div className={`content-section section-${sSlug}`} key={sIdx}>
        {!isCitations && !hasFlipLayout && (
          <h3 className="section-header">{section.header}</h3>
        )}
        {(section.paragraphs ?? []).map((p, pIdx) =>
          renderParagraph(p, section.header, pIdx)
        )}
      </div>
    );
  };

  const renderActivePhase = (activeIdx) => {
    const phase = phases[activeIdx];
    const slug = phase.header.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    return (
      <div className={`content-phase section-${slug}`} key={slug}>
        {renderPhase(phase).map(renderSection)}
      </div>
    );
  };

  return (
    <div className="content-container">
      <Tabs key={ContentID} sections={tabLabels}>
        {renderActivePhase}
      </Tabs>
    </div>
  );
};


/* ---------------------------------------------------------------------- */
/*  Toggle buttons                                                        */
/* ---------------------------------------------------------------------- */
const ModalToggleButton = ({ title, modalTitle, contentID, imgSrc, imgAlt, btnName }) => {
  const {isModalOpen, modalTitle: curTitle, checkForOpenModal, closeModal} = useModalStore();
  const { isMapOpen, closeMap } = useMapControls();
  const handleClick = () => {
    playSound();

    /* toggle self off */
    if (isModalOpen && curTitle === modalTitle) {
      closeModal();
      return;
    }

    /* close map first if needed */
    if (isMapOpen && closeMap) {
      closeMap();
      useModalStore.getState().openAfterMapCloses(modalTitle, <ButtonContent ContentID={contentID}/>, contentID);
      return;
    }
    /* otherwise open normally */
    checkForOpenModal(modalTitle, <ButtonContent ContentID={contentID}/>, contentID);
  };

  return (
    <button className={`ui-btn ${btnName}`} title={title} onClick={handleClick}>
      <img className="button-img" src={imgSrc} alt={imgAlt} />
    </button>
  );
};

/* ─── audio toggle ─── */
export const AudioToggle = () => {
  const {isAudioEnabled, setIsAudioEnabled, pauseMusic, playMusic} = useAudioStore();

  const toggleAudio = () => {
    if (isAudioEnabled) pauseMusic();
    else playMusic();
    playSound();
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <button className="ui-btn audio-btn" title="AudioBtn" onClick={toggleAudio}>
      <img src={isAudioEnabled ? audioPlaySymbol : audioMuteSymbol} alt={isAudioEnabled ? "Audio Play Symbol" : "Audio Mute Symbol"} className="button-img"/>
    </button>
  );
};

/* ─── map toggle ─── */
export const MapToggle = () => {
  const { isMapOpen, toggleMap, closeMap } = useMapControls();
  const { isModalOpen, closeModal } = useModalStore();

  const handleClick = () => {
    playSound();

    if (isMapOpen && closeMap) {
      closeMap();
      return;
    }
    if (isModalOpen) closeModal();
    toggleMap?.();
  };

  return (
    <button className="ui-btn map-btn" title="MapBtn" onClick={handleClick}>
      <img src={mapImg} alt="Map symbol" className="button-img" />
    </button>
  );
};

/* ─── specific modal toggles ─── */
export const CitationToggle = () => (
  <ModalToggleButton
    title="CitationBtn"
    modalTitle="Citations"
    contentID="Cites"
    imgSrc={bookImg}
    imgAlt="Book symbol"
    btnName="cite-btn"
  />
);

export const CodeToggle = () => (
  <ModalToggleButton
    title="CodeBtn"
    modalTitle="Project Roadmap"
    contentID="Code"
    imgSrc={codeImg}
    imgAlt="Code symbol"
    btnName="code-btn"
  />
);

export const ProjectToggle = ({ modalTitle, contentID }) => {
  const { checkForOpenModal } = useModalStore();
  const handleClick = () => {
    playSound();
    checkForOpenModal(
      modalTitle,
      <ButtonContent ContentID={contentID} />,
      contentID
    );
  };
  return (
    <button className="button-project" title="ProjectBtn" onClick={handleClick} isproject="true">
      {modalTitle}
    </button>
  );
};

export default AudioToggle;
