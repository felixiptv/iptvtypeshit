'use client';
/// <reference path="../types/global.d.ts" />
import { useEffect, useRef } from 'react';
import 'shaka-player/dist/shaka-player.compiled.js';

export default function ShakaPlayerComponent({ manifestUri }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && window.shaka) {
      const player = new window.shaka.Player(videoRef.current);
      player.load(manifestUri).catch((err) => console.error('Shaka error', err));
    }
  }, [manifestUri]);

  return <video ref={videoRef} controls autoPlay style={{ width: '100%', height: 480 }} />;
}
