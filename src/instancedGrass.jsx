import * as THREE from "three"
import React, { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import bladeDiffuse from "/images/blade_diffuse.jpg"
import bladeAlpha from "/images/blade_alpha.jpg"
import { extend } from '@react-three/fiber'
import { getYPositionSimplex2DNoise,multiplyQuaternions } from "./math"
import "./shaders/grassMaterial"

export const InstancedGrass = ({ options = { bW: 0.12, bH: 1, joints: 5 }, width = 100, instances = 100000, ...props }) => {
    const { bW, bH, joints } = options
    const materialRef = useRef()
    const [texture, alphaMap] = useLoader(THREE.TextureLoader, [bladeDiffuse, bladeAlpha])
    const attributeData = useMemo(() => getAttributeData(instances, width), [instances, width])
    const baseGeom = useMemo(() => new THREE.BufferGeometry(bW, bH, 1, joints).translate(0, bH / 2, 0), [options])
    const groundGeo = useMemo(() => {
      const plane = new THREE.PlaneGeometry(width, width, 32, 32)
  
      const positions = plane.attributes.position.array
  
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(0), 3)) // Copy the positions array
  
      for (let i = 0; i < 4; i++) {
        const v = new THREE.Vector3(positions[i * 3 + 0], positions[i * 3 + 1], positions[i * 3 + 2])
  
        v.y = getYPositionSimplex2DNoise(v.x, v.z)
  
        geo.getAttribute("position").setXYZ(i, v.x, v.y, v.z)
      }
      geo.computeVertexNormals()
      return geo
    }, [width])
    useFrame((state) => (materialRef.current.uniforms.time.value = state.clock.elapsedTime / 4))
    return (
      <group {...props}>
        <mesh>
          <instancedBufferGeometry index={baseGeom.index} attributes-position={baseGeom.attributes.position} attributes-uv={baseGeom.attributes.uv}>
            <instancedBufferAttribute attach="attributes-offset" args={[new Float32Array(attributeData.offsets), 3]} />
            <instancedBufferAttribute attach="attributes-orientation" args={[new Float32Array(attributeData.orientations), 4]} />
            <instancedBufferAttribute attach="attributes-stretch" args={[new Float32Array(attributeData.stretches), 1]} />
            <instancedBufferAttribute attach="attributes-halfRootAngleSin" args={[new Float32Array(attributeData.halfRootAngleSin), 1]} />
            <instancedBufferAttribute attach="attributes-halfRootAngleCos" args={[new Float32Array(attributeData.halfRootAngleCos), 1]} />
          </instancedBufferGeometry>
          <grassMaterial ref={materialRef} map={texture} alphaMap={alphaMap} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0]} geometry={groundGeo}>
          <meshStandardMaterial color="#000f00" />
        </mesh>
      </group>
    )
}
extend({ InstancedGrass });

export function getAttributeData(instances, width) {
    const offsets = []
    const orientations = []
    const stretches = []
    const halfRootAngleSin = []
    const halfRootAngleCos = []
  
    let quaternion_0 = new THREE.Vector4()
    let quaternion_1 = new THREE.Vector4()
  
    //The min and max angle for the growth direction (in radians)
    const min = -0.25
    const max = 0.25
  
    //For each instance of the grass blade
    for (let i = 0; i < instances; i++) {
      //Offset of the roots
      const offsetX = Math.random() * width - width / 2
      const offsetZ = Math.random() * width - width / 2
      const offsetY = getYPositionSimplex2DNoise(offsetX, offsetZ)
      offsets.push(offsetX, offsetY, offsetZ)
  
      //Define random growth directions
      //Rotate around Y
      let angle = Math.PI - Math.random() * (2 * Math.PI)
      halfRootAngleSin.push(Math.sin(0.5 * angle))
      halfRootAngleCos.push(Math.cos(0.5 * angle))
  
      let RotationAxis = new THREE.Vector3(0, 1, 0)
      let x = RotationAxis.x * Math.sin(angle / 2.0)
      let y = RotationAxis.y * Math.sin(angle / 2.0)
      let z = RotationAxis.z * Math.sin(angle / 2.0)
      let w = Math.cos(angle / 2.0)
      quaternion_0.set(x, y, z, w).normalize()
  
      //Rotate around X
      angle = Math.random() * (max - min) + min
      RotationAxis = new THREE.Vector3(1, 0, 0)
      x = RotationAxis.x * Math.sin(angle / 2.0)
      y = RotationAxis.y * Math.sin(angle / 2.0)
      z = RotationAxis.z * Math.sin(angle / 2.0)
      w = Math.cos(angle / 2.0)
      quaternion_1.set(x, y, z, w).normalize()
  
      //Combine rotations to a single quaternion
      quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)
  
      //Rotate around Z
      angle = Math.random() * (max - min) + min
      RotationAxis = new THREE.Vector3(0, 0, 1)
      x = RotationAxis.x * Math.sin(angle / 2.0)
      y = RotationAxis.y * Math.sin(angle / 2.0)
      z = RotationAxis.z * Math.sin(angle / 2.0)
      w = Math.cos(angle / 2.0)
      quaternion_1.set(x, y, z, w).normalize()
  
      //Combine rotations to a single quaternion
      quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)
  
      orientations.push(quaternion_0.x, quaternion_0.y, quaternion_0.z, quaternion_0.w)
  
      //Define variety in height
      if (i < instances / 3) {
        stretches.push(Math.random() * 1.8)
      } else {
        stretches.push(Math.random())
      }
    }
  
    return {
      offsets,
      orientations,
      stretches,
      halfRootAngleCos,
      halfRootAngleSin,
    }
  }