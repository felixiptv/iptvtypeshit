'use client';

import { useState, useEffect } from 'react';
import ArtPlayerComponent from './components/ArtPlayerComponent';
import ShakaPlayerComponent from './components/ShakaPlayerComponent';

export default function Home() {
  const [playlistText, setPlaylistText] = useState('');
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const [useShaka, setUseShaka] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('playlistText');
    if (saved) setPlaylistText(saved);
  }, []);

  const parseM3U8 = (raw: string) => {
    const lines = raw.split('\n');
    const items = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF')) {
        const title = lines[i].split(',')[1] || `Channel ${i}`;
        const url = lines[i + 1];
        const logoMatch = lines[i].match(/tvg-logo="(.*?)"/);
        const logo = logoMatch ? logoMatch[1] : null;
        if (url && !url.startsWith('#')) {
          items.push({ title, url, logo });
        }
      }
    }
    setChannels(items);
    if (items[0]) setSelectedUrl(items[0].url);
  };

  const loadPlaylist = async () => {
    localStorage.setItem('playlistText', playlistText.trim());
    if (playlistText.trim().startsWith('http')) {
      try {
        const res = await fetch(playlistText.trim());
        const text = await res.text();
        parseM3U8(text);
      } catch {
        alert('Failed to fetch playlist');
      }
    } else {
      parseM3U8(playlistText);
    }
  };

  const filteredChannels = channels.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ padding: '2rem', background: '#111', minHeight: '100vh', color: '#fff' }}>
      <h1>📺 IPTV Web Player</h1>
      <textarea
        placeholder="Paste M3U8 playlist URL or content here"
        value={playlistText}
        onChange={(e) => setPlaylistText(e.target.value)}
        style={{ width: '100%', height: 120, background: '#222', color: '#fff', padding: 10 }}
      />
      <button onClick={loadPlaylist} style={{ padding: '0.5rem 1rem', marginTop: 10 }}>
        Load Playlist
      </button>

      {channels.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: 20, padding: '0.5rem', width: '100%', background: '#222', color: '#fff' }}
          />
          <select onChange={(e) => setSelectedUrl(e.target.value)} style={{ marginTop: 10, width: '100%' }}>
            {filteredChannels.map((c, i) => (
              <option key={i} value={c.url}>
                {c.title}
              </option>
            ))}
          </select>
        </>
      )}

    {selectedUrl && typeof selectedUrl === 'string' && selectedUrl.startsWith('http') && (
  <div style={{ marginTop: 30 }}>
    <label>
      <input
        type="checkbox"
        checked={useShaka}
        onChange={() => setUseShaka(!useShaka)}
        style={{ marginRight: 8 }}
      />
      Use Shaka (for DRM / .mpd)
    </label>

    {useShaka ? (
      <ShakaPlayerComponent manifestUri={selectedUrl} key={selectedUrl} />
    ) : (
      <ArtPlayerComponent url={selectedUrl} key={selectedUrl} />
    )}
  </div>
)}
    </main>
  );
}
