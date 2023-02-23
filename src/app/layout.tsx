import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en"
      className='bg-zinc-900 text-white'
    >
      <head>
        <link rel='icon' href='/favicon.ico' />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}
