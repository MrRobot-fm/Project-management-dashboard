import { type CSSProperties, type ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/Sidebar";
import "@workspace/ui/globals.css";
import { QueryProviders } from "../providers";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getAppLayout } from "@/services/get-app-layout";

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
  const { user, workspaces, projects, currentWorkspaceId } = await getAppLayout();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <QueryProviders>
          <ThemeProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as CSSProperties
              }
            >
              <AppSidebar
                userId={user.id}
                workspaces={workspaces}
                projects={projects}
                currentWorkspaceId={currentWorkspaceId}
                variant="floating"
              />
              <SidebarInset>
                <SiteHeader
                  user={{
                    name: user.name,
                    logo: user.logo,
                    email: user.email,
                  }}
                />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
