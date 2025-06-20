/*
  Warnings:

  - You are about to drop the column `hashtags` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tone` on the `Post` table. All the data in the column will be lost.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "hashtags",
DROP COLUMN "platform",
DROP COLUMN "tone",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imagePath" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT;
