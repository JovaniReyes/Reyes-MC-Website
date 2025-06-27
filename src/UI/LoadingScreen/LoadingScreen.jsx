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
  const containerClass = `helper-icons-container` + (revealed ? ` revealed` : ``) + (isForwardPhase ? ` forward` : ` backward`);
  return (
    <div className={containerClass}>
      <img className="pixel-hand" src={controlImg} alt="Hand icon" onAnimationIteration={flipPhase} />
      <img className="pixel-phone" src={deviceImg} alt="Device icon" />
      <p className="gesture-label">{label}</p>
    </div>
  );
});

/** Progress bar */
function LoadingBar({ progress }) {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar" style={{ width: `${progress}%` }} />
      <div className="percentage">{Math.round(progress)}%</div>
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

  /* Hand ↔️ flip */
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
  const handleAnimationFinished = useCallback(
    () => setAnimationFinished(true),
    []
  );

  /* Smooth % counter */
  useEffect(() => {
    setProg((prev) => (progress > prev ? progress : prev));
  }, [progress]);

  /* ────── RENDER ────── */
  if (animationFinished) return null;

  return (
    <div className="loading-screen" style={{ background: plainBgVisible ? "black" : "transparent" }} > 
      {bgMounted && (<Background isRevealed={bgReveal} onDone={handleAnimationFinished}/>)}
      
      <img src={HouseSymbol} alt="House Symbol" className={`intro-house${isRevealed ? " fade-out" : ""}`}/>

      <div className="loading-screen-info-container">
        <HelperIcons
          revealed={isRevealed}
          controlImg={controlImg}
          deviceImg={deviceImg}
          label={isForwardPhase ? labels.fwd : labels.back}
          flipPhase={flipPhase}
          isForwardPhase={isForwardPhase}
        />

        {/* optional instructions block, left blank in original */}
        <div
          className={`instructions-container ${isRevealed ? "revealed" : ""}`}
        />

        {prog < 100 ? (<LoadingBar progress={prog}/>) : (!isRevealed && canEnterWorld ? (<Button onClick={handleReveal}>Enter World</Button>) : null)}
      </div>
    </div>
  );
}
