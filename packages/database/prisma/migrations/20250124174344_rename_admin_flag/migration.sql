/*
  Warnings:

  - You are about to drop the column `admin` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "admin",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
