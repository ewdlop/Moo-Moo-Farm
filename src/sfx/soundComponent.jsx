import { useEffect, useRef } from 'react';
import { Audio, AudioListener, AudioLoader } from 'three';
import Cow from '../assets/musics/Cow_11.wav'

export default function SoundComponent() {
  const listenerRef = useRef(null);
  const soundRef = useRef(null);
  
  useEffect(() => {
    // Create an AudioListener and add it to the camera
    const listener = new AudioListener();
    listenerRef.current = listener;

    // Create the sound
    const sound = new Audio(listener);
    soundRef.current = sound;

    // Load the audio file
    const audioLoader = new AudioLoader();
    audioLoader.load(Cow, (buffer) => {
      sound.setBuffer(buffer);
    });

    // Random interval to play sound
    const playRandomSound = () => {
      const minDelay = 20000; // 20 seconds
      const maxDelay = 40000; // 40 seconds
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

      if (soundRef.current && soundRef.current.isPlaying) {
        soundRef.current.stop();
      }

      soundRef.current.play();
      
      setTimeout(playRandomSound, randomDelay);
    };

    playRandomSound();

    // Cleanup on unmount
    return () => {
      if (soundRef.current && soundRef.current.isPlaying) {
        soundRef.current.stop();
      }
    };
  }, []);

  return null;
}