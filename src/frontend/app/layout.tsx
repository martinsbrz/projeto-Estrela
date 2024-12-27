import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="page">
      <body>
        {children}
      </body>
    </html>
  );
}