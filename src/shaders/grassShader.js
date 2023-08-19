// grassShader.js
export const GrassVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const GrassFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  
  void main() {
    // Create a basic grassy color
    vec3 grassColor = vec3(0.1, 0.5, 0.1);
    
    // Add some variety based on uv coordinates
    grassColor += 0.1 * sin(vUv.y * 10.0 + time);
    
    gl_FragColor = vec4(grassColor, 1.0);
  }
`;
