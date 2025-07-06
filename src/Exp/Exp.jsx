import { Suspense, useEffect, useRef, useState, useMemo, useCallback} from 'react';
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { DebugCurve, CameraHelper } from './utils/DebugTools';
import { useMapControls } from "./stores/mapControlsStore";
import { Canvas, useFrame } from '@react-three/fiber';
import { useModalStore } from './stores/modalStore';
import { useAudioStore } from "./stores/audioStore";
import normalizeWheel from 'normalize-wheel';
import TeleportFX, {TeleportFXPreload} from './utils/TeleportFX';
import Nature from "./models/Nature";
import Photos from "./models/Photo";
import Mobs from "./models/Mobs";
import Mail from "./models/Mail";
import Home from "./models/Home";
import Maps, {MapsPreload} from "./models/Maps";
import * as THREE from "three";


let mapSoundIndex = 0;//Toggles between opening and closing map sound
const TELEPORT_DURATION = 0.35;//How long the Teleport FOV effect takes place
const TELEPORT_COOLDOWN = 1000;//Teleportation Cooldown timer, 1,000 MS = 1 second
const TELEPORT_FOVS = [73.5, 105, 35, 73.5];//The sequence of FOV switches during teleportation
const PICTURE_FOV = 63;//FOV when progress is within a ZOOM_POINTS window
const BASE_FOV = 70;//Base FOV for scene
const MAP_FOV = 73.5;//FOV when map is opened.

//Progress  points used for setting the FOV to PICTURE_FOV
const ZOOM_POINTS = [
  [0.2370, 0.2385],//About Me Set 1
  [0.2540, 0.2560],//About Me Set 2
  [0.4180, 0.4200],//About Me Set 3
  [0.5200, 0.5215],//About Me Set 4
  [0.5300, 0.5320],//About Me Set 5
  [0.5500, 0.5515],//About Me Set 6
];

//Set the sound arrays
const mapSounds = [
  new Audio("../../Sounds/Map/MapUpS1.ogg"),
  new Audio("../../Sounds/Map/MapDownS1.ogg"),
];
const teleportSound = [
  new Audio("../../Sounds/Teleport2.ogg"),
  new Audio("../../Sounds/Teleport1.ogg"),
];

//Adjust map and teleportation audio as well as disable looping
mapSounds.forEach(aud => {
  aud.volume = .25;
  aud.loop = false;
})
teleportSound.forEach(aud => {
  aud.volume = .5;
  aud.loop = false;
})

//Toggles and plays Map opening/closing sound
function playMapSound(){
  const {isAudioEnabled} = useAudioStore.getState();
  if(!isAudioEnabled) return;

  if(mapSoundIndex === 2) mapSoundIndex = 0;
  mapSounds[mapSoundIndex].play();
  mapSoundIndex++;
}
//Selects and plays 1 of 2 teleporting sounds
function playTeleportSound(){
  const {isAudioEnabled, setIsTeleporting} = useAudioStore.getState();
  if(!isAudioEnabled) return;

  setIsTeleporting(true);
  const sfx = Math.floor(Math.random() * 2);
  teleportSound[sfx].play();
  setIsTeleporting(false);
}

//Lerps FOV between BASE_FOV & PICTURE_FOV
const getLerpedFov = (prog, newFOV) => {
  for (let i = 0; i < ZOOM_POINTS.length; i++) {
    const [start, end] = ZOOM_POINTS[i];
    if (prog >= start && prog <= end) {
      const temp = (prog-start) / (end-start);
      const ease = Math.abs(2 * temp - 1);// 1→0→1 tri-ease
      return THREE.MathUtils.lerp(newFOV, BASE_FOV, ease);
    }
  }
  return BASE_FOV; // Not within any ZOOM_POINTS windows
};

//XZY points for where the user is placed across the scene
const POSITIONS = [
  //               X      Z       Y
  new THREE.Vector3(-17, 17.3, 0.85),  //1st step
  new THREE.Vector3(-15, 17.3, 5),   //2nd step
  new THREE.Vector3(-12, 17.30, 8),    //3rd step
  new THREE.Vector3(-9.0, 17.30,  5),     //4th step
  new THREE.Vector3(-4.00, 19,  4.0),      //5th step

  new THREE.Vector3(-3.5, 18.5,  7.00),      //Door Opens
  new THREE.Vector3(-3.50, 18.35,  11.0),       //Infront Of door
  new THREE.Vector3( 2.00, 18.35,  10.75),        //First Step inside (Door Closes)
  new THREE.Vector3( 8.50, 18.35,  11.25),         //Infront of Kitchen
  new THREE.Vector3( 7.25, 18.35,  8.00),          //Looking into living room
  new THREE.Vector3( 7.00, 18.35,  4.00),           //By Couch
  new THREE.Vector3( 2.25, 18.35,  2.35),            //On Couch
  new THREE.Vector3( 5.25, 18.35,  2.00),             //Looking at staircase
  new THREE.Vector3( 8.50, 19,  1.75),              //Bottom of Staircase
  new THREE.Vector3( 9.00, 23.5,  7.75),               //Top Of staircase
  new THREE.Vector3( 7, 23.5,  9),                //Looking into bedroom
  new THREE.Vector3( 7.75, 23.5,  10.5),                 //Looking at desk paintings

  new THREE.Vector3( 9.00, 23.50,  11.25),                 //Heading Back to staircase
  new THREE.Vector3( 9.50, 23.00,  6.00),                //Top Of staircase
  new THREE.Vector3( 9.00, 19.00,  1.75),               //Bottom of Staircase
  new THREE.Vector3( 6.65, 18.35,  2.00),              //Looking at staircase
  new THREE.Vector3( 7.50, 18.35,  8.00),             //Looking into living room
  new THREE.Vector3( 6.50, 18.35,  11.0),            //Infront of Kitchen
  new THREE.Vector3( 2.00, 18.35,  11.1),           //First Step inside (Door Opens)
  new THREE.Vector3(-3.00, 18.35,  11.1),          //Infront of door 
  new THREE.Vector3(-3.00, 18.35,  5.00),         //Outside of door (Door Closes)

  new THREE.Vector3(-6.00, 18.35,  5.00),       //5th step
  new THREE.Vector3(-8.0, 17.30,  5),      //4th step
  new THREE.Vector3(-10.0, 17.30,  5),     //3rd step
  new THREE.Vector3(-14, 17.30, 4),    //2nd step
  new THREE.Vector3(-24, 17.30, -3),   //1st step
];

export const CAT_CURVE = new THREE.CatmullRomCurve3(POSITIONS, true);

const Scene = ({camera, scrollRef, targetScrollProgress, setScrollProgress, lerpFactor, mouseOffset, setFieldOfView, isMapOpen, onTeleport, teleportEffects = [], fovShake, }) => {
  const tp_FOVS = fovShake?.current?.keys ?? TELEPORT_FOVS;
  const positions = useMemo(() => CAT_CURVE, []); 
  const prevProgress = useRef(0);
  const matPulseRef = useRef(0);
  
  
//{prog: 0.000, rot: new THREE.Euler(-3.15, 2, -3.15)},
  const rotations = useMemo(() =>  [
    {prog: 0.000, rot: new THREE.Euler(-3.3, -1.05, -3.3)},
    {prog: 0.030, rot: new THREE.Euler(-3.15, -.2, -3.15)},
    {prog: 0.040, rot: new THREE.Euler(-3.15, -.2, -3.15)},
    {prog: 0.080, rot: new THREE.Euler( 3, -2.4,  3)},

    {prog: 0.140, rot: new THREE.Euler( 3.1, -1.1, 3.1)},
    {prog: 0.166, rot: new THREE.Euler(-3.15, -.3, -3.15)},
    {prog: 0.188, rot: new THREE.Euler(-2.1, -1.394, -2.100)},

    {prog: 0.219, rot: new THREE.Euler(-1.355, -1.529, -1.355)},
    {prog: 0.235, rot: new THREE.Euler(-3.125, -0.1, -3.125)},//
    {prog: 0.255, rot: new THREE.Euler( 0.000, -1.000,  0.000)},
    {prog: 0.270, rot: new THREE.Euler( 0.000,  0.50,  0.000)},

    {prog: 0.300, rot: new THREE.Euler( 0.005,  0.146, -0.005)},
    {prog: 0.345, rot: new THREE.Euler(-3.131, -0.143, -3.131)},
    {prog: 0.395, rot: new THREE.Euler(3.126,  0.108,  3.126)},

    {prog: 0.415, rot: new THREE.Euler( 2.179, -1.318,  2.179)},
    {prog: 0.430, rot: new THREE.Euler(-4, -1.8,  -4)},//Left off
    {prog: 0.469, rot: new THREE.Euler(-3.123,  0.322,  3.123)},
    {prog: 0.475, rot: new THREE.Euler(-3.123,  0.522,  3.123)},

    {prog: 0.500, rot: new THREE.Euler(-3.135,  1.2,  3.135)},
    {prog: 0.534, rot: new THREE.Euler(-3.335, 0,  -3.1)},
    {prog: 0.552, rot: new THREE.Euler( 3.00, -0.40, -3.180)},
    {prog: 0.564, rot: new THREE.Euler( 0.500,  1.500, -.5000)},
    {prog: 0.575, rot: new THREE.Euler(-0.800, 0.000,  -0.00)},
    {prog: 0.594, rot: new THREE.Euler(-0.535,  0.168,  0.099)},

    {prog: 0.605, rot: new THREE.Euler(-0.500,  1.000,  0.000)},
    {prog: 0.620, rot: new THREE.Euler( 0.000,  2.500,  0.000)},
    {prog: 0.656, rot: new THREE.Euler(-3.100,  0.201,  3.150)},
    {prog: 0.670, rot: new THREE.Euler(-3.100, -0.175,  3.150)},
    {prog: 0.688, rot: new THREE.Euler(-3.057,  0.044,  3.150)},

    {prog: 0.719, rot: new THREE.Euler(-2.950,  1.500,  2.95)},
    {prog: 0.750, rot: new THREE.Euler(-0.717,  1.467,  0.714)},
    {prog: 0.770, rot: new THREE.Euler( 0.000,  0.571,  0.031)},
    {prog: 0.775, rot: new THREE.Euler( 0.100,  0.000,  0.000)},
    {prog: 0.795, rot: new THREE.Euler( 0.300,  0.000,  0.000)},

    {prog: 0.813, rot: new THREE.Euler(-0.834,  1.471,  0.831)},
    {prog: 0.820, rot: new THREE.Euler(-0.091,  1.531,  0.100)},

    {prog: 0.906, rot: new THREE.Euler(0,  3,  0)},
    {prog: 0.938, rot: new THREE.Euler(0,  0.9,  0)},
    {prog: 0.969, rot: new THREE.Euler(0,  0.375,  0)},
    {prog: 0.980, rot: new THREE.Euler(-2.935, -1.234, -2.947)},
    {prog: 0.999, rot: new THREE.Euler(-2.762, -1.277, -2.777)}
  ], []);

  //Scratch objects
  const newPosition = useRef(new THREE.Vector3()).current;
  const startQuat = useRef(new THREE.Quaternion()).current;
  const endQuat = useRef(new THREE.Quaternion()).current;
  const lerpedRotation = useRef(new THREE.Euler()).current;


  const getLerpedRotation = useCallback((prog) => {
    for(let i = 0; i < rotations.length -1; i++){
      const start = rotations[i];
      const end = rotations[i+1];
      if(prog >= start.prog && prog <= end.prog){
        //Get the lerp factor
        const lerp = (prog - start.prog)/(end.prog - start.prog);
        startQuat.setFromEuler(start.rot);
        endQuat.setFromEuler(end.rot);
        startQuat.slerp(endQuat, lerp);
        lerpedRotation.setFromQuaternion(startQuat);
        return lerpedRotation;
      }
    }
    return lerpedRotation.copy(rotations.at(-1).rot);
  },[rotations, startQuat, endQuat, lerpedRotation]);

  useFrame((state) => {
    if(!camera.current) return;
    //Pulse of photos
    matPulseRef.current = (Math.sin(state.clock.elapsedTime * 4) + 1.2) / 2;
    //Progress Interpolation
    let newProgress = THREE.MathUtils.lerp(scrollRef.current, targetScrollProgress.current, lerpFactor);
    if(newProgress >= .9999 || newProgress < 0){
      targetScrollProgress.current = 0.000001;
      newProgress = 0.000001;
    }
    
    scrollRef.current = newProgress;
    let newFOV;

    if (isMapOpen && !(fovShake?.current?.active)) {
      newFOV = THREE.MathUtils.lerp(camera.current.fov, MAP_FOV, 0.25);
    }
    else if (fovShake?.current?.active) {
      const timestamp = performance.now() / 1000;
      const activeTime = fovShake.current.activeTime;
      const elapsed = timestamp - activeTime;
      const duration = TELEPORT_DURATION;

      if (elapsed >= duration) {
        fovShake.current.active = false;            // finished
        newFOV = tp_FOVS.at(-1);             // last key (70)
      } else {
        const segDur = duration / (tp_FOVS.length - 1);// 1000 / 3 = .333 seconds per FOV segment
        const segIdx = Math.floor(elapsed / segDur);//Sets segment index to 0, 1, 2, then 3
        const safeIdx = THREE.MathUtils.clamp(segIdx, 0, tp_FOVS.length - 1);//Safe index is 0, 1, 2, 3
        const lerpF = (elapsed - safeIdx * segDur) / segDur;//(.555 - 1 * .333 = .222) / .333 = .66
        const prevFOV = tp_FOVS[safeIdx];
        const nextFOV = tp_FOVS[safeIdx + 1];
        newFOV = THREE.MathUtils.lerp(prevFOV, nextFOV, lerpF);
      }
    } else {
      newFOV = getLerpedFov(newProgress, PICTURE_FOV);
    }

    if (camera.current.fov !== newFOV) {
      camera.current.fov = newFOV;
      camera.current.updateProjectionMatrix();
      setFieldOfView(newFOV);
    }
   
    //Refresh React UI at most 5 times a second
    if(state.clock.elapsedTime - prevProgress.current > .05){//Change .2 to lower value for higher fps
      prevProgress.current = state.clock.elapsedTime;
      setScrollProgress?.(scrollRef.current);//Triggers Light Render
    }
    // Camera Position - zero allocations
    positions.getPoint(newProgress, newPosition)// Write into newPosition
    newPosition.x += mouseOffset.current.x;
    newPosition.y += mouseOffset.current.y;
    camera.current.position.lerp(newPosition, 0.5);
    // Camera Rotation - zero allocations
    camera.current.rotation.copy(getLerpedRotation(newProgress));
    
  });
  return (
    <>
    <DebugCurve curve={positions}/>
      <Environment background={true} backgroundRotation={[0,Math.PI / 2.3, 0]} files={["/CubeMap/px.webp", "/CubeMap/nx.webp", "/CubeMap/py.webp", "/CubeMap/ny.webp", "/CubeMap/pz.webp", "/CubeMap/nz.webp"]}/>
      <Suspense fallback={null}>
        {camera.current && <Maps pos={camera.current.position} rot={camera.current.rotation} visible={isMapOpen} onTeleport={onTeleport}/>}
        {isMapOpen && teleportEffects.map((fx) => (<TeleportFX key={fx.id} position={fx.pos} onDone={fx.dispose} />))}
        <Photos progress={scrollRef.current} pulseIntensity={matPulseRef.current}/>
        <Home progress={scrollRef.current}/> 
        <Nature/>
        {/* <Mail /> */}
      </Suspense>
    </>
  );
};


const Exp = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const fovShake = useRef({ active:false, activeTime:0 });
  const [feildOfView, setFieldOfView] = useState(70);
  const lastTeleport = useRef({ time: 0, prog: -1 });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [teleportFX, setTeleportFX] = useState([]);
  const mouseOffset = useRef(new THREE.Vector3());
  const targetScrollProgress = useRef(0);
  const {isModalOpen} = useModalStore();
  const lastTouchY = useRef(null);
  const isSwiping = useRef(false);
  const scrollRef = useRef(0);
  const controls = useRef();
  const camera = useRef();

  const mouseMultiplier = 0.17;
  const touchMultiplier = 0.25;
  const sensitivityX = 0.25;
  const sensitivityY = 0.25;
  const scrollSpeed = 0.002;
  const lerpFactor = 0.08;
  
  const teleport = useCallback((prog) => {
    if (!isMapOpen) return;
    const currentTime = Date.now();
    if(currentTime - lastTeleport.current.time < TELEPORT_COOLDOWN) return;//Cooldown still active
    const newProgress = Math.min(Math.max(prog, 0.0001), 0.9999);//
    if (Math.abs(newProgress - lastTeleport.current.prog) < 1e-6) return;//0.000001 = 1e-6, ignore teleport req if already at location
    lastTeleport.current = { time: currentTime, prog: newProgress };
    const newRotation = camera.current ? camera.current.rotation.clone() : new THREE.Euler();
    const newPosition = CAT_CURVE.getPoint(newProgress);   // CAT_CURVE is the camera path
    targetScrollProgress.current = newProgress;
    const oldProgress = scrollRef.current;
    scrollRef.current = newProgress;
    useModalStore.getState().openTeleportModal();
    const id = Date.now();
    
    /* kick-off the FOV shake */
    const goingForward = newProgress > oldProgress;
    const fovSequence = goingForward ? TELEPORT_FOVS.slice().reverse() : TELEPORT_FOVS; // 70 → 55 → 85 → 70
    fovShake.current = {
      active : true,
      activeTime : performance.now() / 1000,
      keys : fovSequence,
    };
    playTeleportSound();

    setTeleportFX([{
      id,
      pos: newPosition.toArray(),
      rot: [newRotation.x, newRotation.y, newRotation.z],
      dispose() {
        setTeleportFX([]);                // remove self when finished
      },
    }]);
  }, [isMapOpen]);

  //Toggles the map flag
  const toggleMap = () => {
    playMapSound();
    setTimeout(() => setIsMapOpen((v) => !v), 500);
  }

  //Runs once, registers Map control store and
  useEffect(() => {
    useMapControls.getState().registerToggleMap(toggleMap, () => setIsMapOpen(false));
    useModalStore.getState().closeMapModal();
  }, []);

  //Calls Map Control Store, toggles Map between open and closed
  useEffect(() =>{
    useMapControls.getState().openMap(isMapOpen)
  }, [isMapOpen]);

  //Desktop Control for opening map with 's'
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 's') toggleMap();
    };
    window.addEventListener('keydown', onKey);
   return () => window.removeEventListener('keydown', onKey);
  }, []);

  //Clears any teleport FX animations that may have leaked
  useEffect(() => {
    if (!isMapOpen) {
      setTeleportFX([]);
    }
  }, [isMapOpen]);

  //Handles user controls for moving in the scene
  useEffect(() => {

    //Desktop ~ Mouse Wheel Controller
    const handleWheel = (e) => {
      if (isModalOpen || isMapOpen || targetScrollProgress.current < 0) return;
      const normalized = normalizeWheel(e);
      targetScrollProgress.current += Math.sign(normalized.pixelY) * scrollSpeed * Math.min(Math.abs(normalized.pixelY) / 100, 1);
    };

    //Desktop ~ Mouse Wheel Movement Controller
    const handlePointerMove = (e) => {
      if (!isSwiping.current || isMapOpen || targetScrollProgress.current < 0) return;
      else if (e.pointerType === "touch") return;
      targetScrollProgress.current += Math.sign(e.movementY) * scrollSpeed * mouseMultiplier;
    };

    //Desktop ~ Camera Offset based off mouse movement
    const handleMouseMove = (e) => {
      if(isMapOpen) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 -2;
      const mouseY = (e.clientY / window.innerHeight) * 2 -.7;
      mouseOffset.current.x = (mouseX * sensitivityX);
      mouseOffset.current.y = -(mouseY * sensitivityY);
    };

    //Phone ~ Screen Swiping flag enabler
    const handlePointerDown = () => {
      if (isModalOpen || isMapOpen) return;
      isSwiping.current = true;
    };

    //Phone ~ Screen Swiping flag disabler
    const handlePointerUp = () => {
      if(isMapOpen) return;
      isSwiping.current = false;
      lastTouchY.current = null;
    };
    
    //Phone ~ Swipe Movement Controller
    const handleTouchMove = (e) => {
        if (isMapOpen || !isSwiping.current || targetScrollProgress.current < 0) return;
        const deltaY = e.touches[0].clientY - lastTouchY.current;
        targetScrollProgress.current += Math.sign(deltaY) * scrollSpeed * touchMultiplier;
        lastTouchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isModalOpen, isMapOpen, normalizeWheel]);

  return (
  <>
    <Canvas eventSource={document.getElementById('root')}>
      <TeleportFXPreload />
      <MapsPreload />
      <Scene 
        camera={camera} 
        fovShake={fovShake}
        isMapOpen={isMapOpen}
        scrollRef={scrollRef}
        lerpFactor={lerpFactor} 
        mouseOffset={mouseOffset}
        onTeleport={teleport}
        teleportEffects={teleportFX} 
        setFieldOfView={setFieldOfView}
        setScrollProgress={setScrollProgress}
        targetScrollProgress={targetScrollProgress} 
      />
      <PerspectiveCamera ref={camera} makeDefault fov={feildOfView} position={[-34, 18, -15]}/>
    </Canvas>
  </>
  );
};

export default Exp

