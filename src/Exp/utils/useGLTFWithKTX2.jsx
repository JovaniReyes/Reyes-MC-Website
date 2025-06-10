// useGLTFWithKTX2.jsx
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three-stdlib";
import { useMemo } from "react";

const sharedKTX2Loader = new KTX2Loader().setTranscoderPath("/basis/");

let supportDetectedForGL = null;

export function useGLTFWithKTX2(path) {
  const { gl } = useThree();

  const loader = useMemo(() => {
    // Only detect support once per unique WebGL context
    if (supportDetectedForGL !== gl) {
      sharedKTX2Loader.detectSupport(gl);
      supportDetectedForGL = gl;
    }
    return sharedKTX2Loader;
  }, [gl]);
  

  return useGLTF(path, true, true, (l) => l.setKTX2Loader(loader));
}
