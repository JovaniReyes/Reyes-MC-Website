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
  ] = natureResults;
 
  useMemo(() => {
    convertMaterialsToMeshBasicMaterial(m1)
    convertMaterialsToMeshBasicMaterial(m2)
    convertMaterialsToMeshBasicMaterial(m3)
    convertMaterialsToMeshBasicMaterial(m4)
    convertMaterialsToMeshBasicMaterial(m5)
    convertMaterialsToMeshBasicMaterial(m6)
  }, [m1, m2, m3, m4, m5, m6]);

  return (
    <group {...props} dispose={null}>
      {/* ====================== Nature1T ====================== */}
       <mesh geometry={n1.dirt_path_top_Baked.geometry} material={m1.Nature1_Baked} position={[4.587, 13.87, 2.778]} rotation={[Math.PI / 2, 0, 0]} />


      {/* ====================== Nature2T ====================== */}
      <mesh geometry={n2.Leaves1_Baked.geometry} material={m2.NatureS2_Baked} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* ====================== Nature3T ====================== */}
      <mesh geometry={n3.Leaves001_Baked.geometry} material={m3.NatureS3_Baked} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature4T ====================== */}
       <mesh geometry={n4.AzureBluet_Baked.geometry} material={m4.NatureS4_Baked} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />

      {/* ====================== Nature5T ====================== */}
      <mesh geometry={n5.LampPost_Baked.geometry} material={m5['LampPost_Baked.001']} position={[-22.913, 15.795, 1.278]} />
      <mesh geometry={n5.Wood_Baked.geometry} material={m5.Nature5_Baked} position={[4.587, 13.788, 2.778]} rotation={[Math.PI / 2, 0, 0]} />
      {/* ====================== Nature6T ====================== */}
       <mesh geometry={n6.ShortGrass_Baked.geometry} material={m6['ShortGrass_Baked.001']} position={[1.643, 14.744, 1.654]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}
