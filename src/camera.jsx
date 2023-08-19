import React, { useRef, useLayoutEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const FreeCamera = (props) => {
    const cameraRef = useRef();
    const { set, size } = useThree();

    // State to store which keys are pressed
    const [keysPressed, setKeysPressed] = useState({});

    useLayoutEffect(() => {
        if (cameraRef.current) {
          cameraRef.current.aspect = size.width / size.height;
          cameraRef.current.updateProjectionMatrix();
          set({ camera: cameraRef.current });  // Set the camera after its ref is defined and updated
        }
    }, [size, props, set]);

    useLayoutEffect(() => {
      const handleKeyDown = (e) => {
          setKeysPressed(keys => ({ ...keys, [e.code]: true }));
      };
  
      const handleKeyUp = (e) => {
          setKeysPressed(keys => ({ ...keys, [e.code]: false }));
      };
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
  
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
      };
  }, []);
  
  useFrame(() => {
      const speed = 0.1; // Adjust speed as needed
  
      if (keysPressed['ArrowUp'] || keysPressed['KeyW']) {
        cameraRef.current.position.z -= speed;
      }
      if (keysPressed['ArrowDown'] || keysPressed['KeyS']) {
        cameraRef.current.position.z += speed;
      }
      if (keysPressed['ArrowLeft'] || keysPressed['KeyA']) {
        cameraRef.current.position.x -= speed;
      }
      if (keysPressed['ArrowRight'] || keysPressed['KeyD']) {
        cameraRef.current.position.x += speed;
      }
  });
  

    return <perspectiveCamera ref={cameraRef} {...props} />;
};

export default FreeCamera;
