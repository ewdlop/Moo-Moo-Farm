import React from 'react';
import { useLoader } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const Skybox = () => {
  const texture = useLoader(
    CubeTextureLoader,
    [
      '/images/Daylight_Box_Right.bmp',
      '/images/Daylight_Box_Left.bmp',
      '/images/Daylight_Box_Top.bmp',
      '/images/Daylight_Box_Bottom.bmp',
      '/images/Daylight_Box_Front.bmp',
      '/images/Daylight_Box_Back.bmp'
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
