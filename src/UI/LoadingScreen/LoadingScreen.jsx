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
      aria-label="Visit My Awwwards Honors Page"
      style={{
        transform: "translateY(-50%)",
        position: "absolute",
        top: "50%",
        right: 0,
      }}
    >
      <a
        href="https://www.awwwards.com/sites/jreyes-mc-portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          role="img"
          width="60"
          height="194"
          viewBox="0 0 53.08 171.358"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Visit My Awwwards Honors Page</title>
          <path className="js-color-bg" d="M0 0h53.08v171.358H0z" />
          <g className="js-color-text">
            <path d="M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.445a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.769-.166 1.436-.497 2.002m-1.703-3.347c-.435-.331-.967-.497-1.601-.497-.633 0-1.166.166-1.601.497-.433.331-.649.778-.649 1.345 0 .564.217 1.013.649 1.344.435.332.968.498 1.601.498.634 0 1.166-.166 1.601-.498.435-.331.649-.779.649-1.344.001-.567-.214-1.014-.649-1.345M22.911 117.75v-1.812h1.199c-.419-.265-.742-.586-.972-.966s-.345-.784-.345-1.213c0-.272.05-.569.146-.892l1.682.336a1.429 1.429 0 0 0-.205.76c0 .576.261 1.048.783 1.418.521.37 1.342.557 2.461.557h2.617v1.812h-7.366zM29.812 111.252c-.391.511-.857.851-1.403 1.016l-.776-1.446c.381-.138.68-.329.893-.577.215-.249.321-.544.321-.885a1.2 1.2 0 0 0-.168-.658c-.112-.175-.294-.263-.548-.263-.225 0-.406.105-.548.313-.142.21-.291.534-.446.973-.019.068-.058.17-.117.307-.224.565-.506 1.004-.848 1.315-.34.313-.779.467-1.314.467-.381 0-.727-.102-1.039-.306a2.185 2.185 0 0 1-.744-.84 2.554 2.554 0 0 1-.279-1.207c0-.497.105-.949.314-1.359.211-.408.506-.725.886-.949l.993 1.082c-.43.292-.644.686-.644 1.184a.84.84 0 0 0 .154.504.471.471 0 0 0 .401.212c.176 0 .338-.103.49-.307.15-.205.334-.604.547-1.199.205-.564.474-1.001.805-1.308.332-.308.756-.46 1.271-.46.721 0 1.299.229 1.732.687s.65 1.057.65 1.797c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495"></path>
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
