import React, { useRef, useMemo } from 'react';
import { useFrame} from '@react-three/fiber';
import { MeshBasicMaterial, Vector3, CylinderGeometry,Matrix4 } from 'three';

// Individual Raindrop
const RainDrop = ({ count }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new Vector3(), []);
  const matrix = new Matrix4();

  const geometries = new CylinderGeometry(0.01, 0.01, 1, 4);
  
  // Set the raindrop material to be blue and half transparent
  const material = new MeshBasicMaterial({ color: "blue", transparent: true, opacity: 0.5 });

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        Math.random() * 100 - 50,
        Math.random() * 800 + 100,
        Math.random() * 100 - 50
      ]);
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        positions[i][1] -= 1;

        if (positions[i][1] < -200) {
          positions[i][1] = 300;
        }
        
        dummy.set(...positions[i]);
        matrix.makeTranslation(dummy.x, dummy.y, dummy.z);  // Use makeTranslation on matrix instance
        mesh.current.setMatrixAt(i, matrix);  // Set the matrix for the instance
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[geometries, material, count]}>
      <cylinderGeometry args={[0.01, 0.01, 1, 4]} />
    </instancedMesh>
  );
};

const Rain = ({ count = 500 }) => {
  return <RainDrop count={count} />;
};

export default Rain;
