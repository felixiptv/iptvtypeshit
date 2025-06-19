'use client';

import { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

export default function ShakaPlayerComponent({ manifestUri }: { manifestUri: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Ensure the player initializes after DOM is ready
    if (!videoRef.current) return;

    // Install polyfills
    shaka.polyfill.installAll();

    // Check if the browser supports Shaka Player
    if (!shaka.Player.isBrowserSupported()) {
      console.error('Browser not supported by Shaka Player');
      return;
    }

    const player = new shaka.Player(videoRef.current);

    player.addEventListener('error', onErrorEvent);

    // Load the manifest URI
    player.load(manifestUri).catch(onError);

    function onErrorEvent(event: any) {
      console.error('Shaka ErrorEvent:', event);
    }

    function onError(error: any) {
      console.error('Shaka Error:', error);
    }

    // Cleanup on component unmount
    return () => {
      player.destroy().catch((e) => console.warn('Failed to destroy Shaka Player:', e));
    };
  }, [manifestUri]);

  return (
    <video
      ref={videoRef}
      style={{ width: '100%', height: 'auto', backgroundColor: '#000' }}
      controls
      autoPlay
    />
  );
}
