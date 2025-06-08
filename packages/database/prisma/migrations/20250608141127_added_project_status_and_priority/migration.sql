-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('INIT', 'PLANNING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "priority" "ProjectPriority" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'INIT';
