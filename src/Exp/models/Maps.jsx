import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { convertMaterialsToMeshBasicMaterial } from '../utils/convertMaterial'
import { useGLTFWithKTX2 } from '../utils/useGLTFWithKTX2'
import { useModalStore } from '../stores/modalStore'
import { useMapControls } from '../stores/mapControlsStore'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ---------- constants --------------------------- */
const MAP_POS = new THREE.Vector3(-0, -0.46, 0)
const MAP_ROT = new THREE.Euler(Math.PI / 20, Math.PI / 1.0, 0)//y - 0.92
const PROG_DOWN = [0.01, 0.1363, 0.215, 0.252, 0.3318, 0.416]
const PROG_UP   = [0.465, 0.7923, 0.01]
const SLIDE_DIST = -2   // metres (-1 ⇒ “below camera”)
const OPEN_MS  = 100;   // pull-out 
const CLOSE_MS = 800;   // slide-back 


const WAYPOINTS_DOWN = [
  new THREE.Vector3(-0.09, -0.189, -0.29),
  new THREE.Vector3(-0.013, -0.139, -0.335),
  new THREE.Vector3( 0.102, -0.077, -0.41),
  new THREE.Vector3( 0.1, -0.016, -0.471),
  new THREE.Vector3( -.02, -0.03, -0.455),
  new THREE.Vector3( -.05,  0.008, -0.48),
]
const WAYPOINTS_UP = [
  new THREE.Vector3( 0.049, .01,    -0.488),
  new THREE.Vector3(-0.013, -0.118, -0.37),
  new THREE.Vector3(-0.09, -0.189, -0.29),
]


/* =============================================================== */
export default function Maps ({
  pos      = [0,0,0],
  rot      = new THREE.Euler(),
  visible  = false,
  onTeleport = () => {},
  ...props
})
{
  /* ---------- load & prepare ----------------------------------- */
  const { nodes, materials } = useGLTFWithKTX2('/GLBs/Maps/MapsT-v1.glb') || {}
  const ready = nodes && materials?.MapFF_Baked?.map
  useMemo(() => ready && convertMaterialsToMeshBasicMaterial(materials), [ready, materials])
  if (!ready) return null
  
  /* ---------- floor data --------------------------------------- */
  const floorData = useMemo(()=>({
    down:{ 
      geo:nodes.MapFF_Baked.geometry,
      mat:materials.MapFF_Baked,
      pts:WAYPOINTS_DOWN, 
      prg:PROG_DOWN 
    },
    up:{ 
      geo:nodes.MapSF_Baked.geometry,
      mat:materials.MapSF_Baked,
      pts:WAYPOINTS_UP,   
      prg:PROG_UP  
    },
  }),[nodes,materials])

  /* ---------- refs / state ------------------------------------- */
  const cardRef  = useRef()
  const pearlRef = useRef()
  const floorRef = useRef('down')       // mutable mirror
  const [floor, setFloor] = useState('down')

  const [waypoint, setWaypoint ]   = useState(0)
  const idxRef            = useRef(0)

  /* ---------- slide-in/out state ------------------------------- */
  const durMs    = useRef(OPEN_MS)
  const slideY   = useRef(SLIDE_DIST)      // current offset
  const targetY  = useRef(visible ? 0 : SLIDE_DIST)
  const {openMapModal, closeMapModal, checkForOpenModal} = useModalStore();

  useEffect(() => {
    if(!visible){
      closeMapModal();
      const {pendingModal, clearPending} = useModalStore.getState();
      if(pendingModal){
        checkForOpenModal(pendingModal.title, pendingModal.body, pendingModal.id);
        clearPending();
      }
    }
    else openMapModal();
  }, [visible, openMapModal, closeMapModal]);
  /* open / close trigger */
  useEffect(()=>{ 
    targetY.current = visible ? 0 : SLIDE_DIST
    durMs.current   = visible ? OPEN_MS : CLOSE_MS 
  },[visible])

  /* ---------- advance cursor ----------------------------------- */
  const advance = (dir)=>
    setWaypoint(old=>{
      const len = floorData[floorRef.current].pts.length
      const n   = (old + dir + len) % len
      idxRef.current = n
      return n
  });
  const handleTeleport = useCallback(() => {
    const {prg} = floorData[floorRef.current];
    onTeleport(prg[idxRef.current]);
  }, [onTeleport, floorData]);

  const toggleFloor = () =>
    setFloor(p=>{
      const newFloor = p==='down'?'up':'down'
      floorRef.current = newFloor
      idxRef.current = 0
      setWaypoint(0)
      return newFloor
  });
  useEffect(() => {
    useMapControls.getState().registerHandlers({
      advance,
      teleport: handleTeleport,
      toggleFloor,
    });}, [advance, handleTeleport, toggleFloor]);

  /* ---------- key-handling ------------------------------------- */
  useEffect(()=>{
    const h = e => {
      if(e.key==='d') advance(+1)
      else if(e.key==='a') advance(-1)

      else if(e.key==='e'){
        const {prg}=floorData[floorRef.current]
        onTeleport(prg[idxRef.current])
      }
      else if(e.key==='w'){               // toggle floor
        setFloor(p=>{
          const nxt = p==='down'?'up':'down'
          floorRef.current = nxt
          idxRef.current = 0
          setWaypoint(0)
          return nxt
        })
      }
    }
    window.addEventListener('keydown',h)
    return ()=>window.removeEventListener('keydown',h)
  },[onTeleport,floorData])

/* ---------- per-frame work ----------------------------------- */
  useFrame((state, delta) => {                 // ← 1️⃣ accept delta!
    if (!cardRef.current) return

    /* 1️⃣ slide Y toward target based on this frame’s delta */
    const durSec = durMs.current * 0.001       // ms → s
    const step   = Math.min(delta / durSec, 1) // 0‒1 just for this frame
    slideY.current = THREE.MathUtils.lerp(slideY.current, targetY.current, step)

    /* 2️⃣ stick card to the camera and offset it */
    const camPos = Array.isArray(pos) ? new THREE.Vector3().fromArray(pos) : pos.clone();// …or a Vector3
    cardRef.current.position.set(camPos.x, camPos.y + slideY.current, camPos.z);
    cardRef.current.rotation.copy(rot)

    /* 3️⃣ move the pearl cursor */
    if (pearlRef.current) {
      const { pts } = floorData[floorRef.current]
      pearlRef.current.position.lerp(pts[idxRef.current], 0.2)
    }
  })


  /* ---------- render ------------------------------------------- */
  const {geo,mat,pts} = floorData[floor]

  return (
    <group {...props}>
      <group ref={cardRef}>
        <mesh geometry={geo} material={mat} position={MAP_POS} rotation={MAP_ROT}/>
        <mesh ref={pearlRef} geometry={nodes.ender_pearl_Baked.geometry} material={materials['ender_pearl_Baked.001']} position={pts[0].toArray()} rotation={[0.75,-0.2,0.05]}/>
      </group>
    </group>
  )
}

/* re-export downstairs table for other modules */
export const WAYPOINT_PROGRESS  = PROG_DOWN
export const WAYPOINT_PROGRESS2 = PROG_UP
