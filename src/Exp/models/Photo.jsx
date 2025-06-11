
import About from '../../UI/About/About';
import Project from '../../UI/Project/Project';
import { playSound } from '../../Utils/buttonSound';
import aboutMeData from '../../UI/About/AboutMeData';
import { useModalStore } from '../stores/modalStore';
import React, {useEffect, useState, useMemo} from 'react'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { getMaterial, materialSets } from '../utils/materialEditor';
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
//import * as THREE from "three";
const pi = Math.PI;

const projectNames = {
    'PP1': "Assembly Line Typeracer",
    'PP2': "Chess Game", 
    'PP3': "Arduino Bot"
};
//Header Names
const aboutNames = {
    'P1.0': "About Me 1",
    'P1.1': "About Me 1.1",
    'P1.2': "About Me 1.2",
    'P1.3': "About Me 1.3",
    'P1.4': "About Me 1.4",
    'P1.5': "About Me 1.5",
    
    'P2.0': "About Me 2",
    'P2.1': "About Me 2.1",
    'P2.2': "About Me 2.2",

    'P3.0': "About Me 3",
    'P3.1': "About Me 3.1",
    'P3.2': "About Me 3.2",
    'P3.3': "About Me 3.3",
    'P3.4': "About Me 3.4",
    'P3.5': "About Me 3.5",

    'P4.0': "About Me 4",
    'P4.1': "About Me 4.1",
    'P4.2': "About Me 4.2",

    'P5.0': "About Me 5",
    'P5.1': "About Me 5.1",
    'P5.2': "About Me 5.2",
    'P5.3': "About Me 5.3",
    'P5.4': "About Me 5.4",
    'P5.5': "About Me 5.5",
    'P5.6': "About Me 5.6",
    'P5.7': "About Me 5.7",
    'P5.8': "About Me 5.8",
    'P5.9': "About Me 5.9",
    'P5.10': "About Me 5.95",

    'P6.0': "About Me 6",
    'P6.1': "About Me 6.1",
    'P6.2': "About Me 6.2",
};

const pRange = {
    S1: [0.224, 0.254],
    S2: [0.250, 0.274],
    S3: [0.408, 0.600],
    S4: [0.456, 0.556],
    S5: [0.456, 0.556],
    S6: [0.456, 0.556],
    SP: [0.318, 0.398],
    SU: [1.500, 2.000]
};

const meshConfigs = [
  // ── P1 (set 1) ─────────────────────────────────────────────
  { id: 'P1.0',  geometry: 'PM1_Baked',  progressRange: pRange["S1"], material: 'PM1_Baked',           position: [5.483, 18.111, 13.218], rotation: [0, 0.382, 0],             scale: [-0.328, -0.328, -0.045], section: 'about', color: "None", },
    { id: 'P1.1',  geometry: 'PS1_Baked',  progressRange: pRange["S1"], material: 'PS1_Baked',           position: [4.376, 18.111, 13.194], rotation: [0, 0.382, 0],             scale: [-0.328, -0.328, -0.045], section: 'about', color: "None", },
    { id: 'P1.2',  geometry: 'PS2_Baked',  progressRange: pRange["S1"], material: 'PS2_Baked',           position: [6.568, 18.111, 13.061], rotation: [0, 0.545, 0],             scale: [-0.328, -0.328, -0.045], section: 'about', color: "None", },
    { id: 'P1.3',  geometry: 'PS3_Baked',  progressRange: pRange["S1"], material: 'PS3_Baked',           position: [6.074, 17.948, 13.21],  rotation: [0, 0.537, 0],             scale: [-0.164, -0.164, -0.023], section: 'about', color: "None", },
    { id: 'P1.4',  geometry: 'PS4_Baked',  progressRange: pRange["S1"], material: 'PS4_Baked',           position: [4.953, 17.948, 13.245], rotation: [0, 0.47, 0],              scale: [-0.164, -0.164, -0.023], section: 'about', color: "None", },
    { id: 'P1.5',  geometry: 'PS5_Baked',  progressRange: pRange["S1"], material: 'PS5_Baked',           position: [3.835, 17.948, 13.14],  rotation: [0, 0.442, 0],             scale: [-0.164, -0.164, -0.023], section: 'about', color: "None", },

  // ── P2 (set 2) ─────────────────────────────────────────────
  { id: 'P2.0',  geometry: 'PM2_Baked',  progressRange: pRange["S2"], material: 'PM2_Baked',           position: [11.53, 18.393, 9.276],  rotation: [-pi / 2, 0,  pi / 2],     scale: 0.055,                   section: 'about', color: "None", },
    { id: 'P2.1',  geometry: 'PS6_Baked',  progressRange: pRange["S2"], material: 'PS6_Baked.001',       position: [11.383, 17.973, 9.581], rotation: [1.676, 1.303, -1.673],     scale: [-0.187, -0.187, -0.026], section: 'about', color: "None", },
    { id: 'P2.2',  geometry: 'PS7_Baked',  progressRange: pRange["S2"], material: 'PS7_Baked',           position: [11.309, 17.978, 8.949], rotation: [2.941, 0.814, -2.969],     scale: [-0.187, -0.187, -0.026], section: 'about', color: "None", },

  // ── P3 (set 3) ─────────────────────────────────────────────
  { id: 'P3.0',  geometry: 'PM3_Baked',  progressRange: pRange["S3"], material: 'PM3_Baked.001',       position: [10.535, 19.977, 1.949], rotation: [-pi / 2, 0,  pi / 2],     scale: 0.05,                    section: 'about', color: "None", },
    { id: 'P3.1',  geometry: 'PS8_Baked',  progressRange: pRange["S3"], material: 'PS8_Baked.002',       position: [10.527, 19.45, 1.531],  rotation: [-pi, 1.383, -pi],          scale: [-0.089, -0.089, -0.012], section: 'about', color: "None", },
    { id: 'P3.2',  geometry: 'PS9_Baked',  progressRange: pRange["S3"], material: 'PS9_Baked.001',       position: [10.53, 19.45, 1.737],   rotation: [-pi, 1.477, -pi],          scale: [-0.089, -0.089, -0.012], section: 'about', color: "None", },
    { id: 'P3.3',  geometry: 'PS10_Baked', progressRange: pRange["S3"], material: 'PS10_Baked.001',      position: [10.53, 19.451, 1.958],  rotation: [0, 1.521, 0],             scale: [-0.089, -0.089, -0.012], section: 'about', color: "None", },
    { id: 'P3.4',  geometry: 'PS11_Baked', progressRange: pRange["S3"], material: 'PS11_Baked.001',      position: [10.53, 19.45, 2.182],   rotation: [0, 1.492, 0],             scale: [-0.089, -0.089, -0.012], section: 'about', color: "None", },
    { id: 'P3.5',  geometry: 'PS12_Baked', progressRange: pRange["S3"], material: 'PS12_Baked.001',      position: [10.527, 19.45, 2.4],    rotation: [0, 1.459, 0],             scale: [-0.089, -0.089, -0.012], section: 'about', color: "None", },

  // ── P4 (set 4) ─────────────────────────────────────────────
  { id: 'P4.0',  geometry: 'PM4_Baked',  progressRange: pRange["S4"], material: 'PM4_Baked.001',       position: [10.012, 24.048, 13.734],rotation: [ pi / 2, 0,  pi],         scale: 0.04,                    section: 'about', color: "Green", },
    { id: 'P4.1',  geometry: 'PS13_Baked', progressRange: pRange["S4"], material: 'PS13_Baked.001',      position: [9.311, 24.485, 13.734], rotation: [-pi / 2, 0, 0],           scale: 0.04,                    section: 'about', color: "Green", },
    { id: 'P4.2',  geometry: 'PS14_Baked', progressRange: pRange["S4"], material: 'PS14_Baked.001',      position: [9.311, 23.611, 13.734], rotation: [-pi / 2, 0, 0],           scale: 0.04,                    section: 'about', color: "Green", },

  // ── P6 (set 6) ─────────────────────────────────────────────
  { id: 'P6.0',  geometry: 'PM5_Baked',  progressRange: pRange["S6"], material: 'PM5_Baked.001',       position: [8.378, 24.048, 13.744], rotation: [ pi / 2, 0,  pi],        scale: [0.066, 0.053, 0.066],   section: 'about', color: "None", },
    { id: 'P5.1',  geometry: 'PS15_Baked', progressRange: pRange["S6"], material: 'PS15_Baked.002',      position: [7.638, 23.136, 13.682], rotation: [0, -0.351, 0],           scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.2',  geometry: 'PS16_Baked', progressRange: pRange["S6"], material: 'PS16_Baked.001',      position: [7.434, 23.136, 13.685], rotation: [0, -0.333, 0],           scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.3',  geometry: 'PS17_Baked', progressRange: pRange["S6"], material: 'PS17_Baked.001',      position: [7.226, 23.136, 13.683], rotation: [0, -0.33, 0],            scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.4',  geometry: 'PS18_Baked', progressRange: pRange["S6"], material: 'PS18_Baked.001',      position: [7.021, 23.136, 13.684], rotation: [0, -0.34, 0],           scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.5',  geometry: 'PS19_Baked', progressRange: pRange["S6"], material: 'PS19_Baked.001',      position: [6.817, 23.136, 13.68],  rotation: [0, -0.358, 0],          scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.6',  geometry: 'PS22_Baked', progressRange: pRange["S6"], material: 'PS22_Baked',          position: [9.956, 23.14, 13.679], rotation: [0,  0.317, 0],           scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.7',  geometry: 'PS23_Baked', progressRange: pRange["S6"], material: 'PS23_Baked',          position: [9.752, 23.14, 13.682], rotation: [0,  0.334, 0],           scale: [-0.096, -0.096, -0.013], section: 'about', color: "None", },
    { id: 'P5.8',  geometry: 'PS24_Baked', progressRange: pRange["S6"], material: 'PS24_Baked',          position: [9.544, 23.141, 13.68], rotation: [0,  0.337, 0],           scale: [-0.096, -0.096, -0.013], section: 'about',color: "None", },
    { id: 'P5.9',  geometry: 'PS25_Baked', progressRange: pRange["S6"], material: 'PS25_Baked.001',      position: [9.339, 23.14, 13.681], rotation: [0,  0.327, 0],           scale: [-0.096, -0.096, -0.013], section: 'about',color: "None", },
    { id: 'P5.10', geometry: 'PS26_Baked', progressRange: pRange["S6"], material: 'PS26_Baked',          position: [9.135, 23.14, 13.677], rotation: [0,  0.309, 0],           scale: [-0.096, -0.096, -0.013], section: 'about',color: "None", },

  // ── P5 (set 5) ─────────────────────────────────────────────
  { id: 'P5.0',  geometry: 'PM6_Baked',  progressRange: pRange["S5"], material: 'PM6_Baked.001',       position: [6.746, 24.05, 13.739],  rotation: [-pi / 2, 0, 0],           scale: 0.04,                    section: 'about', color: "Blue", },
    { id: 'P6.1',  geometry: 'PS20_Baked', progressRange: pRange["S5"], material: 'PS20_Baked.001',      position: [7.445, 24.538, 13.739], rotation: [-pi / 2, 0, 0],          scale: 0.039,                   section: 'about', color: "Blue", },
    { id: 'P6.2',  geometry: 'PS21_Baked', progressRange: pRange["S5"], material: 'PS21_Baked.001',      position: [8.378, 24.048, 13.744], rotation: [-pi / 2, 0, 0],          scale: 0.04,                    section: 'about', color: "Blue", },

  // ── PP (project photos) ───────────────────────────────────
  { id: 'PP1', geometry: 'PP1_Baked', progressRange: pRange["SP"], material: 'PP1_Baked', position: [2.086, 18.29, 6.702], rotation: [-pi / 2, 0, 0], scale: 0.051, section: 'projects', color: "None", },
    { id: 'PP2', geometry: 'PP2_Baked', progressRange: pRange["SP"], material: 'PP2_Baked', position: [3.081, 18.29, 6.702], rotation: [-pi / 2, 0, 0], scale: 0.051, section: 'projects', color: "None", },
    { id: 'PP3', geometry: 'PP3_Baked', progressRange: pRange["SP"], material: 'PP3_Baked', position: [4.083, 18.292, 6.702], rotation: [-pi / 2, 0, 0], scale: 0.051, section: 'projects', color: "None", },

  // ── PU (utility set) ──────────────────────────────────────
  { id: 'PU1',  geometry: 'PU1_Baked',  progressRange: pRange["SU"], material: 'PU1_Baked.001',  position: [3.188, 23.004, 13.332], rotation: [0, -0.319, 0],        scale: [-0.218, -0.218, -0.03], section: 'about', color: "None", },
    { id: 'PU2',  geometry: 'PU2_Baked',  progressRange: pRange["SU"], material: 'PU2_Baked.001',  position: [2.633, 23.004, 13.105], rotation: [0, -0.319, 0],        scale: [-0.218, -0.218, -0.03], section: 'about', color: "None", },
    { id: 'PU3',  geometry: 'PU3_Baked',  progressRange: pRange["SU"], material: 'PU3_Baked.001',  position: [2.084, 23.004, 12.928], rotation: [0, -0.319, 0],        scale: [-0.218, -0.218, -0.03], section: 'about', color: "None", },
    { id: 'PU4',  geometry: 'PU4_Baked',  progressRange: pRange["SU"], material: 'PU4_Baked.001',  position: [10.545, 23.718, 7.675], rotation: [-pi / 2, 0,  pi / 2],  scale: 0.042,                   section: 'about', color: "None", },
    { id: 'PU5',  geometry: 'PU5_Baked',  progressRange: pRange["SU"], material: 'PU5_Baked.001',  position: [10.545, 23.032, 7.218], rotation: [-pi / 2, 0,  pi / 2],  scale: 0.042,                   section: 'about', color: "None", },
    { id: 'PU6',  geometry: 'PU6_Baked',  progressRange: pRange["SU"], material: 'PU6_Baked.001',  position: [10.545, 23.718, 6.76],  rotation: [-pi / 2, 0,  pi / 2],  scale: 0.042,                   section: 'about', color: "None", },
    { id: 'PU7',  geometry: 'PU7_Baked',  progressRange: pRange["SU"], material: 'PU7_Baked',      position: [10.558, 22.347, 5.506], rotation: [-pi / 2, 0,  pi / 2],  scale: 0.039,                   section: 'about', color: "None", },
    { id: 'PU8',  geometry: 'PU8_Baked',  progressRange: pRange["SU"], material: 'PU8_Baked',      position: [10.557, 21.43,  4.421], rotation: [-pi / 2, 0,  pi / 2],  scale: 0.039,                   section: 'about', color: "None", },
    { id: 'PU9',  geometry: 'PU9_Baked',  progressRange: pRange["SU"], material: 'PU9_Baked',      position: [10.558, 20.466, 3.422], rotation: [-pi / 2, 0,  pi / 2],  scale: 0.039,                   section: 'about', color: "None", },
    { id: 'PU10', geometry: 'PU10_Baked', progressRange: pRange["SU"], material: 'PU10_Baked.001', position: [5.579, 18.787, 0.867],  rotation: [-pi / 2, 0,  pi],       scale: [0.135, 0.094, 0.135],   section: 'about', color: "None", },
    { id: 'PU11', geometry: 'PU11_Baked', progressRange: pRange["SU"], material: 'PU11_Baked.001', position: [1.926, 18.001, 5.258], rotation: [0, -1.028, 0],        scale: [-0.218, -0.218, -0.03], section: 'about', color: "None", }
];

export default function Model({progress = 0, pulseIntensity = 0, ...props}) {
    const result = useGLTFWithKTX2('/GLBs/Photos/HPT-v1.glb');
    if(!result) return null;
    const { nodes, materials } = result;
    const [hoveredMesh, setHoveredMesh] = useState(null);
    useMemo(() => {
      convertMaterialsToMeshBasicMaterial(materials);
    }, [materials]);
    
    const {checkForOpenModal} = useModalStore();

    const handleClick = (elementID, photoID) => {
        if(elementID === "about"){
          if(progress >= 0.3392 && progress <=  0.3916) return; //Prevents clicking behind project picture
          else if(!aboutNames[photoID]) return;
          else if(photoID === "P5.0") photoID = "P6.0";
          else if(photoID === "P6.0") photoID = "P5.0"
          const mainPhoto= getPhotoGroup(photoID);
          checkForOpenModal(aboutMeData[mainPhoto].name, <About aboutID={mainPhoto}/>, elementID, mainPhoto);
        } else  {
          checkForOpenModal(projectNames[photoID], <Project projectID={photoID}/>, elementID );
        }
        playSound();
    }
    const materialSet = useMemo(() => materialSets(materials, "Picture"), [materials]);

    useEffect(() => {
        document.body.style.cursor = hoveredMesh ? "pointer" : "auto";
    }, [hoveredMesh])

    const getRotation = (config) => (config.rotation ? config.rotation : [-pi / 2, 0, config.rotationZ]);

    return (
    <group {...props} dispose={null}>
        {meshConfigs.map((config) => {
            const geometryName = config.geometry;
            const { id: elementID, progressRange } = config;
            const color = config.color;

            const materialProps = {
                materialSet,
                pulseIntensity,
                hoveredMesh,
                progress,
                elementID,
                progressRange,
                color,
            };

            return (
                <mesh
                    key={geometryName}
                    geometry={nodes[geometryName].geometry}
                    material={getMaterial(materialProps)}
                    position={config.position}
                    rotation={getRotation(config)}
                    scale={config.scale}
                    onPointerOver={() => setHoveredMesh(config.id)}
                    onPointerOut={() => setHoveredMesh(null)}
                    onClick={() => handleClick(config.section, config.id)}
                />
            );
        })}
    </group>
    );
}

const getPhotoGroup = (photoID) => {
    return photoID.substring(0, 3) + "0";
}