export default function RootLayout({
  children,
}) {
  return (
    <html className="w-full h-full">
      <body className="w-full h-full">
        {children}
      </body>
    </html>
  );
}