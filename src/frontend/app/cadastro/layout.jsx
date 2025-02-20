export default function RootLayout({
  children,
}) {
  return (
    <html className="h-full w-full flex flex-col justify-center items-center">
      <body className="h-full w-full flex flex-col justify-center items-center">
        {children}
      </body>
    </html>
  );
}