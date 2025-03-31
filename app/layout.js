import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Pets",
  description: "Adopta tu mascota",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
