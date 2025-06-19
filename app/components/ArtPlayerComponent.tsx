import Artplayer from 'artplayer';

export default function ArtPlayerComponent({ url }: { url: string }) {
  const artRef = useRef(null);

  useEffect(() => {
    const art = new Artplayer({
      container: artRef.current,
      url,
      type: 'm3u8',
      autoplay: true,
      isLive: true,
      muted: true,
      setting: true,
      fullscreen: true,
      playsInline: true,
      customType: {
        m3u8: (video, url) => {
          if (Hls.isSupported()) {
            const hls = new Hls({
              xhrSetup: function (xhr) {
                xhr.withCredentials = false;
              },
            });
            hls.loadSource(url);
            hls.attachMedia(video);
          } else {
            video.src = url;
          }
        },
      },
    });

    return () => {
      art.destroy();
    };
  }, [url]);

  return <div ref={artRef} style={{ width: '100%', height: '60vh' }} />;
}
