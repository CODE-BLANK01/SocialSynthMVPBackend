/*
  Warnings:

  - A unique constraint covering the columns `[userId,platform]` on the table `PlatformAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `PlatformAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PlatformAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlatformAccount" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PlatformAccount_userId_platform_key" ON "PlatformAccount"("userId", "platform");
