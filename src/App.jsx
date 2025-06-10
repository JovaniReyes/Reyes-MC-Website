
import './App.scss'
import Exp from './Exp/Exp';
import AudioToggle from './UI/AudioToggle/AudioToggle';
import CodeToggle from './UI/CodeToggle/CodeToggle';
import CitationToggle from './UI/CitationToggle/CitationsToggle';
import LoadingScreen from './UI/LoadingScreen/LoadingScreen';
import Modal from './UI/Modal/Modal';
import MiniModalsManager from "./Exp/stores/miniModalsManager";
import Project from './UI/Project/Project';

function App() {
 

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
