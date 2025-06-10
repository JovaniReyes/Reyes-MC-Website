import React, { useRef, useMemo } from 'react'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'

export default function Model(props) {
  const natureGLBPaths = [
    '/GLBs/Nature/N1T-transformed.glb',           // n1, m1
    '/GLBs/Nature/Nature3T-transformed.glb',      // n2, m2
    '/GLBs/Nature/Nature6T-transformed.glb',      // n3, m3
    '/GLBs/Nature/Nature7T-transformed.glb',      // n4, m4
    '/GLBs/Nature/N4T-transformed.glb',           // n5, m5
    '/GLBs/Nature/N5T-transformed.glb',           // n6, m6
    '/GLBs/Nature/N6T-transformed.glb'            // n7, m7
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
      <mesh geometry={n1.GrassBlock1_Baked.geometry} material={m1.GrassBlock1_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n1.GrassBlock2_Baked.geometry} material={m1.GrassBlock2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n1.OakLeavesCloseSet1_Baked.geometry} material={m1.NS1_2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      {/* ====================== Nature3T ====================== */}
      <mesh geometry={n2?.DirtClose_Baked?.geometry} material={m2?.DirtClose_Baked} position={[2.487, 16.684, 2.77]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n2?.DirtFar2_Baked?.geometry} material={m2?.DirtFar2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n2?.DirtFar_Baked?.geometry} material={m2?.['DirtFar_Baked.001']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature6T ====================== */}
      <mesh geometry={n3?.OakLeavesFarSet2_Baked?.geometry} material={m3?.OakLeavesFarSet2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature7T ====================== */}
      <mesh geometry={n4?.OakLeavesFarSet1_Baked?.geometry} material={m4?.BakedOakLeavesFar1_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== N4T ====================== */}
      <mesh geometry={n5.GrassBlockTopFar_Baked.geometry} material={m5['GrassBlockTopFar_Baked.001']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n5.OakLog_Baked.geometry} material={m5.NS4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== N5T ====================== */}
      <mesh geometry={n6.ShortGrass1_Baked.geometry} material={m6.ShortGrass1_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.ShortGrass2_Baked.geometry} material={m6.ShortGrass2_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={n6.ShortGrass3_Baked.geometry} material={m6.ShortGrass3_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== FlowersT ====================== */}
      <mesh geometry={n7.AzureBluet_Baked.geometry} material={m7.N6_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}
