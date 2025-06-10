import   React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'
import { easing, geometry } from 'maath'
import { getMaterial, materialSets } from '../utils/materialEditor'

export default function Model({progress = 0, pulseIntensity = 0, ...props }) {
  const result = useGLTFWithKTX2('/GLBs/Computer/XPS15ComputerT-v1.glb')
  if(!result) return null;

  const { nodes, materials } = result;
  useMemo(() => {
    convertMaterialsToMeshBasicMaterial(materials)
  }, [materials]);
  // Convert materials and create array of glow materials
  //const [hoveredMesh, setHoveredMesh] = useState(null);
  const monitorRef = useRef()
  //const materialSet = useMemo(() => materialSets(materials, "Computer"), [materials]);
  
  // const glowMaterials = useMemo(() => {
  //   return Array.from({length: 6}).map((_, i) => {
  //     const mat = materials.Computer_Glow_Baked.clone()
  //     mat.transparent = true
  //     mat.opacity = 0
  //     return mat
  //   })
  // }, [materials])

  // Animation parameters
  const speed = 3.5
  const waveSpread = 6
  const [minGlowRange, maxGlowRange] = [0.5039, 0.565]
  const [minOpenRange, maxOpenRange] = [0.47, 0.565]
  // Screen rotation values 
  const closed = [0, 0.429, -1.85]
  const opened = [0, 0.429, -0.262]
  const computerIsInRange = (progress >= minOpenRange && progress <= maxOpenRange);
  const epsilon = 0.001;

  useFrame(({ clock, delta }) => {
    
    if (!computerIsInRange){
      easing.dampE(monitorRef.current.rotation, closed, 0.25, delta);
      return;
    }
    easing.dampE(monitorRef.current.rotation, opened, 0.25, delta);
    
    
    const keyboardIsInRange = (progress >= minGlowRange && progress <= maxGlowRange);
    

    // Existing keyboard glow logic
    // if (keyboardIsInRange) {
    //   const time = clock.elapsedTime * speed
    //   glowMaterials.forEach((mat, index) => {
    //     let phase = 0;
    //     if(index === 1) phase = 0.5
    //     if(index === 2) phase = 1
    //     if(index === 3) phase = 1.75
    //     if(index === 4) phase = 2.5
    //     if(index === 5) phase = 3.25
    //     if(index === 6) phase = 4

    //     const pulse = Math.sin(time - phase) * 0.25 + .05
    //     mat.opacity = pulse * 5
    //     mat.needsUpdate = true
    //   })
    // }
  });
  
  
  // React.useEffect(() => {
  //   document.body.style.cursor = hoveredMesh ? "pointer" : "auto";
  // }, [hoveredMesh]);


  // const meshConfigs = [
  //   {id: 'Computer_Screen_Baked', geometry: "Computer_Screen_Baked", progressRange: [0.47, 0.565], material: 'Computer_Screen_Baked.001', position: [5.925, 22.806, 13.324], rotation: [0, 0.429, -1.85], scale: [0.243]},
  //   {id: 'Computer_Base_Baked', geometry: "Computer_Base_Baked", progressRange: [0.47, 0.565], material: 'Computer_Base_Baked', position: [6.159, 22.801, 13.216], rotation: [0, 0.429, 0], scale: [0.243]},
  //   {id: 'Keyboard_Baked', geometry: "Keyboard_Baked",  progressRange: [0.47, 0.565], material: 'Keyboard_Baked', position: [6.159, 22.802, 13.216], rotation: [0, 0.429, 0], scale: [0.243]},
  // ];

  return (
  <group {...props} dispose={null}>
    {/* Base computer components */}
    <mesh
      geometry={nodes.Computer_Base_Baked.geometry}
      material={materials.Computer_Base_Baked}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />
    <mesh
      geometry={nodes.Keyboard_Baked.geometry}
      material={materials.Keyboard_Baked}
      position={[6.159, 22.802, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />

    {/* Glowing keyboard rows (no map) */}
    <mesh
      geometry={nodes.KeyBoardBottomRow1_Baked.geometry}
      material={'Computer_Base_Baked'}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />
    <mesh
      geometry={nodes.KeyBoardBottomRow2_Baked.geometry}
      material={'Computer_Base_Baked'}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />
    <mesh
      geometry={nodes.KeyBoardBottomRow3_Baked.geometry}
      material={'Computer_Base_Baked'}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />
    <mesh
      geometry={nodes.KeyBoardBottomRow4_Baked.geometry}
      material={'Computer_Base_Baked'}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />
    <mesh
      geometry={nodes.KeyBoardBottomRow5_Baked.geometry}
      material={'Computer_Base_Baked'}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />
    <mesh
      geometry={nodes.KeyBoardBottomRow6_Baked.geometry}
      material={'Computer_Base_Baked'}
      position={[6.159, 22.801, 13.216]}
      rotation={[0, 0.429, 0]}
      scale={0.243}
    />

    {/* Animated screen */}
    <mesh
      ref={monitorRef}
      geometry={nodes.Computer_Screen_Baked.geometry}
      material={materials['Computer_Screen_Baked.001']}
      position={[5.925, 22.806, 13.324]}
      rotation={[0, 0.429, -1.85]}
      scale={0.243}
    />
  </group>
)}
