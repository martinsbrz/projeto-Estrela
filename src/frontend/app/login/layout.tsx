export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="page">
      <body>
        {children}
      </body>
    </html>
  )
}
