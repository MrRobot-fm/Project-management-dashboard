"use client";

import { useMemo } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@workspace/ui/components/Card";
import { type ChartConfig, ChartContainer } from "@workspace/ui/components/Chart";
import { PATHS } from "@/constants/paths";
import type { Project } from "@/types/models/api-get-project-by-id";
import { ArrowRight } from "lucide-react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface CompletedTasksBlockProps {
  tasks: Project["tasks"];
}

export const CompletedTasksBlock = ({ tasks }: CompletedTasksBlockProps) => {
  const { id } = useParams<{ id: string }>();

  const { completedTasks, totalTasks, percentage, chartData } = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "DONE").length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completedTasks: completed,
      totalTasks: total,
      percentage,
      chartData: [
        {
          status: "completed",
          tasks: completed,
          fill: "var(--color-completed)",
        },
      ],
    };
  }, [tasks]);

  return (
    <div className="rounded-lg border border-neutral-200/70 shadow-neutral-100 shadow-md p-6 flex flex-col gap-4 h-full w-full">
      <div className="flex justify-between">
        <h2 className="font-medium text-md">Completed tasks</h2>
        <Link
          href={PATHS.PROJECT_TASKS(id) as Route}
          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-600 font-medium"
        >
          View all tasks
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <Card className="flex flex-col border-none shadow-none p-0">
        <CardContent className="flex-1 p-0">
          <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[400px] h-[350px]">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={90 + percentage * 3.6}
              innerRadius={120}
              outerRadius={160}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[131, 115]}
              />
              <RadialBar dataKey="tasks" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {completedTasks.toLocaleString()} of {totalTasks}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {completedTasks === 1 ? "Task completed" : "Tasks completed"}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
