import React, {useEffect, useState} from 'react'
import "./LoadingScreen.scss";
import { useProgress } from '@react-three/drei';
import Button from '../Button/Button';
import { useAudioStore } from '../../Exp/stores/audioStore';
import { playSound } from '../../Utils/buttonSound';
import { useGLTF } from '@react-three/drei';
import PixelHandSymbol from '../../images/Helpers/PixelHandSymbol.webp';
import PhoneSymbol from '../../images/Helpers/PhoneSymbol.webp';
import MouseSymbol  from "../../images/Helpers/MouseSymbol.webp";
import SpinSymbol  from "../../images/Helpers/SpinSymbol.webp";



function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(
    () => window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // modern + fallback for older browsers
    media.addEventListener?.("change", listener) || media.addListener(listener);
    return () =>
      media.removeEventListener?.("change", listener) ||
      media.removeListener(listener);
  }, [query]);

  return matches;
}

export default function LoadingScreen() {
    const {progress}= useProgress();
    const {setIsAudioEnabled, playMusic} = useAudioStore();
    const [isRevealed, setIsRevealed] = useState(false);
    const [isForwardPhase, setIsForwardPhase] = useState(true);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);
    const isMobile = useMediaQuery("(max-width: 599px)");
    const [displayProg, setDisplayProg] = useState(0);

    /* pick the right asset just-in-time */
    const controlImg  = isMobile ? PixelHandSymbol  : SpinSymbol;
    const deviceImg = isMobile ? PhoneSymbol : MouseSymbol;
    const forwardCtrls = isMobile ? "Forwards" : "Scroll Down to Move Forwards";
    const backwardsCtrl = isMobile ? "Backwards" : "Scroll Up to Move Downards";

    const handleReveal = () => {
        playMusic();
        setIsAudioEnabled(true);
        setIsRevealed(true);
        playSound();
    }

    const handleAnimationFinished = () => {
        setIsAnimationFinished(true);
    }
    
    useEffect(() => {
        setDisplayProg((prev) => {
            if(progress > prev) return progress;
            return prev;
    });
    }, [progress]);

    let loadingScreen = null;

    if(!isAnimationFinished){
        loadingScreen = (
            <>
            <div className="loading-screen">
                <div className={`background-top ${isRevealed ? 'revealed' : ''}`} onTransitionEnd={handleAnimationFinished}></div>
                <div className={`background-bottom ${isRevealed ? 'revealed' : ''}`}></div>
                <div className="loading-screen-info-container">
                    <div className={`helper-icons-container ${isRevealed ? 'revealed' : ''}`}>
                        <img className="pixel-hand" src={controlImg} alt='Pixel Hand' onAnimationIteration={() => setIsForwardPhase(prev => !prev)}/ >
                        <img className="pixel-phone" src={deviceImg} alt='Pixel Phone'/>
                        <p className="gesture-label">{isForwardPhase ? forwardCtrls : backwardsCtrl}</p>
                    </div>
                    <div className={`instructions-container ${isRevealed ? 'revealed' : ''}`}>
                        <br></br><br></br>
                    </div>
                {displayProg < 100 ? (
                    <div className="loading-bar-container">
                        <div className="loading-bar"  style={{width: `${displayProg}%`}}></div>
                        <div className="percentage">{Math.round(displayProg)}%</div> 
                    </div>
                ) : !isRevealed ? (
                    <Button onClick={handleReveal}>Enter World</Button>
                ):(null)}
                    
                </div>
                
            </div>
            </>
        )
    }
    
    return <>{loadingScreen}</>
}

