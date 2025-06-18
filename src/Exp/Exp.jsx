
import * as THREE from "three";
import TeleportFX from './utils/TeleportFX';
import Mobs from "./models/Mobs"
import Maps from "./models/Maps";
import Home from "./models/Home"
import Photos from "./models/Photo"
import Nature from "./models/Nature"
import normalizeWheel from 'normalize-wheel';
import { useModalStore } from './stores/modalStore';
import { useMapControls } from "./stores/mapControlsStore";
import { useAudioStore } from "./stores/audioStore";
import { Canvas, useFrame } from '@react-three/fiber';
import { DebugCurve, CameraHelper } from './utils/DebugTools';
import { Environment, PerspectiveCamera } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback} from 'react';

let mapIdx = 0;
const TELEPORT_FOV_SHAKE_SEC = 0.35;      //  ← change to taste
const BASE_SHAKE_KEYS  = [70, 110, 30, 70];
const COOLDOWN_MS = 1000;
const FOV_ZIN = 63;
const FOV_ZOUT = 70;//SET MAP TO 73
const FOV_WINDOWS = [
  [0.2370, 0.2385],
  [0.2540, 0.2560],
  [0.4180, 0.4200],
  [0.5135, 0.5165],
  [0.5260, 0.5290],
  [0.5450, 0.5480],
];
const mapSounds = [
  new Audio("../../Sounds/Map/MapUpS1.ogg"),
  new Audio("../../Sounds/Map/MapDownS1.ogg"),
];
mapSounds.forEach(aud => {
  aud.volume = .25;
  aud.loop = false;
})
function playMapSound(){
  const {isAudioEnabled} = useAudioStore.getState();
  if(!isAudioEnabled) return;
  if(mapIdx === 2) mapIdx = 0;
  mapSounds[mapIdx].play();
  mapIdx++;
}
const teleportSound = [
  new Audio("../../Sounds/Teleport2.ogg"),
  new Audio("../../Sounds/Teleport1.ogg"),
];
teleportSound.forEach(aud => {
  aud.volume = .5;
  aud.loop = false;
})
function playTeleportSound(){
  const {isAudioEnabled, setIsTeleporting} = useAudioStore.getState();

  if(!isAudioEnabled) return;
  setIsTeleporting(true);
  const sfx = Math.floor(Math.random() * 2);
  teleportSound[sfx].play();
  setIsTeleporting(false);
}
const getSegmentedFov = (prog) => {
  for (let i = 0; i < FOV_WINDOWS.length; i++) {
    const [start, end] = FOV_WINDOWS[i];
    if (prog >= start && prog <= end) {
      const t     = (prog - start) / (end - start); // 0‒1 in window
      const ease  = Math.abs(2 * t - 1);            // 1→0→1 tri-ease
      return THREE.MathUtils.lerp(FOV_ZIN, FOV_ZOUT, ease);
    }
  }
  return FOV_ZOUT; // not inside any window
};

const PATH_POINTS = [
  //                  X      Z       Y
  new THREE.Vector3(-38.0, 17.30, -17.0),  //1st step
  new THREE.Vector3(-32.5, 17.30, -13.0),   //2nd step
  new THREE.Vector3(-17.5, 17.30, -3.00),    //3rd step
  new THREE.Vector3(-12.0, 17.30,  1.00),     //4th step
  new THREE.Vector3(-6.00, 18.35,  4.00),      //5th step

  new THREE.Vector3(-3.75, 18.35,  7.00),      //Door Opens
  new THREE.Vector3(-3.50, 18.35,  11.0),       //Infront Of door
  new THREE.Vector3( 2.00, 18.35,  10.75),        //First Step inside (Door Closes)
  new THREE.Vector3( 8.50, 18.35,  11.25),         //Infront of Kitchen
  new THREE.Vector3( 7.25, 18.35,  8.00),          //Looking into living room
  new THREE.Vector3( 7.00, 18.35,  4.00),           //By Couch
  new THREE.Vector3( 2.25, 18.35,  2.35),            //On Couch
  new THREE.Vector3( 5.25, 18.35,  2.00),             //Looking at staircase
  new THREE.Vector3( 8.50, 19.50,  1.75),              //Bottom of Staircase
  new THREE.Vector3( 9.00, 23.5,  7.25),               //Top Of staircase
  new THREE.Vector3( 6.5, 23.5,  8.50),                //Looking into bedroom
  new THREE.Vector3( 7.75, 23.5,  10.5),                 //Looking at desk paintings

  new THREE.Vector3( 9.00, 23.50,  11.25),                 //Heading Back to staircase
  new THREE.Vector3( 9.50, 23.00,  6.00),                //Top Of staircase
  new THREE.Vector3( 9.00, 19.00,  1.75),               //Bottom of Staircase
  new THREE.Vector3( 6.65, 18.35,  2.00),              //Looking at staircase
  new THREE.Vector3( 7.50, 18.35,  8.00),             //Looking into living room
  new THREE.Vector3( 6.50, 18.35,  11.0),            //Infront of Kitchen
  new THREE.Vector3( 2.00, 18.35,  11.1),           //First Step inside (Door Opens)
  new THREE.Vector3(-3.00, 18.35,  11.1),          //Infront Of door 
  new THREE.Vector3(-3.00, 18.35,  5.00),         //Outside of door (Door Closes)

  new THREE.Vector3(-5.50, 18.00,  4.00),       //5th step
  new THREE.Vector3(-12.0, 17.30,  1.00),      //4th step
  new THREE.Vector3(-17.5, 17.30, -3.00),     //3rd step
  new THREE.Vector3(-32.5, 17.30, -13.0),    //2nd step
  new THREE.Vector3(-38.0, 17.30, -17.0),   //1st step
];

export const CAT_CURVE = new THREE.CatmullRomCurve3(PATH_POINTS, true);

const Scene = ({camera, scrollRef, targetScrollProgress, setScrollProgress, lerpFactor, mouseOffset, setFieldOfView, isMapOpen, onTeleport, teleportEffects = [], fovShake, }) => {
  const SHAKE_KEYS = fovShake?.current?.keys ?? BASE_SHAKE_KEYS;
  const posPoints = useMemo(() => CAT_CURVE, []); 
  const prevScrollProgress = useRef(0);
  const pulseRef = useRef(0);
  

  const rotPoints = useMemo(() =>  [
    {prog: 0.000, rot: new THREE.Euler(-2.762, -1.277, -2.777)},
    {prog: 0.031, rot: new THREE.Euler(-2.935, -1.237, -2.947)},
    {prog: 0.063, rot: new THREE.Euler(-3.097, -1.017, -3.104)},
    {prog: 0.094, rot: new THREE.Euler( 2.913, -1.065,  2.940)},

    {prog: 0.125, rot: new THREE.Euler( 2.520, -0.702,  2.70)},
    {prog: 0.156, rot: new THREE.Euler(-2.960, -1.005, -3.010)},
    {prog: 0.188, rot: new THREE.Euler(-2.063, -1.394, -2.100)},

    {prog: 0.219, rot: new THREE.Euler(-1.355, -1.529, -1.353)},
    {prog: 0.235, rot: new THREE.Euler(-3.10, -0.1, -3.125)},//
    {prog: 0.255, rot: new THREE.Euler( 0.000, -1.000,  0.000)},
    {prog: 0.270, rot: new THREE.Euler( 0.000,  0.50,  0.000)},

    {prog: 0.300, rot: new THREE.Euler( 0.034,  0.146, -0.005)},
    {prog: 0.345, rot: new THREE.Euler(-3.067, -0.143, -3.131)},
    {prog: 0.395, rot: new THREE.Euler(-2.997,  0.108,  3.126)},

    {prog: 0.415, rot: new THREE.Euler( 2.164, -1.318,  2.179)},
    {prog: 0.430, rot: new THREE.Euler(-3.950, -1.322,  2.400)},
    {prog: 0.469, rot: new THREE.Euler(-3.083,  0.322,  3.123)},
    {prog: 0.475, rot: new THREE.Euler(-3.083,  0.522,  3.123)},

    {prog: 0.500, rot: new THREE.Euler(-3.135,  0.635,  3.139)},
    {prog: 0.534, rot: new THREE.Euler(-3.335, -0.200,  3.139)},
    {prog: 0.552, rot: new THREE.Euler( 3.00, -0.400, -3.180)},
    {prog: 0.564, rot: new THREE.Euler( 0.500,  1.500, -.5000)},
    {prog: 0.575, rot: new THREE.Euler(-0.500, 0.000,  -0.050)},
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

    {prog: 0.906, rot: new THREE.Euler(-0.491,  0.503,  0.252)},
    {prog: 0.938, rot: new THREE.Euler(-0.674,  0.508,  0.371)},
    {prog: 0.969, rot: new THREE.Euler(-0.573,  0.375,  0.232)},
    {prog: 0.980, rot: new THREE.Euler(-2.935, -1.234, -2.947)},
    {prog: 0.999, rot: new THREE.Euler(-2.762, -1.277, -2.777)}
  ], []);

  //Scratch objects
  const pointV = useRef(new THREE.Vector3()).current;
  const startQ = useRef(new THREE.Quaternion()).current;
  const endQ = useRef(new THREE.Quaternion()).current;
  const lerpedR = useRef(new THREE.Euler()).current;


  const getLerpedRotation = useCallback((prog) => {
    for(let i = 0; i < rotPoints.length -1; i++){
      const start = rotPoints[i];
      const end = rotPoints[i+1];
      if(prog >= start.prog && prog <= end.prog){
        //Get the lerp factor
        const lerpF = (prog - start.prog)/(end.prog - start.prog);
        startQ.setFromEuler(start.rot);
        endQ.setFromEuler(end.rot);
        startQ.slerp(endQ, lerpF);
        lerpedR.setFromQuaternion(startQ);
        return lerpedR;
      }
    }
    return lerpedR.copy(rotPoints.at(-1).rot);
  },[rotPoints, startQ, endQ, lerpedR]);

  useFrame((state) => {
    if(!camera.current) return;
    //Pulse of photos
    pulseRef.current = (Math.sin(state.clock.elapsedTime * 4) + 1.2) / 2;
    //Progress Interpolation
    let newProgress = THREE.MathUtils.lerp(scrollRef.current, targetScrollProgress.current, lerpFactor);
    if(newProgress >= .9999 || newProgress < 0){
      targetScrollProgress.current = 0;
      newProgress = 0;
    }
    //console.log(newProgress.toFixed(4));
    scrollRef.current = newProgress;
    let desiredFov;

    if (fovShake?.current?.active) {
      const tNow   = performance.now() / 1000;
      const t0     = fovShake.current.t0;
      const dt     = tNow - t0;
      const dur    = TELEPORT_FOV_SHAKE_SEC;

      if (dt >= dur) {
        fovShake.current.active = false;            // finished
        desiredFov = SHAKE_KEYS.at(-1);             // last key (70)
      } else {
        const segDur  = dur / (SHAKE_KEYS.length - 1);
        const segIdx  = Math.floor(dt / segDur);
        const safeIdx = THREE.MathUtils.clamp(segIdx, 0, SHAKE_KEYS.length - 2);
        const kT      = (dt - safeIdx * segDur) / segDur;
        const fromFov = SHAKE_KEYS[safeIdx];
        const toFov   = SHAKE_KEYS[safeIdx + 1];
        desiredFov    = THREE.MathUtils.lerp(fromFov, toFov, kT);
      }
    } else {
      desiredFov = getSegmentedFov(newProgress);
    }

    if (camera.current.fov !== desiredFov) {
      camera.current.fov = desiredFov;
      camera.current.updateProjectionMatrix();
      setFieldOfView(desiredFov);
    }
  
    //Refresh React UI at most 5 times a second
    if(state.clock.elapsedTime - prevScrollProgress.current > .05){//Change .2 to lower value for higher fps
      prevScrollProgress.current = state.clock.elapsedTime;
      setScrollProgress?.(scrollRef.current);//Triggers Light Render
    }
    // Camera Position - zero allocations
    posPoints.getPoint(newProgress, pointV)// Write into pointV
    pointV.x += mouseOffset.current.x;
    pointV.y += mouseOffset.current.y;
    camera.current.position.lerp(pointV, 0.5);
  
    // Camera Rotation - zero allocations
    camera.current.rotation.copy(getLerpedRotation(newProgress));
  });
  return (
    <>
    {/* <DebugCurve curve={posPoints}/> */}
      <Environment 
      background={true}
      //backgroundRotation={[Math.PI / 7.5, Math.PI/1.85, 0]}
      backgroundRotation={[0,Math.PI / 1.5, 0]}
      //px, nx, py, ny, pz, nz
      files={["/CubeMap/px.webp", "/CubeMap/nx.webp", "/CubeMap/py.webp", "/CubeMap/ny.webp", "/CubeMap/PZMOON.webp", "/CubeMap/nz.webp"]}/>
      <Suspense fallback={null}>
        
        {camera.current && <Maps pos={camera.current.position} rot={camera.current.rotation} visible={isMapOpen} onTeleport={onTeleport}/>}
        {isMapOpen && teleportEffects.map((fx) => (
          <TeleportFX key={fx.id} position={fx.pos}   onDone={fx.dispose} />
        ))}
        <Photos progress={scrollRef.current} pulseIntensity={pulseRef.current}/>
        <Home progress={scrollRef.current}/> 
        <Nature/>
        <Mobs />
      </Suspense>
    </>
  );
};


const Exp = () => {
  const lastTeleport         = useRef({ time: 0, prog: -1 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMapOpen, setIsMapOpen] =  useState(false);
  const [teleportFX, setTeleportFX] = useState([]);
  const fovShake = useRef({ active:false, t0:0 });
  const mouseOffset = useRef(new THREE.Vector3());
  const targetScrollProgress = useRef(0);
  const {isModalOpen, openMapModal} = useModalStore();

  const lastTouchY = useRef(null);
  const isSwiping = useRef(false);
  const scrollRef = useRef(0);
  const controls = useRef();
  const camera = useRef();
  const scrollSpeed = 0.002;//0.0010 good for touch
  const lerpFactor = 0.08;
  const mouseMultiplier = 0.17;
  const touchMultiplier = 0.25;
  const sensitivityX = 0.25;
  const sensitivityY = 0.25;
  const [feildOfView, setFieldOfView] = useState(70);

  

  const handleTeleport = useCallback((prog) => {
    if (!isMapOpen) return;
    const now = Date.now();
    if(now - lastTeleport.current.time < COOLDOWN_MS) return;
    const c = Math.min(Math.max(prog, 0.0001), 0.9999);
    if (Math.abs(c - lastTeleport.current.prog) < 1e-6) return;
    lastTeleport.current = { time: now, prog: c };
    const camRot = camera.current ? camera.current.rotation.clone() : new THREE.Euler();
    const worldPos = CAT_CURVE.getPoint(c);   // CAT_CURVE is the camera path
    targetScrollProgress.current = c;
    scrollRef.current = c;
    useModalStore.getState().openTeleportModal();
    const id = Date.now();
    /* kick-off the FOV shake */
    const tNow   = performance.now() / 1000;
    const forward  = c > scrollRef.current;
    const keys     = forward ? BASE_SHAKE_KEYS.slice().reverse()  // 70 → 55 → 85 → 70
                   : BASE_SHAKE_KEYS; 
    fovShake.current = {
    active : true,
    t0     : performance.now() / 1000,
    keys  : keys,
  };
    playTeleportSound();

    setTeleportFX([{
      id,
      pos: worldPos.toArray(),
      rot: [camRot.x, camRot.y, camRot.z],
      dispose() {
        setTeleportFX([]);                // remove self when finished
      },
    }]);
  }, [isMapOpen]);

  const toggleMap = () => {
    playMapSound();
    setTimeout(() => setIsMapOpen((v) => !v), 500);
  }

  useEffect(() => {
    useMapControls.getState().registerToggleMap(toggleMap, () => setIsMapOpen(false));
    useModalStore.getState().closeMapModal();
  }, []);                 // runs once
  useEffect(() =>{
    
    useMapControls.getState().openMap(isMapOpen)
  }, [isMapOpen]);

  
  /* Map Controls 'S' */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 's') toggleMap();
    };
    window.addEventListener('keydown', onKey);
   return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    if (!isMapOpen) {
      setTeleportFX([]);      // dump any FX when the map is hidden
    }
  }, [isMapOpen]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen || isMapOpen || targetScrollProgress.current < 0) return;
      const normalized = normalizeWheel(e);
      targetScrollProgress.current += Math.sign(normalized.pixelY) * scrollSpeed * Math.min(Math.abs(normalized.pixelY) / 100, 1);
    };

    const handlePointerDown = () => {
      if (isModalOpen || isMapOpen) return;
      isSwiping.current = true;
    };

    const handlePointerMove = (e) => {
      if (!isSwiping.current || isMapOpen || targetScrollProgress.current < 0) return;
      else if(e.pointerType !== "touch"){
        targetScrollProgress.current += Math.sign(e.movementY) * scrollSpeed * mouseMultiplier;
      }
      else return;
    };

    const handlePointerUp = () => {
      if(isMapOpen) return;
      isSwiping.current = false;
      lastTouchY.current = null;
    };

    const handleMouseMove = (e) => {
      if(isMapOpen) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 -2;
      const mouseY = (e.clientY / window.innerHeight) * 2 -.7;

      mouseOffset.current.x = (mouseX * sensitivityX);
      mouseOffset.current.y = -(mouseY * sensitivityY);
    };

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
      <Scene 
        camera={camera} 
        fovShake={fovShake}
        isMapOpen={isMapOpen}
        scrollRef={scrollRef}
        lerpFactor={lerpFactor} 
        mouseOffset={mouseOffset}
        onTeleport={handleTeleport}
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

