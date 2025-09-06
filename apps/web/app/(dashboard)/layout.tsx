import { type CSSProperties, type ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/Sidebar";
import "@workspace/ui/globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
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
        <SidebarProvider
          defaultOpen={false}
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 14)",
            } as CSSProperties
          }
        >
          <AppSidebar
            userId={user?.id}
            workspaces={workspaces}
            projects={projects}
            currentWorkspaceId={currentWorkspaceId}
            variant="floating"
          />
          <SidebarInset>
            <SiteHeader user={user} />
            <main className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 py-10 h-full">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
