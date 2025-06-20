/*
  Warnings:

  - You are about to drop the column `fetchedAt` on the `EngagementStat` table. All the data in the column will be lost.
  - You are about to drop the column `shares` on the `EngagementStat` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EngagementStat" DROP COLUMN "fetchedAt",
DROP COLUMN "shares",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
