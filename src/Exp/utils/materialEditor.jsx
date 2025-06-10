import React from 'react'
import * as THREE from "three";

export function materialEditor(){
  return (<div></div>)
}


//Memoized material creation for each mesh type
export const materialSets = (materials, meshSetName) => {
    if(meshSetName === "Picture") return setPhotos(materials)
    else return setComputer(materials)
};

const setPhotos = (materials) =>{
    let sets = {};
    // maps each material name → the mesh IDs that use it
    const uniqueMaterials = {
    // ── P1 (set 1) ────────────────────────────────
        PM1_Baked  : ['P1.0'],
        PS1_Baked  : ['P1.1'],
        PS2_Baked  : ['P1.2'],
        PS3_Baked  : ['P1.3'],
        PS4_Baked  : ['P1.4'],
        PS5_Baked  : ['P1.5'],


        // ── P2 (set 2) ────────────────────────────────
        PM2_Baked  : ['P2.0'],
        'PS6_Baked.001' : ['P2.1'],
        PS7_Baked : ['P2.2'],

        // ── P3 (set 3) ────────────────────────────────
        'PM3_Baked.001'  : ['P3.0'],
        'PS8_Baked.002'  : ['P3.1'],
        'PS9_Baked.001'  : ['P3.2'],
        'PS10_Baked.001' : ['P3.3'],
        'PS11_Baked.001' : ['P3.4'],
        'PS12_Baked.001' : ['P3.5'],

        // ── P4 (set 4) ────────────────────────────────
        'PM4_Baked.001'  : ['P4.0'],
        'PS13_Baked.001' : ['P4.1'],
        'PS14_Baked.001' : ['P4.2'],

        // ── P5 (set 5) ────────────────────────────────
        'PM6_Baked.001'  : ['P5.0'],
        'PS15_Baked.002' : ['P5.1'],
        'PS16_Baked.001' : ['P5.2'],
        'PS17_Baked.001' : ['P5.3'],
        'PS18_Baked.001' : ['P5.4'],
        'PS19_Baked.001' : ['P5.5'],
        PS22_Baked : ['P5.6'],
        PS23_Baked : ['P5.7'],
        PS24_Baked : ['P5.8'],
        'PS25_Baked.001' : ['P5.9'],
        PS26_Baked : ['P5.10'],

        // ── P6 (set 6) ────────────────────────────────
        'PM5_Baked.001'  : ['P6.0'],
        'PS20_Baked.001' : ['P6.1'],
        'PS21_Baked.001' : ['P6.2'],


        // ── Project photos (PP) ───────────────────────
        PP1_Baked : ['PP1'],
        PP2_Baked : ['PP2'],
        PP3_Baked : ['PP3'],
        
        // ── PU set (newly added) ──────────────────────
        'PU1_Baked.001'  : ['PU1'],
        'PU2_Baked.001'  : ['PU2'],
        'PU3_Baked.001'  : ['PU3'],
        'PU4_Baked.001'  : ['PU4'],
        'PU5_Baked.001'  : ['PU5'],
        'PU6_Baked.001'  : ['PU6'],
        PU7_Baked : ['PU7'],
        PU8_Baked : ['PU8'],
        PU9_Baked : ['PU9'],
        'PU10_Baked.001' : ['PU10'],
        'PU11_Baked.001' : ['PU11']
    };

    // Create material sets for each unique material type
    Object.entries(uniqueMaterials).forEach(([name, ids]) => {
        const original = materials[name];
        if(materials[name] == null){
            //console.log("No material name found for: "+name);
            return;
        }
        ids.forEach(id => {
            sets[id] = {
                base:  original.clone(),
                pulse: original.clone(),
                hover: original.clone()
            };
            if(id.substring(0, 2) !== "PU") sets[id].hover.color = new THREE.Color(5, 5, 5);
           
        });
    });
    return sets;
};

const setComputer = (materials) => {
    let sets = {};
    let uniqueMaterials = {};
    uniqueMaterials = {
        'Computer_Screen_Baked.001': ['Computer_Screen_Baked'],
        "Computer_Base_Baked": ['Computer_Base_Baked'],
        Keyboard_Baked: ['Keyboard_Baked']
    };
    // Create material sets for each unique material type
    Object.entries(uniqueMaterials).forEach(([materialName, ids]) => {
        //const original = materials[materialName];
        ids.forEach(id => {
            sets[id] = {
                base:   materials[materialName].clone(),
                pulse:  materials[materialName].clone(),
                hover:  materials[materialName].clone(),
            };
            sets[id].hover.color = new THREE.Color(5, 5, 5);
        });
    });
    return sets;
};

export const getMaterial = ({...props}) => {
    const { progressRange, materialSet, pulseIntensity, hoveredMesh, progress, elementID } = props;
    const materials = materialSet[elementID];
    const [min, max] = progressRange;
    
    //Hex color
    const pulseHexColor = "#1e4d2b"

    if (!materials) {
        //console.warn(`No material found for elementID ${elementID}, using fallback.`);
        return new THREE.MeshBasicMaterial({ color: 0xff00ff });
    } else if (hoveredMesh === elementID) {
        return materials.hover;
    }
    else if (progress >= min && progress <= max) {
      const pulseColor =  1 + pulseIntensity * 5;
      //materials.pulse.color.setRGB(30, 77, 43);
     
      //materials.pulse.color.set(pulseColor);
       materials.pulse.color.setRGB(pulseColor, pulseColor, pulseColor);
      return materials.pulse;
    }
    return materials.base;
};
function hexToNormalizedRGB(hex) {
    const color = new THREE.Color(hex);
    return { r: color.r, g: color.g, b: color.b };
}
//export default materialEditor
