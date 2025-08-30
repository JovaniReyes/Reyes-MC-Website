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

function AwwwardsBadge({ revealed }) {
  return (
    <div
      id="awwwards"
      className={revealed ? "revealed" : ""}
      aria-label="Visit My Awwwards Nominee Page"
      style={{
        transform: "translateY(-50%)",
        position: "absolute",
        top: "50%",
        right: 0,
      }}
    >
      <a href="https://www.awwwards.com/sites/jreyes-mc-portfolio" target="_blank" rel="noopener noreferrer">
        <svg
          role="img"
          width="60" height="194"
          viewBox="0 0 53.08 171.358"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Visit My Awwwards Nominee Page!</title>
          <path className="js-color-bg" d="M0 0h53.08v171.358H0z"/>
          <g className="js-color-text">
            <path d="M20.048 153.585v-2.002l6.752-3.757h-6.752v-1.9h10.23v2.002l-6.752 3.757h6.752v1.9zM29.899 142.382a3.317 3.317 0 0 1-1.359 1.293c-.575.297-1.223.446-1.944.446-.721 0-1.369-.149-1.944-.446a3.317 3.317 0 0 1-1.359-1.293c-.331-.564-.497-1.232-.497-2.003 0-.769.166-1.437.497-2.002a3.332 3.332 0 0 1 1.359-1.294c.575-.297 1.224-.445 1.944-.445.722 0 1.369.148 1.944.445a3.326 3.326 0 0 1 1.359 1.294c.33.565.496 1.233.496 2.002.001.77-.166 1.438-.496 2.003m-1.703-3.348c-.435-.331-.967-.497-1.601-.497s-1.167.166-1.601.497c-.434.332-.65.78-.65 1.345s.217 1.014.65 1.346c.434.33.967.496 1.601.496s1.166-.166 1.601-.496c.434-.332.649-.78.649-1.346.001-.565-.215-1.013-.649-1.345M22.912 134.996v-1.812h1.185c-.43-.283-.752-.593-.973-.929-.219-.336-.329-.732-.329-1.19 0-.479.127-.902.38-1.272.254-.37.635-.633 1.141-.79-.478-.262-.851-.591-1.118-.985a2.221 2.221 0 0 1-.402-1.265c0-.682.2-1.218.599-1.607.4-.391.957-.585 1.668-.585h5.218v1.812H25.37c-.682 0-1.023.303-1.023.907 0 .467.264.85.789 1.146.527.299 1.286.446 2.28.446h2.865v1.813H25.37c-.682 0-1.023.303-1.023.906 0 .468.275.851.826 1.147.551.298 1.352.446 2.404.446h2.704v1.812h-7.369zM21.626 122.457c-.225.224-.502.336-.833.336s-.608-.112-.833-.336a1.128 1.128 0 0 1-.336-.833c0-.331.111-.609.336-.833.225-.225.502-.336.833-.336s.608.111.833.336c.225.224.337.502.337.833 0 .332-.112.608-.337.833m1.286-1.739h7.366v1.813h-7.366v-1.813zM22.912 118.668v-1.812h1.185a3.348 3.348 0 0 1-.951-1.009 2.434 2.434 0 0 1-.351-1.272c0-.681.19-1.229.57-1.644.38-.414.931-.621 1.651-.621h5.263v1.812h-4.722c-.418 0-.727.096-.92.285-.195.19-.293.447-.293.769 0 .302.116.58.351.833.233.254.577.458 1.03.613.453.156.992.234 1.615.234h2.938v1.812h-7.366zM29.833 109.129a3.33 3.33 0 0 1-1.432 1.169 4.535 4.535 0 0 1-1.805.373 4.537 4.537 0 0 1-1.807-.373c-.579-.248-1.057-.638-1.432-1.169s-.563-1.196-.563-1.995c0-.771.183-1.413.549-1.93a3.28 3.28 0 0 1 1.382-1.141 4.221 4.221 0 0 1 1.709-.364h.746v5.071c.447-.02.838-.183 1.168-.49.332-.307.498-.724.498-1.248 0-.41-.093-.754-.277-1.031-.186-.278-.473-.529-.863-.753l.542-1.462c.69.303 1.224.724 1.592 1.265.371.541.556 1.235.556 2.083 0 .799-.188 1.464-.563 1.995m-4.085-3.574c-.41.088-.746.261-1.009.52-.262.258-.395.61-.395 1.06 0 .428.137.784.409 1.067.272.282.604.458.994.525v-3.172zM29.833 100.878c-.375.531-.852.921-1.432 1.169a4.552 4.552 0 0 1-3.612 0c-.579-.248-1.057-.638-1.432-1.169s-.563-1.196-.563-1.995c0-.77.183-1.412.549-1.93a3.278 3.278 0 0 1 1.382-1.14 4.222 4.222 0 0 1 1.709-.365h.746v5.072a1.794 1.794 0 0 0 1.168-.49c.332-.307.498-.724.498-1.249 0-.41-.093-.753-.277-1.031-.186-.277-.473-.528-.863-.753l.542-1.462c.69.302 1.224.724 1.592 1.265.371.541.556 1.234.556 2.083 0 .799-.188 1.464-.563 1.995m-4.085-3.573c-.41.088-.746.261-1.009.519-.262.258-.395.611-.395 1.06 0 .429.137.784.409 1.067.272.282.604.458.994.526v-3.172zM35.481 16.926l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.781-14.969h3.713l2.673 10.276 2.524-10.276h3.445l2.524 10.276 2.674-10.276zM37.979 27.083c1.426 0 2.495 1.068 2.495 2.495 0 1.425-1.069 2.495-2.495 2.495-1.425 0-2.495-1.07-2.495-2.495-.001-1.427 1.07-2.495 2.495-2.495"></path>
          </g>
        </svg>
      </a>
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
      <AwwwardsBadge revealed={isRevealed}/>
    </div>
  );
}
