/*
  Warnings:

  - Made the column `userId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "userId" SET NOT NULL;
