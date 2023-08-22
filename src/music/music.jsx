import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { AudioListener, Audio, AudioLoader } from 'three';
import BackgroundMusic from '../assets/musics/A_Day_In_The_Village_Loop_Layer_Classical_Guitar.wav';

export default function Music() {
  const listener = useRef(new AudioListener());
  const sound = useRef(new Audio(listener.current));

  useLayoutEffect(() => {
    const loader = new AudioLoader();
    loader.load(BackgroundMusic, (buffer) => {
      sound.current.setBuffer(buffer);
      sound.current.setLoop(true);
      sound.current.setVolume(1);
      sound.current.play();
    });
  }, []);

  return null;
}