'use client';

import { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

export default function ShakaPlayerComponent({ manifestUri }: { manifestUri: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    shaka.polyfill.installAll();

    if (!shaka.Player.isBrowserSupported()) {
      console.error('Browser not supported by Shaka Player');
      return;
    }

    const player = new shaka.Player(videoRef.current);

    // DRM configuration (optional)
    player.configure({
      drm: {
        servers: {
          'com.widevine.alpha': 'https://license-server-url/widevine'
          // Replace with your actual license URL
        }
      }
    });

    // Event listeners for debugging/stats
    player.addEventListener('error', (event) => {
      console.error('Shaka ErrorEvent:', event);
    });

    player.addEventListener('buffering', (event) => {
      console.log('Buffering:', event.buffering);
    });

    player.addEventListener('adaptation', () => {
      const tracks = player.getVariantTracks();
      console.log('Adaptation occurred. Available tracks:', tracks);
    });

    player.load(manifestUri).catch((error) => {
      console.error('Shaka Load Error:', error);
    });

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
