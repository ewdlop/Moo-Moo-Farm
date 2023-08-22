import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { AudioListener, Audio, AudioLoader } from 'three';
import WindSFX from '../assets/musics/Ambience_Wind_Intensity_Soft_With_Leaves_Loop.wav';

export default function Wind() {
  const listener = useRef(new AudioListener());
  const sound = useRef(new Audio(listener.current));

  useLayoutEffect(() => {
    const loader = new AudioLoader();
    loader.load(WindSFX, (buffer) => {
      sound.current.setBuffer(buffer);
      sound.current.setLoop(true);
      sound.current.setVolume(1);
      sound.current.play();
    });
  }, []);

  return null;
}