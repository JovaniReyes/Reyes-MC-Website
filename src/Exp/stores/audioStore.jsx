import { create } from "zustand";

const music = new Audio("/Sounds/Danny.ogg");


export const useAudioStore = create((set) =>({
    isAudioEnabled: false,
    isTeleporting: false,
    setIsAudioEnabled: (state) => set({isAudioEnabled: state}),
    setIsTeleporting: (state) => set({isTeleporting: state}),
    playMusic: () => music.play(),
    pauseMusic: () => music.pause()
}));
