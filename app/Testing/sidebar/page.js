"use client";

import localFont from "next/font/local";
import "../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "@/app/components/mode-toogle";

const geistSans = localFont({
    src: "../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function SidebarPage() {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        <ModeToggle />
                    </main>
                </SidebarProvider>
            </ThemeProvider>
        </div>
    );
}
