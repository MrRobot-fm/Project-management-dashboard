-- CreateTable
CREATE TABLE "task_files" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT,
    "size" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_files" ADD CONSTRAINT "task_files_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
