import '@/app/globals.css';
import NavBar from '../components/NavBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='w-full h-full flex flex-col justify-center items-center relative'>
      <body className='w-full h-full flex flex-col justify-center items-center relative md:flex-row-reverse'>
        <div className='h-full w-full flex flex-col justify-center items-center md:w-[90%]'>
          {children}
        </div>
        <NavBar />
      </body>
    </html>
  );
}