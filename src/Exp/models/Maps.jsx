import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { useModalStore } from '../stores/modalStore'
import { useMapControls } from '../stores/mapControlsStore'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

//Rotation and Position offset from user POV
const MAP_ROT = new THREE.Euler(Math.PI / 20, Math.PI / 1.0, 0)
const MAP_POS = new THREE.Vector3(-0, -0.46, 0)

//Waypoint progress points for downstairs and upstairs Maps
const PRG_PTS_D = [0.01, 0.1363, 0.215, 0.252, 0.3318, 0.416]
const PRG_PTS_U = [0.465, 0.7923, 0.876]

//Control variables for map open/close animation
const HIDDEN_Y_POS = -2 //When closed, the map is 2 units below user POV
const OPEN_TIME = 100;
const CLOSE_TIME = 800;

//XZY positions for the cursor on the maps
const WAYPOINTS_DOWN = [
  new THREE.Vector3(-0.09, -0.189, -0.29),
  new THREE.Vector3(-0.013, -0.139, -0.335),
  new THREE.Vector3( 0.102, -0.077, -0.41),
  new THREE.Vector3( 0.095,  -.002, -0.46),
  new THREE.Vector3( -.02, -0.03, -0.455),
  new THREE.Vector3( -.05,  0.008, -0.48),
]
const WAYPOINTS_UP = [
  new THREE.Vector3( 0.049, .01,    -0.488),
  new THREE.Vector3(-0.013, -0.118, -0.37),
  new THREE.Vector3(-0.09, -0.189, -0.29),
]


export default function Maps ({ pos = [0,0,0], rot = new THREE.Euler(), visible = false, onTeleport = () => {}, ...props}){
  //Load maps & ender pearl meshes/materials
  const { nodes, materials } = useGLTFWithKTX2('/GLBs/Maps/MapsT-v1.glb') || {};
  const ready = nodes && materials?.MapFF_Baked?.map
  useMemo(() => ready && convertMaterialsToMeshBasicMaterial(materials), [ready, materials])
  if (!ready) return null
  
  /* ---------- Map property data --------------------------------------- */
  const mapData = useMemo(()=>({
    down:{ 
      geo:nodes.MapFF_Baked.geometry,
      mat:materials.MapFF_Baked,
      wpts:WAYPOINTS_DOWN, 
      prg:PRG_PTS_D 
    },
    up:{ 
      geo:nodes.MapSF_Baked.geometry,
      mat:materials.MapSF_Baked,
      wpts:WAYPOINTS_UP,   
      prg:PRG_PTS_U  
    },
  }),[nodes,materials])

  const {openMapModal, closeMapModal, checkForOpenModal} = useModalStore();
  const mapYPos = useRef(visible ? 0 : HIDDEN_Y_POS);
  const [waypoint, setWaypoint ] = useState(0);
  const [floor, setFloor] = useState('down');//Toggles between downstairs and upstairs floor
  const mapAnimDuration = useRef(OPEN_TIME);
  const moveYPos = useRef(HIDDEN_Y_POS); // current offset
  const floorRef = useRef('down');
  const waypointRef = useRef(0);
  const pearlRef = useRef();
  const mapRef = useRef();
  
  useEffect(() => {
    if(!visible) {
      closeMapModal();
      const {pendingModal, clearPending} = useModalStore.getState();
      if(pendingModal) {
        checkForOpenModal(pendingModal.title, pendingModal.body, pendingModal.id);
        clearPending();
      }
    }
    else openMapModal();
  }, [visible, openMapModal, closeMapModal]);

  //Open & Close animation trigger
  useEffect(()=>{ 
    mapYPos.current = visible ? 0 : HIDDEN_Y_POS
    mapAnimDuration.current = visible ? OPEN_TIME : CLOSE_TIME 
  },[visible])

  //Moves ender pearl cursor forward or backwards on the map
  const moveCursor = (dir) => 
    setWaypoint(prev => {
      const len = mapData[floorRef.current].wpts.length
      const next = (prev + dir + len) % len
      waypointRef.current = next
      return next
  });

  //Takes the progress array prop from the map data obj and access an index from the array
  const handleTeleport = useCallback(() => {
    const {prg} = mapData[floorRef.current];
    onTeleport(prg[waypointRef.current]);
  }, [onTeleport, mapData]);

  //Toggles between the downstairs and upstairs map
  const toggleFloor = () =>
    setFloor(p => {
      const newFloor = p === 'down' ? 'up' : 'down'
      floorRef.current = newFloor
      waypointRef.current = 0
      setWaypoint(0)
      return newFloor
  });

  //Retrieves the states of the map control props when any change
  useEffect(() => {
    useMapControls.getState().registerHandlers({
      moveCursor,
      teleport: handleTeleport,
      toggleFloor,
    });
  }, [moveCursor, handleTeleport, toggleFloor]);

  //Desktop ~ Keyboard controls 
  useEffect(() => {
    const click = e => {
      if(e.key === 'd') moveCursor(+1)//Moves Cursor Forward
      else if(e.key === 'a') moveCursor(-1)//Moves Cursor Backward
      else if(e.key === 'e') handleTeleport();//Teleports user to waypoint
      else if(e.key==='w') toggleFloor();//Toggles map floor level
    }
    window.addEventListener('keydown', click)
    return () => window.removeEventListener('keydown', click)
  },[onTeleport,mapData])

//Frame work for map open/close animation and moving ender pearl cursor
  useFrame((state, delta) => {
    if (!mapRef.current) return;

    // Move upwards to user POV based on this frame’s delta 
    const duration = mapAnimDuration.current * 0.001;
    const step = Math.min(delta/duration, 1); // 0‒1 just for this frame
    moveYPos.current = THREE.MathUtils.lerp(moveYPos.current, mapYPos.current, step);

    //Get the users POV and set the map to the same position + Y offset
    const userPosition = Array.isArray(pos) ? new THREE.Vector3().fromArray(pos) : pos.clone();
    mapRef.current.position.set(userPosition.x, userPosition.y + moveYPos.current, userPosition.z);
    mapRef.current.rotation.copy(rot)

    // Moving the pearl cursor by frame
    if (pearlRef.current) {
      const { wpts } = mapData[floorRef.current]
      pearlRef.current.position.lerp(wpts[waypointRef.current], 0.2)
    }
  })


  /* ---------- render ------------------------------------------- */
  const {geo, mat, wpts} = mapData[floor]

  return (
    <group {...props}>
      <group ref={mapRef}>
        <mesh geometry={geo} material={mat} position={MAP_POS} rotation={MAP_ROT}/>
        <mesh ref={pearlRef} geometry={nodes.ender_pearl_Baked.geometry} material={materials['ender_pearl_Baked.001']} position={wpts[0].toArray()} rotation={[0.75,-0.2,0.05]}/>
      </group>
    </group>
  )
}

//Export downstairs & upstairs waypoint progress values to Exp.jsx for teleport(prg)
export const WPT_PRG_DOWN  = PRG_PTS_D
export const WPT_PRG_UP = PRG_PTS_U
