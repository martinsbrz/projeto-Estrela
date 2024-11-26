import 'normalize.css';
import './ui/css/global.css';
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='layout'>
      <body className='body'>
        {children}
      </body>
    </html>
  );
}