import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { AudioListener, Audio, AudioLoader } from 'three';
import Bird from '../assets/musics/Ambience_Place_Forest_Birds_Loop.wav'

export default function Birds() {
  const listener = useRef(new AudioListener());
  const sound = useRef(new Audio(listener.current));

  useLayoutEffect(() => {
    const loader = new AudioLoader();
    loader.load(Bird, (buffer) => {
      sound.current.setBuffer(buffer);
      sound.current.setLoop(true);
      sound.current.setVolume(0.5);
      sound.current.play();
    });
  }, []);

  return null;
}