import { create } from "zustand";

// Audio playback is driven by browser APIs.
const music = new Audio("/Sounds/Danny.ogg");

// Explicitly type the Zustand store.
type AudioState = {
  isAudioEnabled: boolean;
  isTeleporting: boolean;
  setIsAudioEnabled: (state: boolean) => void;
  setIsTeleporting: (state: boolean) => void;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
};

export const useAudioStore = create<AudioState>((set) => ({
  isAudioEnabled: false,
  isTeleporting: false,

  setIsAudioEnabled: (state) => set({ isAudioEnabled: state }),
  setIsTeleporting: (state) => set({ isTeleporting: state }),

  // HTMLMediaElement.play returns a Promise<void>
  playMusic: () => music.play(),
  pauseMusic: () => music.pause(),
}));
