'use client';

import { useEffect, useRef } from 'react';

export default function ShakaPlayerComponent({ manifestUri }: { manifestUri: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Dynamic require to avoid TypeScript errors
    const shaka = require('shaka-player');

    function initPlayer() {
      if (!videoRef.current || !shaka) return;

      const player = new shaka.Player(videoRef.current);

      // Listen for error events.
      player.addEventListener('error', (e: any) => {
        console.error('Shaka Player Error', e.detail);
      });

      player.load(manifestUri).catch((e: any) => {
        console.error('Shaka Load Error', e);
      });

      // Optional: attach for debugging
      (window as any).shaka = shaka;
      (window as any).player = player;
    }

    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      initPlayer();
    } else {
      console.error('Browser not supported!');
    }
  }, [manifestUri]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      style={{ width: '100%', maxHeight: '70vh', backgroundColor: 'black' }}
    />
  );
}
