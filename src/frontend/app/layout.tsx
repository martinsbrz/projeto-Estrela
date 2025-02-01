import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='w-full h-full flex flex-col justify-center items-center relative'>
      <body className='w-full h-full flex flex-col justify-center items-center relative'>
        {children}
      </body>
    </html>
  );
}