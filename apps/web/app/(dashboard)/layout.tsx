import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/Sidebar";
import "@workspace/ui/globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getCurrentUser } from "@/services/get-current-user";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Project management dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const data = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as CSSProperties
            }
          >
            <AppSidebar variant="floating" />
            <SidebarInset>
              <SiteHeader
                user={{
                  name: data.user.name,
                  avatar: "https://github.com/shadcn.png",
                  email: data.user.email,
                }}
              />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
