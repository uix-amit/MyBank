/*
  Warnings:

  - The primary key for the `TwoFactorAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TwoFactorAuth` table. All the data in the column will be lost.
  - You are about to drop the `AccountPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BankDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoanAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavingsAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavingsBankAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `AuthMethod` to the `TwoFactorAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AuthToken` to the `TwoFactorAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IsEnabled` to the `TwoFactorAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserID` to the `TwoFactorAuth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountPreference" DROP CONSTRAINT "AccountPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoanAccount" DROP CONSTRAINT "LoanAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavingsAccount" DROP CONSTRAINT "SavingsAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavingsBankAccount" DROP CONSTRAINT "SavingsBankAccount_bankId_fkey";

-- DropForeignKey
ALTER TABLE "SavingsBankAccount" DROP CONSTRAINT "SavingsBankAccount_savingsAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_savingsAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "TwoFactorAuth" DROP CONSTRAINT "TwoFactorAuth_userId_fkey";

-- DropIndex
DROP INDEX "TwoFactorAuth_userId_key";

-- AlterTable
ALTER TABLE "TwoFactorAuth" DROP CONSTRAINT "TwoFactorAuth_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "token",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "AuthMethod" TEXT NOT NULL,
ADD COLUMN     "AuthToken" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "IsEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "TwoFactorAuthID" SERIAL NOT NULL,
ADD COLUMN     "UserID" INTEGER NOT NULL,
ADD CONSTRAINT "TwoFactorAuth_pkey" PRIMARY KEY ("TwoFactorAuthID");

-- DropTable
DROP TABLE "AccountPreference";

-- DropTable
DROP TABLE "BankDetail";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "LoanAccount";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "SavingsAccount";

-- DropTable
DROP TABLE "SavingsBankAccount";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "CardType";

-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "DateOfBirth" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Banks" (
    "BankID" SERIAL NOT NULL,
    "BankName" TEXT NOT NULL,
    "CustomerCareEmail" TEXT NOT NULL,
    "CustomerCarePhone" TEXT NOT NULL,

    CONSTRAINT "Banks_pkey" PRIMARY KEY ("BankID")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "AccountID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "BankID" INTEGER NOT NULL,
    "AccountNumber" TEXT NOT NULL,
    "AccountType" TEXT NOT NULL,
    "Balance" DECIMAL(65,30) NOT NULL,
    "Currency" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("AccountID")
);

-- CreateTable
CREATE TABLE "Cards" (
    "CardID" SERIAL NOT NULL,
    "AccountID" INTEGER NOT NULL,
    "CardNumber" TEXT NOT NULL,
    "ExpirationDate" TIMESTAMP(3) NOT NULL,
    "CVV" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("CardID")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "TransactionID" SERIAL NOT NULL,
    "FromAccountID" INTEGER NOT NULL,
    "ToAccountID" INTEGER NOT NULL,
    "Amount" DECIMAL(65,30) NOT NULL,
    "TransactionType" TEXT NOT NULL,
    "TransactionDate" TIMESTAMP(3) NOT NULL,
    "TransactionStatus" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("TransactionID")
);

-- CreateTable
CREATE TABLE "Loans" (
    "LoanID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "BankID" INTEGER NOT NULL,
    "LoanType" "LoanType" NOT NULL,
    "LoanAmount" DECIMAL(65,30) NOT NULL,
    "InterestRate" DECIMAL(65,30) NOT NULL,
    "LoanTerm" INTEGER NOT NULL,
    "LoanStartDate" TIMESTAMP(3) NOT NULL,
    "LoanEndDate" TIMESTAMP(3) NOT NULL,
    "RemainingTenure" INTEGER NOT NULL,
    "LoanStatus" "LoanAccountStatus" NOT NULL DEFAULT 'OUTSTANDING',
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loans_pkey" PRIMARY KEY ("LoanID")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "NotificationID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "NotificationType" TEXT NOT NULL,
    "Message" TEXT NOT NULL,
    "IsRead" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("NotificationID")
);

-- CreateTable
CREATE TABLE "CommunicationPreferences" (
    "CommunicationPreferenceID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "EmailNotifications" BOOLEAN NOT NULL,
    "SMSNotifications" BOOLEAN NOT NULL,
    "PushNotifications" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunicationPreferences_pkey" PRIMARY KEY ("CommunicationPreferenceID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Banks_BankName_key" ON "Banks"("BankName");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_AccountNumber_key" ON "Accounts"("AccountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_CardNumber_key" ON "Cards"("CardNumber");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_BankID_fkey" FOREIGN KEY ("BankID") REFERENCES "Banks"("BankID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Accounts"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_FromAccountID_fkey" FOREIGN KEY ("FromAccountID") REFERENCES "Accounts"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_ToAccountID_fkey" FOREIGN KEY ("ToAccountID") REFERENCES "Accounts"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loans" ADD CONSTRAINT "Loans_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loans" ADD CONSTRAINT "Loans_BankID_fkey" FOREIGN KEY ("BankID") REFERENCES "Banks"("BankID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorAuth" ADD CONSTRAINT "TwoFactorAuth_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationPreferences" ADD CONSTRAINT "CommunicationPreferences_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
