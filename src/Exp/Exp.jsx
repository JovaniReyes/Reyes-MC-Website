
import * as THREE from "three";
import Mobs from "./models/Mobs"
import Home from "./models/Home"
import Photos from "./models/Photo"
import Nature from "./models/Nature"
import Computer from "./models/Computer";
import normalizeWheel from 'normalize-wheel';
import { useModalStore } from './stores/modalStore';
import { Canvas, useFrame } from '@react-three/fiber';
import { DebugCurve, CameraHelper } from './utils/DebugTools';
import { Environment, PerspectiveCamera } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState, useMemo, useCallback} from 'react';

const Scene = ({camera, scrollRef, targetScrollProgress, setScrollProgress, lerpFactor, mouseOffset}) => {
  //const [pulseIntensity, setPulseIntensity] = useState(0);
  const pulseRef = useRef(0);
  const prevScrollProgress = useRef(0);
  const posPoints = useMemo( () => new THREE.CatmullRomCurve3([
    //                  X      Z       Y
    new THREE.Vector3(-38.0, 17.30, -17.0),  //1st step
    new THREE.Vector3(-32.5, 17.30, -13.0),   //2nd step
    new THREE.Vector3(-17.5, 17.30, -3.00),    //3rd step
    new THREE.Vector3(-12.0, 17.30,  1.00),     //4th step
    new THREE.Vector3(-6.00, 18.45,  4.00),      //5th step

    new THREE.Vector3(-3.75, 18.45,  7.00),      //Door Opens
    new THREE.Vector3(-3.50, 18.45,  11.0),       //Infront Of door
    new THREE.Vector3( 2.00, 18.45,  11.0),        //First Step inside (Door Closes)
    new THREE.Vector3( 8.50, 18.45,  10.0),         //Infront of Kitchen
    new THREE.Vector3( 7.25, 18.45,  8.00),          //Looking into living room
    new THREE.Vector3( 7.00, 18.45,  4.00),           //By Couch
    new THREE.Vector3( 2.25, 18.45,  2.35),            //On Couch
    new THREE.Vector3( 5.25, 18.45,  2.00),             //Looking at staircase
    new THREE.Vector3( 9.00, 19.50,  1.75),              //Bottom of Staircase
    new THREE.Vector3( 9.50, 23.50,  7.25),               //Top Of staircase
    new THREE.Vector3( 7.5, 23.50,  8.50),                //Looking into bedroom
    new THREE.Vector3( 7.00, 23.50,  10.5),                 //Looking at desk paintings

    new THREE.Vector3( 9.00, 23.50,  11.25),                 //Heading Back to staircase
    new THREE.Vector3( 9.50, 23.00,  6.50),                //Top Of staircase
    new THREE.Vector3( 9.00, 19.00,  1.75),               //Bottom of Staircase
    new THREE.Vector3( 6.65, 18.45,  2.00),              //Looking at staircase
    new THREE.Vector3( 7.50, 18.45,  8.00),             //Looking into living room
    new THREE.Vector3( 6.50, 18.45,  11.0),            //Infront of Kitchen
    new THREE.Vector3( 2.00, 18.45,  11.1),           //First Step inside (Door Opens)
    new THREE.Vector3(-3.00, 18.45,  11.1),          //Infront Of door 
    new THREE.Vector3(-3.00, 18.45,  5.00),         //Outside of door (Door Closes)

    new THREE.Vector3(-5.50, 18.00,  4.00),       //5th step
    new THREE.Vector3(-12.0, 17.30,  1.00),      //4th step
    new THREE.Vector3(-17.5, 17.30, -3.00),     //3rd step
    new THREE.Vector3(-32.5, 17.30, -13.0),    //2nd step
    new THREE.Vector3(-38.0, 17.30, -17.0),   //1st step
  ], 
  true
),[]);

  const rotPoints = useMemo(() =>  [
    {prog: 0.000, rot: new THREE.Euler(-2.762, -1.277, -2.777)},
    {prog: 0.031, rot: new THREE.Euler(-2.935, -1.237, -2.947)},
    {prog: 0.063, rot: new THREE.Euler(-3.097, -1.017, -3.104)},
    {prog: 0.094, rot: new THREE.Euler( 2.913, -1.065,  2.940)},

    {prog: 0.125, rot: new THREE.Euler( 2.820, -1.002,  2.868)},
    {prog: 0.156, rot: new THREE.Euler(-2.960, -1.005, -3.010)},
    {prog: 0.188, rot: new THREE.Euler(-2.463, -0.994, -2.547)},

    {prog: 0.219, rot: new THREE.Euler(-1.355, -1.429, -1.353)},
    {prog: 0.235, rot: new THREE.Euler(-2.829, -0.284, -3.051)},
    {prog: 0.255, rot: new THREE.Euler( 0.000, -1.000,  0.000)},
    {prog: 0.270, rot: new THREE.Euler( 0.000,  0.50,  0.000)},

    {prog: 0.300, rot: new THREE.Euler( 0.034,  0.146, -0.005)},
    {prog: 0.345, rot: new THREE.Euler(-3.067, -0.143, -3.131)},
    {prog: 0.395, rot: new THREE.Euler(-2.997,  0.108,  3.126)},

    {prog: 0.415, rot: new THREE.Euler( 2.164, -1.318,  2.179)},
    {prog: 0.430, rot: new THREE.Euler(-3.534, -0.322,  3.123)},
    {prog: 0.469, rot: new THREE.Euler(-3.083,  0.322,  3.123)},
    {prog: 0.475, rot: new THREE.Euler(-3.083,  0.322,  3.123)},

    {prog: 0.500, rot: new THREE.Euler(-3.135,  0.835,  3.139)},
    {prog: 0.534, rot: new THREE.Euler(-3.335, -0.200,  3.139)},
    {prog: 0.552, rot: new THREE.Euler( 2.924, -0.007, -3.140)},
    {prog: 0.564, rot: new THREE.Euler( 0.500,  1.500, -.5000)},
    {prog: 0.575, rot: new THREE.Euler(-0.500, -0.168,  0.000)},
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
    if(!camera) return;
    //Pulse of photos
    //setPulseIntensity((Math.sin(state.clock.elapsedTime * 3) + 1) / 2);
    pulseRef.current = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
    //Progress Interpolation
    let newProgress = THREE.MathUtils.lerp(scrollRef.current, targetScrollProgress.current, lerpFactor);
    if(newProgress >= .9999 || newProgress < 0){
      targetScrollProgress.current = 0;
      newProgress = 0;
    } 
    scrollRef.current = newProgress;
    //Refresh React UI at most 5 times a second
    if(state.clock.elapsedTime - prevScrollProgress.current > 0.05){//Change .2 to lower value for higher fps
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
        <Mobs />
        <Nature/>
        <Home progress={scrollRef.current}/> 
        <Photos progress={scrollRef.current} pulseIntensity={pulseRef.current}/>
        <Computer progress={scrollRef.current} pulseIntensity={pulseRef.current}/>
      </Suspense>
    </>
  );
};


const Exp = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mouseOffset = useRef(new THREE.Vector3());
  const targetScrollProgress = useRef(0);
  const {isModalOpen} = useModalStore();
  const lastTouchY = useRef(null);
  const isSwiping = useRef(false);
  const scrollRef = useRef(0);
  const controls = useRef();
  const camera = useRef();
  const scrollSpeed = 0.0020;//0.0010 good for touch
  const lerpFactor = 0.08;
  const mouseMultiplier = 0.17;
  const touchMultiplier = 0.25;
  const sensitivityX = 0.25;
  const sensitivityY = 0.25;
  

  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen || targetScrollProgress.current < 0) return;
      const normalized = normalizeWheel(e);
      targetScrollProgress.current += Math.sign(normalized.pixelY) * scrollSpeed * Math.min(Math.abs(normalized.pixelY) / 100, 1);
    };

    const handlePointerDown = () => {
      if (isModalOpen) return;
      isSwiping.current = true;
    };

    const handlePointerMove = (e) => {
      if (!isSwiping.current || targetScrollProgress.current < 0) return;
      else if(e.pointerType !== "touch"){
        targetScrollProgress.current += Math.sign(e.movementY) * scrollSpeed * mouseMultiplier;
      }
      else return;
    };

    const handlePointerUp = () => {
      isSwiping.current = false;
      lastTouchY.current = null;
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 -2;
      const mouseY = (e.clientY / window.innerHeight) * 2 -.7;

      mouseOffset.current.x = (mouseX * sensitivityX);
      mouseOffset.current.y = -(mouseY * sensitivityY);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping.current || targetScrollProgress.current < 0) return;
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
  }, [isModalOpen, normalizeWheel]);

  return (
  <>
    <Canvas eventSource={document.getElementById('root')}>
      <Scene 
        camera={camera} 
        lerpFactor = {lerpFactor} 
        mouseOffset={mouseOffset}
        scrollRef = {scrollRef} 
        setScrollProgress = {setScrollProgress}
        targetScrollProgress = {targetScrollProgress}  
      />
      <PerspectiveCamera ref={camera} makeDefault fov={70} position={[-34, 18, -15]}/>
    </Canvas>
  </>
  );
};

export default Exp
