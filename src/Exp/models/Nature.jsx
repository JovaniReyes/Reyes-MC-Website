import React, { useRef, useMemo } from 'react'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'

export default function Model(props) {
  const natureGLBPaths = [
    '/GLBs/Nature/N1T-transformed.glb',// n1, m1
    '/GLBs/Nature/N2T-transformed.glb',// n2, m2
    '/GLBs/Nature/N3T-transformed.glb',// n3, m3
    '/GLBs/Nature/N4T-transformed.glb',// n4, m4
    '/GLBs/Nature/N5T-transformed.glb',// n5, m5
    '/GLBs/Nature/N6T-transformed.glb',// n6, m6
    '/GLBs/Nature/SwingT-transformed.glb',// n7, m7
  ];

  const natureResults = natureGLBPaths.map(useGLTFWithKTX2);
  const anyNaturePending = natureResults.some(result => result === null);
  if (anyNaturePending) return null; // or <LoadingNatureModels />

  const [
    { nodes: n1, materials: m1 },
    { nodes: n2, materials: m2 },
    { nodes: n3, materials: m3 },
    { nodes: n4, materials: m4 },
    { nodes: n5, materials: m5 },
    { nodes: n6, materials: m6 },
    { nodes: n7, materials: m7 }
  ] = natureResults;
 
  useMemo(() => {
    convertMaterialsToMeshBasicMaterial(m1)
    convertMaterialsToMeshBasicMaterial(m2)
    convertMaterialsToMeshBasicMaterial(m3)
    convertMaterialsToMeshBasicMaterial(m4)
    convertMaterialsToMeshBasicMaterial(m5)
    convertMaterialsToMeshBasicMaterial(m6)
    convertMaterialsToMeshBasicMaterial(m7)
  }, [m1, m2, m3, m4, m5, m6, m7]);

  return (
    <group {...props} dispose={null}>
      {/* ====================== Nature1T ====================== */}
      <mesh geometry={n1.Leaves001_Baked.geometry} material={m1['Leaves.001_Baked.003']} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n1.Leaves1_Baked.geometry} material={m1['Leaves1_Baked.004']} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature2T ====================== */}
      <mesh geometry={n2.dirt_path_top_Baked.geometry} material={m2.dirt_path_top_Baked} position={[4.587, 13.861, 2.778]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n2.Leaves002_Baked.geometry} material={m2['Leaves.002_Baked.001']} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />
      

      {/* ====================== Nature3T ====================== */}
      <mesh geometry={n3.GrassBlock2_Baked.geometry} material={m3.GrassBlock2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n3.GrassBlockTopFar_Baked.geometry} material={m3.GrassBlockTopFar_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature4T ====================== */}
      <mesh geometry={n4.oak_log_Baked.geometry} material={m4.Logs_Baked} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature5T ====================== */}
       <mesh geometry={n5.ShortGrass1_Baked.geometry} material={m5.GrassSet_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature6T ====================== */}
      <mesh geometry={n6.AzureBluet_Baked.geometry} material={m6.N6_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      {/* ====================== SwingT ====================== */}
       <mesh geometry={n7.acacia_trapdoor_Baked.geometry} material={m7.SwingSet_Baked} position={[4.587, 13.788, 2.722]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}
