import React, { useRef, useLayoutEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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
    const speed = 0.3;

    const forwardDirection = new THREE.Vector3();
    const rightDirection = new THREE.Vector3();

    cameraRef.current.getWorldDirection(forwardDirection);
    forwardDirection.y = 0;  // Force the y component to be zero
    forwardDirection.normalize();  // Re-normalize after modifying

    rightDirection.crossVectors(forwardDirection, new THREE.Vector3(0, 1, 0)).normalize();

    if (keysPressed['ArrowUp'] || keysPressed['KeyW']) {
        cameraRef.current.position.addScaledVector(forwardDirection, speed); // Move forward
    }
    if (keysPressed['ArrowDown'] || keysPressed['KeyS']) {
        cameraRef.current.position.addScaledVector(forwardDirection, -speed); // Move backward
    }
    if (keysPressed['ArrowLeft'] || keysPressed['KeyA']) {
        cameraRef.current.position.addScaledVector(rightDirection, -speed); // Move left
    }
    if (keysPressed['ArrowRight'] || keysPressed['KeyD']) {
        cameraRef.current.position.addScaledVector(rightDirection, speed); // Move right
    }
});
  

    return <perspectiveCamera ref={cameraRef} {...props} fov={100} />;
};

export default FreeCamera;
