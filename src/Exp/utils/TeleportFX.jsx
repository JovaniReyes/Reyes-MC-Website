import Teleport from "../models/Teleport";
import * as THREE from "three";
import { useFrame} from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

/** One-shot effect that cleans itself up after `duration` ms */
const ROOT_OFFSET = new THREE.Vector3(.6, 25.589, 36);
export default function TeleportFX({
  position,
  duration = 15000,        // full-brightness time
  rotation = [0, 0, 0],
  shrinkDuration = 6000,   // ms for the 1 → 0.5 scale
  onDone,
}) {
  const root = React.useRef();
  /* -------------------------------------------------- *
     1. wait `duration` → start shrinking
     2. after shrink finishes → tell parent to dispose
  * -------------------------------------------------- */
  const startShrink = React.useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => (startShrink.current = true), duration);
    const t2 = setTimeout(onDone, duration + shrinkDuration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, shrinkDuration, onDone]);

  /* simple linear lerp on every frame */
  useFrame((_, delta) => {
    if (startShrink.current && root.current) {
      const target = 0.5;                       // final uniform scale
      const factor = delta / (shrinkDuration / 10000); // 0‒1 per second
      root.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        factor
      );
    }
  });
/* convert `position` into a Vector3, subtract baked offset */
  const fixed = Array.isArray(position)
    ? new THREE.Vector3(...position).sub(ROOT_OFFSET).toArray()
    : position.clone().sub(ROOT_OFFSET).toArray();

  return (
    <group ref={root} position={fixed} rotation={rotation}>
      <Teleport />
    </group>
  );
 }