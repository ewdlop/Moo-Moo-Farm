import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GrassVertexShader, GrassFragmentShader } from './shaders/grassShader';
import * as THREE from 'three';

function GrassMaterial() {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      attach="material"
      ref={materialRef}
      vertexShader={GrassVertexShader}
      fragmentShader={GrassFragmentShader}
      uniforms={{
        time: { value: 0 },
      }}
      side={THREE.DoubleSide}
    />
  );
}

const Field = ({ rotationX = 0, rotationY = 0, rotationZ = 0 }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotationX;
      meshRef.current.rotation.y = rotationY;
      meshRef.current.rotation.z = rotationZ;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <GrassMaterial />
    </mesh>
  );
};

export default Field;
