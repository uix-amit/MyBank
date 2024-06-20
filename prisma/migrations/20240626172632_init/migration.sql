/*
  Warnings:

  - You are about to drop the column `NotificationType` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `AuthToken` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - Added the required column `Otp` to the `TwoFactorAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "NotificationType";

-- AlterTable
ALTER TABLE "TwoFactorAuth" DROP COLUMN "AuthToken",
ADD COLUMN     "Otp" INTEGER NOT NULL;
