// LoadingScreen.jsx
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import "./LoadingScreen.scss";
import { useProgress } from "@react-three/drei";
import { useAudioStore } from "../../Exp/stores/audioStore";
import { playSound } from "../../Utils/buttonSound";
import Background from "./Background";
import Button from "../Button/Button";
import { useAssetStore } from "../../Exp/stores/AssetStore";
import PixelHandSymbol from "../../images/Helpers/PixelHandSymbol.webp";
import PhoneSymbol from "../../images/Helpers/PhoneSymbol.webp";
import MouseSymbol from "../../images/Helpers/MouseSymbol.webp";
import ArrowSymbol from "../../images/Helpers/ArrowSymbol.webp";
import HouseSymbol from "../../images/Home/Home.webp";
import filledBar from "../../images/LoadingBar/FilledProgress.webp";
import unFilledBar from "../../images/LoadingBar/UnFilledProgress.webp";

import { audioMuteSymbol, audioPlaySymbol } from "../../Utils/preLoadUIImages";
import bookImg from "../../images/Buttons/BookSymbol.png";
import codeImg from "../../images/Buttons/CodeSymbol.png";
import mapImg from "../../images/Buttons/MapSymbol.webp";
/* ─────────────────── Helpers ─────────────────── */

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const listener = () => setMatches(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/** Animated hand + device + label */
const HelperIcons = memo(function HelperIcons({revealed, controlImg, deviceImg, label, flipPhase,isForwardPhase}) {
  const containerClass = `help-icons` + (revealed ? ` revealed` : ``) + (isForwardPhase ? ` forward` : ` backward`);
  return (
    <div className={containerClass}>
      <div className="icons">
        <img className="move-control" src={controlImg} alt="Move control icon" onAnimationIteration={flipPhase} />
        <img className="move-device" src={deviceImg} alt="Move device icon" />
        <p className="move-text">{label}</p>
      </div>
    </div>
  );
});

/** Progress bar */
function LoadingBar({ progress }) {
  const SEGMENTS = 11;                               // 👈 keep in sync with SCSS
  const filled   = Math.min(SEGMENTS, Math.floor((progress / 100) * SEGMENTS));
  return (
    <div className="loading-bar-wrapper"
    style={{"--tex-filled": `url(${filledBar})`,"--tex-empty" : `url(${unFilledBar})`,
      }}>
      <div className="loading-bar-container">
        <div className="loading-bar">
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <div key={i} className={`loading-segment${i < filled ? " filled" : ""}`}/>
          ))}
        </div>
        <div className="percentage">{Math.round(progress)}%</div></div>
    </div>
  );
}

/* ─────────────────── Main component ─────────────────── */

export default function LoadingScreen() {
  /* Drei loader */
  const { progress } = useProgress();
  const pendingAssets = useAssetStore(s => s.pending);
  /* Audio store */
  const { setIsAudioEnabled, playMusic } = useAudioStore();

  /* Local state */
  const [isRevealed, setIsRevealed] = useState(false);
  const [bgMounted, setBgMounted]   = useState(false);          // when <Background/> should exist
  const [bgReveal,  setBgReveal]    = useState(false);
  const [plainBgVisible, setPlainBgVisible] = useState(true);
  const [isForwardPhase, setIsForwardPhase] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [prog, setProg] = useState(0);
  const canEnterWorld = prog === 100 && pendingAssets === 0;
  const isMobile = useMediaQuery("(max-width: 1414px)");

  /* Assets & labels chosen once */
  const { controlImg, deviceImg, labels } = useMemo(() => ({
    controlImg: isMobile ? PixelHandSymbol : ArrowSymbol,
    deviceImg:  isMobile ? PhoneSymbol     : MouseSymbol,
    labels: {
      fwd:  isMobile ? "Forwards"  : "Scroll Down to Move Forwards",
      back: isMobile ? "Backwards" : "Scroll Up to Move Backwards",
    },
  }), [isMobile]);

  const flipPhase = useCallback(() => setIsForwardPhase((p) => !p), []);

  /* Reveal click */
  const handleReveal = () => {
    playMusic();
    setIsAudioEnabled(true);
    setIsRevealed(true);
    playSound();
    setTimeout(() => { setBgMounted(true);}, 4000);
  };

  /* When Background mounts, slide it away and drop solid colour */
  useEffect(() => {
    if (!bgMounted) return;
    // paint one frame in the “closed” position, then slide open
    requestAnimationFrame(() => {
      setBgReveal(true);        // adds .revealed → panels slide
      setPlainBgVisible(false); // solid #131311 goes transparent
    });
  }, [bgMounted]);

  /* Background finished */
  const handleAnimationFinished = useCallback(() => setAnimationFinished(true), []);

  /* Smooth % counter */
  useEffect(() => {
    // cancel any earlier chase whenever progress jumps
    let rafId;
    const tick = () => {
      setProg(prev => {
        if (prev >= progress) return prev;       // already caught up
        return Math.min(prev + .5, progress);     // +1 % per frame
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [progress]);

/* ─── new: quick descriptor list for the top-right buttons ─── */
  const btnDescriptions = useMemo(() => [
    { icon: mapImg,   text: "Teleport "},
    { icon: bookImg,  text: "Citations"},
    { icon: codeImg,  text: "Road Map"},
    { icon: audioPlaySymbol,  text: "Mute"},
  ],[]);

  /** two-row grid: first row = icons | second row = labels */
  const BtnDesc = ({ items }) => (
    <div className="btn-desc"> {items.map(({ text }) => (
        <span key={`label-${text}`} className="btn-desc-label"> {text} </span>
      ))}
    </div>
  );

  /* ────── RENDER ────── */
  if (animationFinished) return null;

  return (
    <div className="loading-screen" style={{ background: plainBgVisible ? "black" : "transparent", pointerEvents: plainBgVisible ? "auto" : "none",}} > 
      {bgMounted && (<Background isRevealed={bgReveal} onDone={handleAnimationFinished}/>)}
      <img src={HouseSymbol} alt="House Symbol" className={`intro-house${isRevealed ? " fade-out" : ""}`}/>

      <div className={`btn-desc-container ${isRevealed ? "revealed" : ""}`}>
        <div className="btn-descriptions">
          <BtnDesc items={btnDescriptions} />
          <span className="btn-desc-text">Button Descriptions</span>
        </div>
      </div>

      <div className={`tip photo-glow ${isRevealed ? "revealed" : ""}`}>
        <span className="tip-text">Interact with glowing photos…</span>
      </div>
      <div className={`tip load-time ${isRevealed ? "revealed" : ""}`}>
        <span className="tip-text">First visit takes longer to load…</span>
      </div>

      <div className="loading-screen-info-container">
        <HelperIcons
          revealed={isRevealed}
          controlImg={controlImg}
          deviceImg={deviceImg}
          label={isForwardPhase ? labels.fwd : labels.back}
          flipPhase={flipPhase}
          isForwardPhase={isForwardPhase}
        />

        {prog < 100 ? (<LoadingBar progress={prog}/>) : (!isRevealed && canEnterWorld ? (<Button onClick={handleReveal}>Enter World</Button>) : null)}
      </div>
    </div>
  );
}
