
import React, {useEffect, useMemo} from 'react'
import {useAnimations } from '@react-three/drei'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
import * as THREE from "three"

function Model(props) {
    const group = React.useRef()
    const result = useGLTFWithKTX2('/GLBs/FX/TET-transformed.glb')
    if(!result) return null;
    const { nodes, materials, animations } = result;

    useMemo(() => {
        convertMaterialsToMeshBasicMaterial(materials);
    }, [materials]);

    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if(actions){
        Object.values(actions).forEach((action) => {
           action
          .reset()
          .setLoop(THREE.LoopOnce, 1);   
          action.clampWhenFinished = true; // hold final frame
          action.play();
        });
        }
    }, [actions]);
    
  return (
    <group ref={group} {...props} dispose={null} scale>
      <group name="Scene">
        <group name="Armature001" position={[0.617, 22.589, 36.616]}>
          <group name="ControlBone">
            <group name="B1" position={[0.127, 0, -0.446]} rotation={[0, 0, -0.549]}>
              <mesh name="TE009_Baked" geometry={nodes.TE009_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.166, 0.272, 0]} rotation={[-0.735, 0.832, 0.886]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1001" position={[0.279, 0, -0.36]} rotation={[0, 0, -0.549]}>
              <mesh name="TE008_Baked" geometry={nodes.TE008_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.179, 0.293, 0]} rotation={[-0.39, 0.557, 0.661]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1002" position={[0.387, 0, -0.256]} rotation={[0, 0, -0.549]}>
              <mesh name="TE007_Baked" geometry={nodes.TE007_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.179, 0.293, 0]} rotation={[0.013, -0.021, 0.549]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1003" position={[0.446, 0, -0.091]} rotation={[0, 0, -0.549]}>
              <mesh name="TE006_Baked" geometry={nodes.TE006_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.176, 0.288, 0]} rotation={[0.013, -0.021, 0.549]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1004" position={[0.445, 0, 0.061]} rotation={[0, 0, -0.549]}>
              <mesh name="TE005_Baked" geometry={nodes.TE005_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.177, 0.289, -0.157]} rotation={[0.013, -0.021, 0.549]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1005" position={[0.381, 0, 0.224]} rotation={[0, 0, -0.549]}>
              <mesh name="TE004_Baked" geometry={nodes.TE004_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.158, 0.258, 0]} rotation={[0.139, -0.222, 0.564]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1006" position={[0.294, 0, 0.346]} rotation={[0, 0, -0.549]}>
              <mesh name="TE003_Baked" geometry={nodes.TE003_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.103, 0.313, -0.13]} rotation={[0.185, -0.293, 0.576]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1007" position={[0.139, 0, 0.428]} rotation={[0, 0, -0.549]}>
              <mesh name="TE002_Baked" geometry={nodes.TE002_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.06, 0.347, -0.065]} rotation={[1.025, -0.95, 1.112]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1008" position={[-0.004, 0, -0.464]} rotation={[-0.149, 0.091, -0.542]}>
              <mesh name="TE010_Baked" geometry={nodes.TE010_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.302, 0.191, 0.025]} rotation={[-0.99, 0.984, 1.227]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1009" position={[0.006, 0, 0.45]} rotation={[0.149, -0.091, -0.542]}>
              <mesh name="TE001_Baked" geometry={nodes.TE001_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.027, 0.363, -0.133]} rotation={[0.675, -0.888, 0.972]} scale={[0, 0.019, 0.019]} />
            </group>
          </group>
        </group>
        <group name="Armature002" position={[0.617, 22.589, 36.616]} rotation={[0, -0.539, 0]}>
          <group name="ControlBone_1">
            <group name="B1_1" position={[0.127, 0, -0.446]} rotation={[0, 0, -0.549]}>
              <mesh name="TE029_Baked" geometry={nodes.TE029_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.166, 0.272, 0]} rotation={[-0.735, 0.832, 0.886]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1001_1" position={[0.279, 0, -0.36]} rotation={[0, 0, -0.549]}>
              <mesh name="TE028_Baked" geometry={nodes.TE028_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.179, 0.293, 0]} rotation={[-0.39, 0.557, 0.661]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1002_1" position={[0.387, 0, -0.256]} rotation={[0, 0, -0.549]}>
              <mesh name="TE027_Baked" geometry={nodes.TE027_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.179, 0.293, 0]} rotation={[0.013, -0.021, 0.549]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1003_1" position={[0.446, 0, -0.091]} rotation={[0, 0, -0.549]}>
              <mesh name="TE026_Baked" geometry={nodes.TE026_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.176, 0.288, 0]} rotation={[0.013, -0.021, 0.549]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1004_1" position={[0.445, 0, 0.061]} rotation={[0, 0, -0.549]}>
              <mesh name="TE025_Baked" geometry={nodes.TE025_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.177, 0.289, -0.157]} rotation={[0.013, -0.021, 0.549]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1005_1" position={[0.381, 0, 0.224]} rotation={[0, 0, -0.549]}>
              <mesh name="TE024_Baked" geometry={nodes.TE024_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.158, 0.258, 0]} rotation={[0.139, -0.222, 0.564]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1006_1" position={[0.294, 0, 0.346]} rotation={[0, 0, -0.549]}>
              <mesh name="TE023_Baked" geometry={nodes.TE023_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.103, 0.313, -0.13]} rotation={[0.185, -0.293, 0.576]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1007_1" position={[0.139, 0, 0.428]} rotation={[0, 0, -0.549]}>
              <mesh name="TE022_Baked" geometry={nodes.TE022_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.06, 0.347, -0.065]} rotation={[1.025, -0.95, 1.112]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1008_1" position={[-0.004, 0, -0.464]} rotation={[-0.149, 0.091, -0.542]}>
              <mesh name="TE030_Baked" geometry={nodes.TE030_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.302, 0.191, 0.025]} rotation={[-0.99, 0.984, 1.227]} scale={[0, 0.019, 0.019]} />
            </group>
            <group name="B1009_1" position={[0.006, 0, 0.45]} rotation={[0.149, -0.091, -0.542]}>
              <mesh name="TE021_Baked" geometry={nodes.TE021_Baked.geometry} material={materials.TeleportEffect_Baked} position={[-0.027, 0.363, -0.133]} rotation={[0.675, -0.888, 0.972]} scale={[0, 0.019, 0.019]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default React.memo(Model);
