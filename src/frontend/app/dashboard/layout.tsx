import '@/app/globals.css';
import NavBar from '../components/NavBar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='w-full h-full flex flex-col justify-center items-center relative'>
      <body className='w-full h-full flex flex-col justify-center items-center relative md:flex-row-reverse'>
        <div className='h-[88%] w-full flex flex-col justify-center items-center md:w-[90%] md:h-full'>
          {children}
        </div>
        <NavBar />
      </body>
    </html>
  );
}