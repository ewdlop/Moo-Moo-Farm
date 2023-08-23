import React from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

// Importing the images
import rightTexture from './images/Epic_BlueSunset_Cam_3_Right-X.png';
import leftTexture from './images/Epic_BlueSunset_Cam_2_Left+X.png';
import topTexture from './images/Epic_BlueSunset_Cam_4_Up+Y.png';
import bottomTexture from './images/Epic_BlueSunset_Cam_5_Down-Y.png';
import frontTexture from './images/Epic_BlueSunset_Cam_0_Front+Z.png';
import backTexture from './images/Epic_BlueSunset_Cam_1_Back-Z.png';

const Skybox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load(
    [
      frontTexture,
      backTexture,
      topTexture,
      bottomTexture,
      rightTexture,
      leftTexture
    ]
  );

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  //scene.environment = texture;
  return null;
};

export default Skybox;
