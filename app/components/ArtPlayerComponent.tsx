'use client';

import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

export default function ArtPlayerComponent({ url }: { url: string }) {
  const artRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!artRef.current) return;

    // Destroy previous instance if it exists
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    // Initialize new ArtPlayer instance
    playerRef.current = new Artplayer({
      container: artRef.current,
      url: url,
      autoplay: true,
      theme: '#23ade5',
      fullscreen: true,
      setting: true,
      playbackRate: true,
      volume: 1,
      isLive: true,
      muted: false,
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [url]);

  return <div ref={artRef} style={{ width: '100%', height: '500px' }} />;
}
