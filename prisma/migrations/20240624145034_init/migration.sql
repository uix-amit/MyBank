/*
  Warnings:

  - You are about to drop the `CommunicationPreferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunicationPreferences" DROP CONSTRAINT "CommunicationPreferences_UserID_fkey";

-- DropTable
DROP TABLE "CommunicationPreferences";

-- CreateTable
CREATE TABLE "AccountPreferences" (
    "AccountPreferenceID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "EmailNotifications" BOOLEAN NOT NULL,
    "SMSNotifications" BOOLEAN NOT NULL,
    "PushNotifications" BOOLEAN NOT NULL,
    "EnableTwoFactorAuth" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountPreferences_pkey" PRIMARY KEY ("AccountPreferenceID")
);

-- AddForeignKey
ALTER TABLE "AccountPreferences" ADD CONSTRAINT "AccountPreferences_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
