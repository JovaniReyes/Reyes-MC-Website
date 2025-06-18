import React, {useEffect, useState} from 'react'
import "./LoadingScreen.scss";
import { useProgress } from '@react-three/drei';
import Button from '../Button/Button';
import { useAudioStore } from '../../Exp/stores/audioStore';
import { playSound } from '../../Utils/buttonSound';
import { useGLTF } from '@react-three/drei';


useGLTF.preload('/GLBs/FX/TET-transformed.glb');
useGLTF.preload('/GLBs/Maps/MapsT-v1.glb');
export default function LoadingScreen() {
    const {progress}= useProgress();
    const {setIsAudioEnabled, playMusic} = useAudioStore();
    const [isRevealed, setIsRevealed] = useState(false);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);
    const [displayProg, setDisplayProg] = useState(0);

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
                    <div className={`instructions-container ${isRevealed ? 'revealed' : ''}`}>
                        Swipe / Scroll to Navigate <br></br><br></br>
                        Toggle Audio at Top Right
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

