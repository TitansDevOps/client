import "./globals.css";
import {ThemeProvider} from "next-themes";

export const metadata = {
  title: "Pets",
  description: "Adopta tu mascota",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
