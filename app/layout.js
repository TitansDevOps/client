import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "next-themes";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Client",
  description: "Client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <main>
              {children}
          </main>
      </ThemeProvider>
      </body>
    </html>
  );
}
//SidebarTrigger es el boton que abre y cierra el sidebar
//ModeToggle es el boton para cambiar el tema de la pagina