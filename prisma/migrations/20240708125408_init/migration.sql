/*
  Warnings:

  - A unique constraint covering the columns `[UserID]` on the table `AccountPreferences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccountPreferences_UserID_key" ON "AccountPreferences"("UserID");
