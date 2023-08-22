import { createRoot } from 'react-dom/client'
import React, { useRef, useState,Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CowModel } from './cow.jsx'
import { OrbitControls, CameraShake, Stage } from '@react-three/drei'
import FreeCamera from './camera.jsx'
import Grass from  './instancedGrass2.jsx'
import Music from './music/music.jsx'
import Birds from './sfx/birds.jsx'
import Wind from './sfx/wind.jsx'
import SoundComponent from './sfx/soundComponent.jsx'

createRoot(document.getElementById('root')).render(
  <Canvas shadows style={{ width: '100%', height: '100vh' }}>
    {/* <Skybox/> */}
    <Music/>
    <Birds/>
    <Wind/>
    <SoundComponent/>
    <FreeCamera position={[0, 1, 2]} />
    <OrbitControls />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={null}>
      <Stage>
        <CowModel/>
        <CowModel position={[1,0,1]}/>
        <Grass/>
      </Stage>
    </Suspense>
    {/* <CameraShake
        maxYaw={0.1} // Max amount camera can yaw in either direction
        maxPitch={0.1} // Max amount camera can pitch in either direction
        maxRoll={0.1} // Max amount camera can roll in either direction
        yawFrequency={0.1} // Frequency of the the yaw rotation
        pitchFrequency={0.1} // Frequency of the pitch rotation
        rollFrequency={0.1} // Frequency of the roll rotation
        intensity={1} // initial intensity of the shake
        decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
      /> */}
  </Canvas>,
)