'use client';
import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

export default function ArtPlayerComponent({ url }) {
  const artRef = useRef(null);

  useEffect(() => {
    if (artRef.current && url) {
      const art = new Artplayer({
        container: artRef.current,
        url,
        isLive: true,
        muted: true,
        autoplay: true,
        setting: true,
        fullscreen: true,
      });
      return () => art.destroy();
    }
  }, [url]);

  return <div ref={artRef} style={{ width: '100%', height: 480 }} />;
}