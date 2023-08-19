import React, { useRef, useLayoutEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const FreeCamera = (props) => {
 
    const cameraRef = useRef();
    const set = useThree(({ set }) => set)
    const size = useThree(({ size }) => size)
    
    useLayoutEffect(() => {
        if (cameraRef.current) {
          cameraRef.current.aspect = size.width / size.height
          cameraRef.current.updateProjectionMatrix()
        }
    }, [size, props])
    
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
        set({ camera: cameraRef.current })
    }, [])
 

  // State to store which keys are pressed
  const [keysPressed, setKeysPressed] = useState({});

  useFrame(() => {
    const speed = 0.1; // Adjust speed as needed

    if (keysPressed['ArrowUp']) {
      cameraRef.current.position.z -= speed;
    }
    if (keysPressed['ArrowDown']) {
      cameraRef.current.position.z += speed;
    }
    if (keysPressed['ArrowLeft']) {
      cameraRef.current.position.x -= speed;
    }
    if (keysPressed['ArrowRight']) {
      cameraRef.current.position.x += speed;
    }
  });

  return <perspectiveCamera ref={cameraRef} {...props} />;
};

export default FreeCamera;
