import type { CSSProperties } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/Sidebar/Sidebar";
import data from "./data.json";
import { AppSidebar } from "@/components/AppSidebar";
import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import { DataTable } from "@/components/DataTable";
import { SectionCards } from "@/components/SectionCards";
import { SiteHeader } from "@/components/SiteHeader";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
