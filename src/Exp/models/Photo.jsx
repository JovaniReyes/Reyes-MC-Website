import React, { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import Project from '../../UI/Project/Project';
import { playSound } from '../../Utils/buttonSound';
import { useModalStore } from '../stores/modalStore';
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2';

const PATHS = {
  p1: '/GLBs/Photos/P1T-transformed.glb',
  p2: '/GLBs/Photos/P2T-transformed.glb',
  p3: '/GLBs/Photos/P3T-transformed.glb',
  pu: '/GLBs/Photos/PUT-transformed.glb',
  pat: '/GLBs/Photos/PAT-transformed.glb',
  ptt: '/GLBs/Photos/PTT-transformed.glb',
  projects: '/GLBs/Photos/ProjectPhotosT-v1.glb',
};

const projectNames = {
  PP1: 'Assembly Line Typeracer',
  PP2: 'Chess Game',
  PP3: 'Arduino Bot',
};

function makeBakedMaterial(sourceMaterial) {
  const texture = sourceMaterial?.map ?? null;

  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }

  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: sourceMaterial?.transparent ?? false,
    opacity: sourceMaterial?.opacity ?? 1,
    alphaTest: sourceMaterial?.alphaTest ?? 0,
    side: sourceMaterial?.side ?? THREE.FrontSide,
    toneMapped: false,
    color: 0xffffff,
  });
}

export default function Model(props) {
  const p1 = useGLTFWithKTX2(PATHS.p1);
  const p2 = useGLTFWithKTX2(PATHS.p2);
  const p3 = useGLTFWithKTX2(PATHS.p3);
  const pu = useGLTFWithKTX2(PATHS.pu);
  const pat = useGLTFWithKTX2(PATHS.pat);
  const ptt = useGLTFWithKTX2(PATHS.ptt);
  const projects = useGLTFWithKTX2(PATHS.projects);

  if (!p1 || !p2 || !p3 || !pu || !pat || !ptt || !projects) return null;

  const [hoveredMesh, setHoveredMesh] = useState(null);
  const { checkForOpenModal, isMapOpen } = useModalStore();

  useEffect(() => {
    document.body.style.cursor = hoveredMesh ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hoveredMesh]);

  const handleProjectClick = (photoID) => {
    if (isMapOpen) return;
    if (!projectNames[photoID]) return;

    checkForOpenModal(
      projectNames[photoID],
      <Project projectID={photoID} />,
      'projects'
    );

    playSound();
  };

  const bakedMaterials = useMemo(() => {
    return {
      p1: makeBakedMaterial(p1.materials['PhotoSet1_Baked.001']),
      p2: makeBakedMaterial(p2.materials.PhotoSet2_Baked),
      p3: makeBakedMaterial(p3.materials.PhotoSet3_Baked),
      pu: makeBakedMaterial(pu.materials.PhotoSetUnused1_Baked),
      pat: makeBakedMaterial(pat.materials.AwwwardsFrame_Baked),
      ptt: makeBakedMaterial(ptt.materials.TCAPhoto_Baked),
      pp1: makeBakedMaterial(projects.materials.PP1_Baked),
      pp2: makeBakedMaterial(projects.materials.PP2_Baked),
      pp3: makeBakedMaterial(projects.materials.PP3_Baked),
    };
  }, [p1, p2, p3, pu, pat, ptt, projects]);

  useEffect(() => {
    return () => {
      Object.values(bakedMaterials).forEach((mat) => mat?.dispose?.());
    };
  }, [bakedMaterials]);

  const staticMeshes = useMemo(
    () => [
      {
        key: 'P1',
        geometry: p1.nodes.PS1_1002_Baked.geometry,
        material: bakedMaterials.p1,
        position: [5.226, 18.031, 13.199],
      },
      {
        key: 'P2',
        geometry: p2.nodes.PS2_1002_Baked.geometry,
        material: bakedMaterials.p2,
        position: [11.417, 18.104, 9.268],
      },
      {
        key: 'P3',
        geometry: p3.nodes.PS3_5_Baked.geometry,
        material: bakedMaterials.p3,
        position: [10.502, 19.555, 1.959],
      },
      {
        key: 'PU1',
        geometry: pu.nodes.PU1_1_Baked.geometry,
        material: bakedMaterials.pu,
        position: [10.558, 22.446, 5.833],
      },
      {
        key: 'PAT',
        geometry: pat.nodes.AwwwardsFrame_Baked.geometry,
        material: bakedMaterials.pat,
        position: [1.945, 18.077, 5.391],
      },
      {
        key: 'PTT',
        geometry: ptt.nodes.TCAPhoto_Baked.geometry,
        material: bakedMaterials.ptt,
        position: [8.554, 24.033, 13.695],
        rotation: [-3.14, -0.001, -3.14],
        scale: [2.145, 2.513, 2.145],
      },
    ],
    [p1, p2, p3, pu, pat, ptt, bakedMaterials]
  );

  const projectMeshes = useMemo(
    () => [
      {
        id: 'PP1',
        geometry: projects.nodes.PP1_Baked.geometry,
        material: bakedMaterials.pp1,
        position: [2.086, 18.29, 6.702],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 0.051,
      },
      {
        id: 'PP2',
        geometry: projects.nodes.PP2_Baked.geometry,
        material: bakedMaterials.pp2,
        position: [3.081, 18.29, 6.702],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 0.051,
      },
      {
        id: 'PP3',
        geometry: projects.nodes.PP3_Baked.geometry,
        material: bakedMaterials.pp3,
        position: [4.083, 18.292, 6.702],
        rotation: [-Math.PI / 2, 0, 0],
        scale: 0.051,
      },
    ],
    [projects, bakedMaterials]
  );

  return (
    <group {...props} dispose={null}>
      {staticMeshes.map((mesh) => (
        <mesh
          key={mesh.key}
          geometry={mesh.geometry}
          material={mesh.material}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
        />
      ))}

      {projectMeshes.map((mesh) => (
        <mesh
          key={mesh.id}
          geometry={mesh.geometry}
          material={mesh.material}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          onPointerOver={() => setHoveredMesh(mesh.id)}
          onPointerOut={() => setHoveredMesh(null)}
          onClick={() => handleProjectClick(mesh.id)}
        />
      ))}
    </group>
  );
}

useGLTF.preload(PATHS.p1);
useGLTF.preload(PATHS.p2);
useGLTF.preload(PATHS.p3);
useGLTF.preload(PATHS.pu);
useGLTF.preload(PATHS.pat);
useGLTF.preload(PATHS.ptt);
useGLTF.preload(PATHS.projects);