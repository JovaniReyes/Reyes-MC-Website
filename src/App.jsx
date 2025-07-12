
import './App.scss'
import Exp from './Exp/Exp';
import LoadingScreen from './UI/LoadingScreen/LoadingScreen';
import Modal from './UI/Modal/Modal';
import MiniModalsManager from "./UI/Modal/miniModal";
import Project from './UI/Project/Project';
import { useEffect } from 'react';
import aboutMeData from './UI/About/AboutMeData';
import projectData from './UI/Project/ProjectData';
import ContentData from './Utils/data/contentData';
import { preloadImages } from "./Exp/utils/preloadImages";
import { CitationToggle, CodeToggle, AudioToggle, MapToggle} from './UI/ButtonContent/ButtonContent';

function App() {
 //For preloading images
 useEffect(() =>{
  preloadImages(ContentData, aboutMeData, projectData);
 }, []);


  return(
    <>
    <LoadingScreen/>
    <AudioToggle/>
    <CodeToggle/>
    <CitationToggle/>
    <MapToggle/>
    <Modal>
      <Project></Project>
    </Modal>
    <MiniModalsManager/>
      <Exp/>
    </>
  );
};

export default App
