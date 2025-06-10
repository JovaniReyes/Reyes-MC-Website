import { MeshBasicMaterial } from "three"


export const convertMaterialsToMeshBasicMaterial = (materials, alphaTestValue=0.5) => {
    Object.keys(materials).forEach((key) => {
        const mat = materials[key];
        if (mat.emissiveMap){
            materials[key] = new MeshBasicMaterial({
                map: mat.emissiveMap,
            });
        }else {
            materials[key] = new MeshBasicMaterial({
                map: mat.map,
                transparent: true,
                alphaTest: alphaTestValue,

            });
        }
    });

    return materials;
};