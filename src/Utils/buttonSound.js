import { useAudioStore } from "../Exp/stores/audioStore";

const buttonSound = new Audio("/Music/Click.ogg");

export const playSound = () =>{
    const isAudioEnabled = useAudioStore.getState().isAudioEnabled;
    if(!isAudioEnabled) return;
    buttonSound.play().catch((error) => {
        console.error("Error playing sound: ", error);
    });
};