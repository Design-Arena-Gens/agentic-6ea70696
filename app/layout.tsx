import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iran GeoJSON Map',
  description: 'Interactive map of Iran with accurate geographical boundaries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
