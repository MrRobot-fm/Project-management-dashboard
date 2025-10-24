/*
  Warnings:

  - You are about to drop the column `mimeType` on the `task_files` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `task_files` table. All the data in the column will be lost.
  - Added the required column `name` to the `task_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_files" DROP COLUMN "mimeType",
DROP COLUMN "originalName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT;
