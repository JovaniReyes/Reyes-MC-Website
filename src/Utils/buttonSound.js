import { useAudioStore } from "../Exp/stores/audioStore";

const buttonSound = new Audio("/Sounds/Click.ogg");

export const playSound = () =>{
    const isAudioEnabled = useAudioStore.getState().isAudioEnabled;
    const isTeleporting = useAudioStore.getState().isTeleporting;
    if(!isAudioEnabled && !isTeleporting) return;
    buttonSound.play().catch((error) => {
        console.error("Error playing sound: ", error);
    });
};