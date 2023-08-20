import React, { useState, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function AmbientSounds() {
  const { camera } = useThree();
  const [loadedSounds, setLoadedSounds] = useState([]);

  const soundUrls = useMemo(() => [
    'path-to-your-ambient-sound1.wav',
    'path-to-your-ambient-sound2.wav',
    'path-to-your-ambient-sound3.wav',
    // ... add as many as you like
  ], []);

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const soundsToLoad = soundUrls.length;
    const tempSounds = [];

    soundUrls.forEach((url, index) => {
      audioLoader.load(url, (buffer) => {
        tempSounds[index] = buffer;

        if (tempSounds.length === soundsToLoad) {
          setLoadedSounds(tempSounds);
        }
      });
    });

    return () => {
      camera.remove(listener);
    }
  }, [camera, soundUrls]);

  function playRandomSound() {
    if (loadedSounds.length === 0) return;

    const sound = new THREE.Audio(camera.children[0]); // Assuming the listener is the first child of the camera
    const randomIndex = Math.floor(Math.random() * loadedSounds.length);
    sound.setBuffer(loadedSounds[randomIndex]);
    sound.play();
  }

  return null;
}
