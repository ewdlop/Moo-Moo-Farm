import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise';

export function multiplyQuaternions(q1, q2) {
    const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
    const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y
    const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z
    const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
    return new THREE.Vector4(x, y, z, w)
}

export function getYPositionSimplex2DNoise(x, z) {
    const noise2D = createNoise2D();
    var y = 2 * noise2D(x / 50, z / 50)
    y += 4 * noise2D(x / 100, z / 100)
    y += 0.2 * noise2D(x / 10, z / 10)
    return y
}
