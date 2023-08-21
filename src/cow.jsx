export const CowModel = ({ position = [0, 0, 0], ...props }) => {
  const { nodes, materials, animations } = useGLTF("/Cow.glb");
  
  useLayoutEffect(() => {
    console.log(animations);
    //this cow has no animations!?
  }, []);
  
  return (
    <group {...props} position={position} dispose={null}>
      <group scale={1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.cow}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.eye}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.nose}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_3.geometry}
          material={materials.weapon}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_4.geometry}
          material={materials.pink}
        />
      </group>
    </group>
  );
}
