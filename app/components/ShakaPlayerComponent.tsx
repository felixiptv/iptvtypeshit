'use client';
import { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

export default function ShakaPlayerComponent({ manifestUri }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = new shaka.Player(videoRef.current);
    player.load(manifestUri).catch(err => console.error(err));
  }, [manifestUri]);

  return <video ref={videoRef} controls autoPlay style={{ width: '100%', height: 480 }} />;
}