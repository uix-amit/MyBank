/*
  Warnings:

  - A unique constraint covering the columns `[UserID]` on the table `TwoFactorAuth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuth_UserID_key" ON "TwoFactorAuth"("UserID");
