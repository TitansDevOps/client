export const metadata = {
  title: 'Pets',
  description: 'Adopta tu mascota',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
