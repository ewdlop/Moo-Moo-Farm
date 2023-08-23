import React from 'react';
import { useLoader } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

// Importing the images
import rightTexture from './images/Daylight_Box_Right.bmp';
import leftTexture from './images/Daylight_Box_Left.bmp';
import topTexture from './images/Daylight_Box_Top.bmp';
import bottomTexture from './images/Daylight_Box_Bottom.bmp';
import frontTexture from './images/Daylight_Box_Front.bmp';
import backTexture from './images/Daylight_Box_Back.bmp';

const Skybox = () => {
  const texture = useLoader(
    CubeTextureLoader,
    [
      rightTexture,
      leftTexture,
      topTexture,
      bottomTexture,
      frontTexture,
      backTexture
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
