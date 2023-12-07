import { createRoot } from 'react-dom/client'
import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { CowModel } from './cow.jsx'
import { OrbitControls, Stage } from '@react-three/drei'
import FreeCamera from './camera.jsx'
import Grass from  './instancedGrass2.jsx'
import Music from './music/music.jsx'
import Birds from './sfx/birds.jsx'
import Wind from './sfx/wind.jsx'
import Skybox from './skybox.jsx'
import SoundComponent from './sfx/soundComponent.jsx'
import Rain from './rainBulk.jsx'
import { useControls } from 'leva'

export default function App() {

  const options = useMemo(() => {
    return {
      x: { value: 1000, min: 10, max: 5000, step: 10 },
      visible: true,
      color: { value: 'lime' },
    }
  }, [])

  const rdc = useControls('Rain Drop Count', options)

  return (
    <Canvas shadows style={{ width: '100%', height: '100vh' }}>
      <Music/>
      <Birds/>
      <Wind/>
      <SoundComponent/>
      <Rain count={rdc.x}/>
      <FreeCamera position={[0, 0.1, 0.25]}/>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Stage>
          {/* <CowModel/>
          <CowModel position={[1,0,1]}/> */}
          <Grass/>
        </Stage>
      </Suspense>
      <Skybox/>
    </Canvas>
  ) 
}