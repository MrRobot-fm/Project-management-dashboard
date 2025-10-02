"use client";

import type { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@workspace/ui/components/Card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@workspace/ui/components/Chart";
import { PATHS } from "@/constants/paths";
import { ArrowRight } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

export const ProjectTaskSummaryBlock = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="rounded-lg border border-neutral-200/70 shadow-neutral-100 shadow-md p-6 flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-medium text-md">Tasks summary</h2>
        <Link
          href={PATHS.PROJECT_TASKS(id) as Route}
          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-600 font-medium"
        >
          View all tasks
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <Card className="flex flex-col gap-2 border-none shadow-none py-0">
        <CardContent className="flex-1 py-0 px-0 flex justify-center">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background min-h-[320px] w-fit"
          >
            <PieChart>
              <Pie data={chartData} dataKey="tasks">
                <LabelList
                  dataKey="tasks"
                  className="fill-background font-bold"
                  stroke="none"
                  fontSize={14}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="status" />} layout="vertical" />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const chartData = [
  { status: "todo", tasks: 15, fill: "var(--color-todo)" },
  { status: "in-progress", tasks: 8, fill: "var(--color-in-progress)" },
  { status: "done", tasks: 10, fill: "var(--color-done)" },
  { status: "blocked", tasks: 3, fill: "var(--color-blocked)" },
];

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  todo: {
    label: "Todo",
    color: "var(--chart-1)",
  },
  "in-progress": {
    label: "In Progress",
    color: "var(--chart-2)",
  },
  done: {
    label: "Done",
    color: "var(--chart-3)",
  },
  blocked: {
    label: "Blocked",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;
