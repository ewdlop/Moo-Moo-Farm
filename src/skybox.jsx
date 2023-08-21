import React from 'react';
import { useLoader } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const Skybox = () => {
  const texture = useLoader(
    CubeTextureLoader,
    [
      '/path_to_images/px.jpg',
      '/path_to_images/nx.jpg',
      '/path_to_images/py.jpg',
      '/path_to_images/ny.jpg',
      '/path_to_images/pz.jpg',
      '/path_to_images/nz.jpg'
    ]
  );

  return (
    <mesh>
      <boxGeometry args={[1000, 1000, 1000]} />
      <meshBasicMaterial 
        attach="material"
        envMap={texture}
        side={3} // This ensures the inside of the box is visible
      />
    </mesh>
  );
};

export default Skybox;
