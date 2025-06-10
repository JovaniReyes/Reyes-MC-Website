
import './App.scss'
import Exp from './Exp/Exp';
import AudioToggle from './UI/AudioToggle/AudioToggle';
import CodeToggle from './UI/CodeToggle/CodeToggle';
import CitationToggle from './UI/CitationToggle/CitationsToggle';
import LoadingScreen from './UI/LoadingScreen/LoadingScreen';
import Modal from './UI/Modal/Modal';
import MiniModalsManager from "./UI/Modal/miniModal";
import Project from './UI/Project/Project';
import { useEffect } from 'react';
import aboutMeData from './UI/About/AboutMeData';
import { preloadImgs } from './Exp/utils/preloadImages';
function App() {
 //For preloading images
 useEffect(() =>{
  preloadImgs(aboutMeData);
 }, []);


  return(
    <>
    <LoadingScreen/>
    <AudioToggle/>
    <CodeToggle/>
    <CitationToggle/>
    <Modal>
      <Project></Project>
    </Modal>
    <MiniModalsManager/>
      <Exp/>
    </>
  );
};

export default App
