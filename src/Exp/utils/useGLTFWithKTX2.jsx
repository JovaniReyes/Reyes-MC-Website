import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three-stdlib";
import { useMemo, useEffect } from "react";
import { useAssetStore } from "../stores/AssetStore";

const sharedKTX2 = new KTX2Loader().setTranscoderPath("/basis/");
let glSeen = null;

export function useGLTFWithKTX2(path) {
  const { gl } = useThree();
  const { start, done } = useAssetStore();
  const loader = useMemo(() => {
    // Only detect support once per unique WebGL context
    if (glSeen !== gl) {
      sharedKTX2.detectSupport(gl);
      glSeen = gl;
    }
    return sharedKTX2;
  }, [gl]);
  
  useEffect(start, []);

  const gltf = useGLTF(path, true, true, (l) => l.setKTX2Loader(loader));
  useEffect(done, [gltf]);
  
  return gltf;
}