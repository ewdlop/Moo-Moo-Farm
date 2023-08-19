import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CowModel } from './cow.jsx'
import { OrbitControls } from '@react-three/drei'
import FreeCamera from './camera.jsx'

createRoot(document.getElementById('root')).render(
  <Canvas style={{ width: '100%', height: '100vh' }}>
    <FreeCamera position={[0, 0, 3]} />
    <OrbitControls />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <CowModel/>
  </Canvas>,
)