"use client";

import type { Route } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@workspace/ui/components/Card";
import { type ChartConfig, ChartContainer } from "@workspace/ui/components/Chart";
import { PATHS } from "@/constants/paths";
import { ArrowRight } from "lucide-react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

export const description = "A radial chart with text";

const completedTasks = 70;
const totalTasks = 286;
const percentage = Math.round((completedTasks / totalTasks) * 100);

const chartData = [{ browser: "safari", visitors: completedTasks, fill: "var(--color-safari)" }];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const CompletedTasksBlock = () => {
  const { id } = useParams<{ id: string }>();

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
              <RadialBar dataKey="visitors" background cornerRadius={10} />
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
                            {chartData?.[0]?.visitors.toLocaleString()} of {totalTasks}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Task completed
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
