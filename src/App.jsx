
import './App.scss'
import Exp from './Exp/Exp';
import { useEffect } from 'react';
import Modal from './UI/Modal/Modal';
import Project from './UI/Project/Project';
import aboutMeData from './UI/About/AboutMeData';
import projectData from './UI/Project/ProjectData';
import ContentData from './Utils/data/contentData';
import { Analytics } from '@vercel/analytics/react';
import MiniModalsManager from "./UI/Modal/miniModal";
import { preloadImages } from "./Exp/utils/preloadImages";
import LoadingScreen from './UI/LoadingScreen/LoadingScreen';
import { CitationToggle, CodeToggle, AudioToggle, MapToggle} from './UI/ButtonContent/ButtonContent';

function App() {
 //For preloading images
 useEffect(() =>{
  preloadImages(ContentData, aboutMeData, projectData);
 }, []);


  return(
    <>
    <Analytics />
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
