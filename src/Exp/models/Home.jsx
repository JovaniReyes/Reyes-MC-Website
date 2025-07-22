import React, { useRef, useMemo, memo } from 'react'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
import { useAudioStore } from '../stores/audioStore'

/** Pre-load your door sounds */
const doorOpening = new Audio('/Sounds/DoorOpen.ogg')
const doorClosing = new Audio('/Sounds/DoorClose.ogg')
doorClosing.volume = 0.25
doorOpening.volume = 0.25

const doorAnimation = (state, anim, dR, dS) => {
  if (dR.current) {
    dR.current.rotation.z = state == "closed" ? anim.closeAngle : anim.openAngle;
  }
  dS.current = state;
}


export default memo(function Model({ progress = 0, ...props }) {
  const gltfPaths = [
    '/GLBs/Home/H1T-transformed.glb',//1
    '/GLBs/Home/H2T-transformed.glb',//2
    '/GLBs/Home/H3T-transformed.glb',//3
    '/GLBs/Home/H4T-transformed.glb',//4
    '/GLBs/Home/H5T-transformed.glb',//5
    '/GLBs/Home/H6T-transformed.glb',//6
    '/GLBs/Home/H7T-transformed.glb',//7
    '/GLBs/Home/H8T-transformed.glb',//8
    '/GLBs/Home/H9T-transformed.glb',//9
    '/GLBs/Home/HFT-transformed.glb',//10
    '/GLBs/Home/HRT-transformed.glb',//11
    '/GLBs/Home/HDT-transformed.glb',//12
    '/GLBs/Home/HWT-transformed.glb',//13
    '/GLBs/Home/HCT-transformed.glb',//14
    '/GLBs/Home/H7_2T-transformed.glb',//15
  ];
  
  const gltfResults = gltfPaths.map(useGLTFWithKTX2);
  const anyPending = gltfResults.some(result => result === null);
  if (anyPending) return null; // or a loading fallback

  // Safe destructuring since all models are now loaded
  const [
    { nodes: n1, materials: mat1 },
    { nodes: n2, materials: mat2 },
    { nodes: n3, materials: mat3 },
    { nodes: n4, materials: mat4 },
    { nodes: n5, materials: mat5 },
    { nodes: n6, materials: mat6 },
    { nodes: n7, materials: mat7 },
    { nodes: n8, materials: mat8 },
    { nodes: n9, materials: mat9 },
    { nodes: n10, materials: mat10 },
    { nodes: n11, materials: mat11 },
    { nodes: n12, materials: mat12},
    { nodes: n13, materials: mat13},
    { nodes: n14, materials: mat14},
    { nodes: n15, materials: mat15},
  ] = gltfResults;

  useMemo(() => {
    convertMaterialsToMeshBasicMaterial(mat1)
    convertMaterialsToMeshBasicMaterial(mat2)
    convertMaterialsToMeshBasicMaterial(mat3)
    convertMaterialsToMeshBasicMaterial(mat4)
    convertMaterialsToMeshBasicMaterial(mat5)
    convertMaterialsToMeshBasicMaterial(mat6)
    convertMaterialsToMeshBasicMaterial(mat7)
    convertMaterialsToMeshBasicMaterial(mat8)
    convertMaterialsToMeshBasicMaterial(mat9)
    convertMaterialsToMeshBasicMaterial(mat10)
    convertMaterialsToMeshBasicMaterial(mat11)
    convertMaterialsToMeshBasicMaterial(mat12)
    convertMaterialsToMeshBasicMaterial(mat13)
    convertMaterialsToMeshBasicMaterial(mat14)
    convertMaterialsToMeshBasicMaterial(mat15)
  }, [mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8, mat9, mat10, mat11, mat12, mat13, mat14, mat15]);

  const doorRef = useRef()
  const doorState = useRef('closed')
  const { isAudioEnabled } = useAudioStore()

  // Door animation config
  const anim = {
    pivotOne: 0.18,
    pivotOneEnd: 0.225,
    pivotTwo: 0.725,
    pivotTwoEnd: 0.775,
    openAngle: Math.PI / 2,
    closeAngle: 0,
  }

  const p1Open = progress >= anim.pivotOne && progress < anim.pivotOneEnd;
  const p2Open = progress >= anim.pivotTwo && progress < anim.pivotTwoEnd;
  const p1Close = progress >= anim.pivotOneEnd && progress < anim.pivotTwo;
  const p2Close = progress >= anim.pivotTwoEnd || progress < anim.pivotOne;
  
  // On each render, check "progress" for door open/close
  if ((p1Open || p2Open) && doorState.current === 'closed') {
    doorAnimation("open", anim, doorRef, doorState);
    if (isAudioEnabled) doorOpening.play();
  }

  if ((p1Close || p2Close) && doorState.current === 'open') {
    doorAnimation("closed", anim, doorRef, doorState);
    if (isAudioEnabled) doorClosing.play()
  }

  // ============= Return Single Group =============
  return (
    <group {...props} dispose={null}>
      {/* Home Set 1T */}
      <mesh geometry={n1.BarrelBottom_Baked.geometry} material={mat1.S1_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
     
      {/* Home Set 2T */}
      <mesh geometry={n2.BirchPlanks_Baked.geometry} material={mat2.S2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Home Set 3T */}
       <mesh geometry={n3.ArmorDiamondLayer1_Baked.geometry} material={mat3.S3_Baked} position={[1.643, 14.744, 1.654]} />

      {/* Home Set 4T */}
     <mesh geometry={n4.AmethystCluster_Baked.geometry} material={mat4.S4_Baked} position={[5.084, 23.287, 8.276]} rotation={[Math.PI / 2, 0, Math.PI]} />

      {/* Home Set 5T */}
      <mesh geometry={n5.CampfireLog_Baked.geometry} material={mat5.S5_Baked} position={[1.643, 14.744, 1.654]} />

      {/* Home Set 6T */}
      <mesh geometry={n6.OakLeavesOnHome_Baked.geometry} material={mat6.S6_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Home Set 7T */}
      <mesh geometry={n7.HangShelf_Wood1_Baked.geometry} material={mat7.Set7_1_Baked} position={[6.95, 22.978, 13.707]} rotation={[0, -Math.PI / 2, 0]} scale={[0.069, 0.009, 0.558]} />
      <mesh geometry={n7.LanternsInside_Baked.geometry} material={mat7.LanternsInside_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n7.LanternsOutdoors_Baked.geometry} material={mat7.LanternsOutdoors_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n7.LanternsOutside002_Baked.geometry} material={mat7['LanternsOutside.002_Baked']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* Home Set 8T */}
       <mesh geometry={n8['minecraft_painting-meditative_Baked'].geometry} material={mat8.H8_Baked} position={[10.582, 21.911, 3.023]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* Home Set 9T */}
     <mesh geometry={n9.HouseOakLog_Baked.geometry} material={mat9.S9_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Home Set FT */}
      <mesh geometry={n10.OakPlanks_Baked.geometry} material={mat10['OakPlanks_Baked.001']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n10.SprucePlanksHome_Baked.geometry} material={mat10['SprucePlanksHome_Baked.001']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      {/* Home Set RT */}
      <mesh geometry={n11.RoofExterior_Baked.geometry} material={mat11.Roofs_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      {/* Home Set DT */}
      <mesh ref={doorRef} geometry={n12.FrontDoor_Baked.geometry} material={mat12['FrontDoor_Baked.001']} position={[-1.36, 17.788, 11.781]} rotation={[Math.PI / 2, 0, 0]} />
      {/* Home Set HT */}
      <mesh geometry={n13.HomeWalls_Baked.geometry} material={mat13['HomeWalls_Baked.002']} position={[4.584, 13.787, 2.776]} rotation={[Math.PI / 2, 0, 0]} />
       <mesh geometry={n14.Chain_Baked.geometry} material={mat14.Chain_Baked} position={[1.643, 14.744, 1.654]} />

      <mesh geometry={n15.HangShelf_Wood2_Baked.geometry} material={mat15.Set7_1_Baked} position={[10.515, 19.316, 1.964]} scale={[0.069, 0.009, 0.558]} />
    </group>
  )
});
