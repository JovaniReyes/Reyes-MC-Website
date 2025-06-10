import * as THREE from "three"
import { useHelper } from "@react-three/drei";

export const DebugCurve= ({curve}) => {
  const points = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  return (<line geometry={geometry}><lineBasicMaterial color={"red"} /> </line>);
};

export const CameraHelper = ({cameraRef}) => {
  useHelper(cameraRef, THREE.CameraHelper);
  return null;
}