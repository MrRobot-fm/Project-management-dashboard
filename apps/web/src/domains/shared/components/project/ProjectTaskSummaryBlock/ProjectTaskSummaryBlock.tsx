"use client";

import { useMemo } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@workspace/ui/components/Card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@workspace/ui/components/Chart";
import { LinkLoadingIndicator } from "@/domains/shared/components/LinkLoadingIndicator";
import { PATHS } from "@/domains/shared/constants/paths";
import type { Project } from "@/types/models/api-get-project-by-id";
import { ArrowRight } from "lucide-react";
import { Pie, PieChart } from "recharts";

interface ProjectTaskSummeryBlock {
  tasks: Project["tasks"];
}

export const ProjectTaskSummaryBlock = ({ tasks }: ProjectTaskSummeryBlock) => {
  const { id } = useParams<{ id: string }>();

  const pieChartData = useMemo(() => {
    const grouped = Object.groupBy(tasks, task =>
      task.status.toLowerCase().replace("_", "-")
    );

    return Object.entries(grouped).map(([status, tasks]) => ({
      status,
      tasks: tasks?.length,
      fill: chartConfig[status as keyof typeof chartConfig]?.color ?? "#ccc"
    }));
  }, [tasks]);

  return (
    <div className="rounded-lg border border-neutral-200/70 shadow-neutral-100 shadow-md p-6 flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-medium text-md">Tasks summary</h2>
        <Link
          href={PATHS.PROJECT_TASKS(id) as Route}
          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-600 font-medium"
        >
          View all tasks
          <LinkLoadingIndicator className="text-neutral-500 size-3.5">
            <ArrowRight className="size-3.5" />
          </LinkLoadingIndicator>
        </Link>
      </div>
      <Card className="flex flex-col gap-2 border-none shadow-none py-0 h-full">
        <CardContent className="flex-1 py-0 px-0 flex justify-center items-center">
          {tasks.length > 0 ? (
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-text]:fill-background min-h-[320px] w-fit"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={pieChartData} dataKey="tasks" nameKey="status" />
                <ChartLegend
                  content={<ChartLegendContent nameKey="status" />}
                  layout="vertical"
                />
              </PieChart>
            </ChartContainer>
          ) : (
            <Link
              href={PATHS.PROJECT_TASKS(id) as Route}
              className="text-sm text-neutral-600 underline"
            >
              No tasks available, create a new task to get started!
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "#ccc"
  },
  todo: {
    label: "Todo",
    color: "var(--chart-1)"
  },
  "in-progress": {
    label: "In Progress",
    color: "var(--chart-2)"
  },
  done: {
    label: "Done",
    color: "var(--chart-3)"
  },
  blocked: {
    label: "Blocked",
    color: "var(--chart-4)"
  },
  "no-data": {
    label: "No tasks available",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig;
