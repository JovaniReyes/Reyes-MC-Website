
import { convertMaterialsToMeshBasicMaterial } from "../../utils/convertMaterial";
import { useGLTFWithKTX2 } from "../../utils/useGLTFWithKTX2";
import { useMemo } from "react";
/**
 * Shared GLTF asset hooks for the site.
 *
 * Each hook follows the same public API:
 * ```js
 * const { nodes, materials, animations, loading } = useXyzGLTFAssets();
 * if (loading) return null; // or your own fallback
 * ```
 *
 * - **nodes** & **materials** are grouped objects whose keys match the
 *   comments below (n1, n2, … / m1, m2, …) so each consumer can easily pick
 *   the part of the GLB they need.
 * - **animations** is only included for models that actually ship with clips.
 * - **loading** stays `true` until *everything* is ready (including KTX2
 *   texture decoding where applicable).
 */

/* -------------------------------------------------------------------------- */
/* Home – 12 separate GLBs                                                    */
/* -------------------------------------------------------------------------- */
export function useHomeGLTFAssets() {
  const paths = [
    "/GLBs/Home/H1T-transformed.glb",
    "/GLBs/Home/H2T-transformed.glb",
    "/GLBs/Home/H3T-transformed.glb",
    "/GLBs/Home/H5T-transformed.glb",
    "/GLBs/Home/H4T-v1.glb",
    "/GLBs/Home/H6T-transformed.glb",
    "/GLBs/Home/H7T-transformed.glb",
    "/GLBs/Home/HWT-transformed.glb",
    "/GLBs/Home/HFT-transformed.glb",
    "/GLBs/Home/H7_1T-transformed.glb",
    "/GLBs/Home/H8T-transformed.glb",
    "/GLBs/Home/HW2T-transformed.glb",
  ];

  const results = paths.map(useGLTFWithKTX2);
  const loading = results.some(result => result === null);
  if(loading) return null;
  const memo = useMemo(() => {
    const [
      { nodes: n1, materials: mat1 },
      { nodes: n2, materials: mat2 },
      { nodes: n3, materials: mat3 },
      { nodes: n4, materials: mat4 },
      { nodes: n6, materials: mat6 },
      { nodes: n5, materials: mat5 },
      { nodes: n9, materials: mat9 },
      { nodes: n7, materials: mat7 },
      { nodes: n10, materials: mat10 },
      { nodes: n8, materials: mat8 },
      { nodes: n11, materials: mat11 },
      { nodes: n12, materials: mat12 },
    ] = results;

    [
      mat1, mat2, mat3, mat4, mat5, mat6,
      mat7, mat8, mat9, mat10, mat11, mat12,
    ].forEach(convertMaterialsToMeshBasicMaterial);

    return {
      nodes: { n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12 },
      materials: { mat1, mat2, mat3, mat4, mat5, mat6, mat7, mat8, mat9, mat10, mat11, mat12 },
    };
  }, [loading, ...results]);
  
  return { ...memo, loading };
}

/* -------------------------------------------------------------------------- */
/* Maps – single GLB                                                          */
/* -------------------------------------------------------------------------- */
export function useMapsGLTFAssets() {
  const result = useGLTFWithKTX2("/GLBs/Maps/MapsT-v1.glb");

  const loading =
    !result ||
    !result.nodes ||
    !result.materials?.MapFF_Baked?.map; // wait for baked texture too

  const memo = useMemo(() => {
    if (loading) return { nodes: null, materials: null };

    const { nodes, materials } = result;
    convertMaterialsToMeshBasicMaterial(materials);
    return { nodes, materials };
  }, [loading, result]);

  return { ...memo, loading };
}

/* -------------------------------------------------------------------------- */
/* Mobs – single GLB + animations                                             */
/* -------------------------------------------------------------------------- */
export function useMobsGLTFAssets() {
  const result = useGLTFWithKTX2("/GLBs/Mobs/MobsFinalT-transformed.glb");
  const loading = !result;

  const memo = useMemo(() => {
    if (loading) return { nodes: null, materials: null, animations: null };

    const { nodes, materials, animations } = result;
    convertMaterialsToMeshBasicMaterial(materials);
    return { nodes, materials, animations };
  }, [loading, result]);

  return { ...memo, loading };
}

/* -------------------------------------------------------------------------- */
/* Nature – 7 separate GLBs                                                   */
/* -------------------------------------------------------------------------- */
export function useNatureGLTFAssets() {
  const paths = [
    "/GLBs/Nature/N1T-transformed.glb",           // n1, m1
    "/GLBs/Nature/Nature3T-transformed.glb",      // n2, m2
    "/GLBs/Nature/Nature6T-transformed.glb",      // n3, m3
    "/GLBs/Nature/Nature7T-transformed.glb",      // n4, m4
    "/GLBs/Nature/N4T-transformed.glb",           // n5, m5
    "/GLBs/Nature/N5T-transformed.glb",           // n6, m6
    "/GLBs/Nature/N6T-transformed.glb",           // n7, m7
  ];

  const results = paths.map(useGLTFWithKTX2);
  const loading = results.some((r) => r == null);

  const memo = useMemo(() => {
    if (loading) return { nodes: null, materials: null };

    const [
      { nodes: n1, materials: m1 },
      { nodes: n2, materials: m2 },
      { nodes: n3, materials: m3 },
      { nodes: n4, materials: m4 },
      { nodes: n5, materials: m5 },
      { nodes: n6, materials: m6 },
      { nodes: n7, materials: m7 },
    ] = results;

    [m1, m2, m3, m4, m5, m6, m7].forEach(convertMaterialsToMeshBasicMaterial);

    return {
      nodes: { n1, n2, n3, n4, n5, n6, n7 },
      materials: { m1, m2, m3, m4, m5, m6, m7 },
    };
  }, [loading, ...results]);

  return { ...memo, loading };
}

/* -------------------------------------------------------------------------- */
/* Photos – single GLB                                                        */
/* -------------------------------------------------------------------------- */
export function usePhotoGLTFAssets() {
  const result = useGLTFWithKTX2("/GLBs/Photos/HPT-v1.glb");
  const loading = !result;

  const memo = useMemo(() => {
    if (loading) return { nodes: null, materials: null };

    const { nodes, materials } = result;
    convertMaterialsToMeshBasicMaterial(materials);
    return { nodes, materials };
  }, [loading, result]);

  return { ...memo, loading };
}

/* -------------------------------------------------------------------------- */
/* Teleport – single GLB + animations                                         */
/* -------------------------------------------------------------------------- */
export function useTeleportGLTFAssets() {
  const result = useGLTFWithKTX2("/GLBs/FX/TET-transformed.glb");
  const loading = !result;

  const memo = useMemo(() => {
    if (loading) return { nodes: null, materials: null, animations: null };

    const { nodes, materials, animations } = result;
    convertMaterialsToMeshBasicMaterial(materials);
    return { nodes, materials, animations };
  }, [loading, result]);

  return { ...memo, loading };
}
