import React, { useRef, useMemo } from 'react'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
import { useAudioStore } from '../stores/audioStore'

/** Pre-load your door sounds */
const doorOpening = new Audio('/Music/DoorOpen.ogg')
const doorClosing = new Audio('/Music/DoorClose.ogg')
doorClosing.volume = 0.25
doorOpening.volume = 0.25

const doorAnimation = (state, anim, dRT, dRB, dS) => {
  if (dRT.current && dRB.current) {
    dRT.current.rotation.z = state == "closed" ? anim.closeAngle : anim.openAngle;
    dRB.current.rotation.z = state == "closed" ? anim.closeAngle : anim.openAngle;
  }
  dS.current = state;
}


export default React.memo(function Model({ progress = 0, ...props }) {
  const gltfPaths = [
    '/GLBs/Home/H1T-transformed.glb',
    '/GLBs/Home/H2T-transformed.glb',
    '/GLBs/Home/H3T-transformed.glb',
    '/GLBs/Home/H5T-transformed.glb',
    '/GLBs/Home/H4T-v1.glb',
    '/GLBs/Home/H6T-transformed.glb',
    '/GLBs/Home/H7T-transformed.glb',
    '/GLBs/Home/HWT-transformed.glb',
    '/GLBs/Home/HFT-transformed.glb',
    '/GLBs/Home/H7_1T-transformed.glb',
    '/GLBs/Home/H8T-transformed.glb',
    '/GLBs/Home/HW2T-transformed.glb',
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
    { nodes: n6, materials: mat6 },
    { nodes: n5, materials: mat5 },
    { nodes: n9, materials: mat9 },
    { nodes: n7, materials: mat7 },
    { nodes: n10, materials: mat10 },
    { nodes: n8, materials: mat8 },
    { nodes: n11, materials: mat11 },
    { nodes: n12, materials: mat12},
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
  }, [mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8, mat9, mat10, mat11, mat12]);

  const doorRefTop = useRef()
  const doorRefBottom = useRef()
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
  const p2Close = progress >= anim.pivotTwoEnd || progress < anim.pivotOne
 
  // On each render, check "progress" for door open/close
  if ((p1Open || p2Open) && doorState.current === 'closed') {
    doorAnimation("open", anim, doorRefTop, doorRefBottom, doorState);
    if (isAudioEnabled) doorOpening.play();
  }

  if ((p1Close || p2Close) && doorState.current === 'open') {
    doorAnimation("closed", anim, doorRefTop, doorRefBottom, doorState);
    if (isAudioEnabled) doorClosing.play()
  }

  // ============= Return Single Group =============
  return (
    <group {...props} dispose={null}>
      {/* HS1T */}
      <mesh geometry={n1.BarrelBottom_Baked.geometry} material={mat1.HSet1_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      {/* HS2T */}
      <mesh geometry={n2.BirchPlanks_Baked.geometry} material={mat2.Set2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      {/* HS3T */}
      <mesh geometry={n3.ArmorDiamondLayer1_Baked.geometry} material={mat3.Set3_Baked} position={[1.643, 14.744, 1.654]} />
      {/* HS5T */}
      <mesh geometry={n4.CampfireLog_Baked.geometry} material={mat4.Set5_Baked} position={[1.643, 14.744, 1.654]} />

      {/* HS6T */}
      <mesh geometry={n5.OakLeavesOnHome_Baked.geometry} material={mat5.Set6_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* HS4T (Door) */}
      <mesh geometry={n6.AmethystCluster_Baked.geometry} material={mat6.Set4_Baked} position={[5.084, 23.287, 8.276]} rotation={[Math.PI / 2, 0, Math.PI]} />
      <mesh geometry={n6.BlueOrchid_Baked.geometry} material={mat6.Set4_Baked} position={[0.084, 20.412, 12.776]} rotation={[Math.PI / 2, 0, Math.PI]} />
      <mesh geometry={n6.BrewingStand_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} />
      <mesh geometry={n6.BrewingStandBase_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} />
      <mesh geometry={n6.CherryLeaves_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.FloweringAzaleaLeaves_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.Glass_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.GlassPaneTop_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.JungleSapling_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.OakDoorBottom_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.OakDoorTop_Baked.geometry} material={mat6.Set4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.Welcome_Sign_Baked.geometry} material={mat6.Set4_Baked} position={[2.834, 14.029, 2.81]} rotation={[1.862, -0.285, 2.388]} scale={0.16} />

      <mesh ref={doorRefBottom} geometry={n6.OakFrontDoorBottom.geometry} material={mat6.Set4_Baked} position={[-1.36, 17.788, 11.781]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh ref={doorRefTop} geometry={n6.OakFrontDoorTop.geometry} material={mat6.Set4_Baked} position={[-1.36, 17.788, 11.781]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* WS1T */}
      <mesh geometry={n7.HouseOakLog_Baked.geometry} material={mat7.Wood_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />


      <mesh geometry={n8.HangShelf_Wood2_Baked.geometry} material={mat8.Set7_1_Baked} position={[10.515, 19.316, 1.964]} scale={[0.069, 0.009, 0.558]} />
      {/* LanternsT */}
      <mesh geometry={n9.HangShelf_Wood1_Baked.geometry} material={mat9.Set7_1_Baked} position={[7.211, 22.978, 13.707]} rotation={[0, -Math.PI / 2, 0]} scale={[0.069, 0.009, 0.558]} />
      <mesh geometry={n9.LanternsInside_Baked.geometry} material={mat9.LanternsInside_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n9.LanternsOutside_Baked.geometry} material={mat9['LanternsOutside_Baked.004']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />



      {/* HFrameT */}
      <mesh geometry={n10.WhiteConcrete_Baked.geometry} material={mat10['WhiteConcrete_Baked.002']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      <mesh geometry={n11['minecraft_painting-meditative_Baked'].geometry} material={mat11.H8_Baked} position={[10.582, 21.911, 3.023]} rotation={[Math.PI / 2, 0, 0]} />

      {/* HWood2 */}
      <mesh geometry={n12.OakPlanks_Baked.geometry} material={mat12.OakPlanks_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n12.SprucePlanksHome_Baked.geometry} material={mat12['SprucePlanksHome_Baked.001']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
});
