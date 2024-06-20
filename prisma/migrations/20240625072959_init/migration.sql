/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `AuthMethod` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - You are about to drop the column `IsEnabled` on the `TwoFactorAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccountPreferences" ALTER COLUMN "EmailNotifications" DROP NOT NULL,
ALTER COLUMN "EmailNotifications" SET DEFAULT true,
ALTER COLUMN "SMSNotifications" DROP NOT NULL,
ALTER COLUMN "SMSNotifications" SET DEFAULT true,
ALTER COLUMN "PushNotifications" DROP NOT NULL,
ALTER COLUMN "PushNotifications" SET DEFAULT true,
ALTER COLUMN "CreatedAt" DROP NOT NULL,
ALTER COLUMN "UpdatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cards" ALTER COLUMN "CreatedAt" DROP NOT NULL,
ALTER COLUMN "UpdatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Loans" ALTER COLUMN "LoanTerm" SET DEFAULT 360,
ALTER COLUMN "LoanStartDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "CreatedAt" DROP NOT NULL,
ALTER COLUMN "UpdatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "IsRead" DROP NOT NULL,
ALTER COLUMN "IsRead" SET DEFAULT false,
ALTER COLUMN "CreatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SavingsAccount" ALTER COLUMN "CreatedAt" DROP NOT NULL,
ALTER COLUMN "UpdatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "CreatedAt",
ALTER COLUMN "TransactionDate" DROP NOT NULL,
ALTER COLUMN "TransactionDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TwoFactorAuth" DROP COLUMN "AuthMethod",
DROP COLUMN "IsEnabled",
ALTER COLUMN "CreatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "CreatedAt" DROP NOT NULL,
ALTER COLUMN "UpdatedAt" DROP NOT NULL;
