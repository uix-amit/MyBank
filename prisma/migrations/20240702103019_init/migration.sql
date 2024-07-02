/*
  Warnings:

  - A unique constraint covering the columns `[UserName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PhoneNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "UserName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_UserName_key" ON "Users"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_PhoneNumber_key" ON "Users"("PhoneNumber");
