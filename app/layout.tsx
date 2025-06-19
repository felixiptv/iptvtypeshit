export const metadata = {
  title: "IPTV Web Player",
  description: "Paste your M3U8 or DASH stream and play it in-browser."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', background: '#111', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}