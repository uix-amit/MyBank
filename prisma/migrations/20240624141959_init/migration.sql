/*
  Warnings:

  - The primary key for the `Banks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CommunicationPreferences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Loans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SavingsAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TwoFactorAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_AccountID_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationPreferences" DROP CONSTRAINT "CommunicationPreferences_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Loans" DROP CONSTRAINT "Loans_BankID_fkey";

-- DropForeignKey
ALTER TABLE "Loans" DROP CONSTRAINT "Loans_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_UserID_fkey";

-- DropForeignKey
ALTER TABLE "SavingsAccount" DROP CONSTRAINT "SavingsAccount_BankID_fkey";

-- DropForeignKey
ALTER TABLE "SavingsAccount" DROP CONSTRAINT "SavingsAccount_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_FromAccountID_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_ToAccountID_fkey";

-- DropForeignKey
ALTER TABLE "TwoFactorAuth" DROP CONSTRAINT "TwoFactorAuth_UserID_fkey";

-- AlterTable
ALTER TABLE "Banks" DROP CONSTRAINT "Banks_pkey",
ALTER COLUMN "BankID" DROP DEFAULT,
ALTER COLUMN "BankID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Banks_pkey" PRIMARY KEY ("BankID");
DROP SEQUENCE "Banks_BankID_seq";

-- AlterTable
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_pkey",
ALTER COLUMN "CardID" DROP DEFAULT,
ALTER COLUMN "CardID" SET DATA TYPE TEXT,
ALTER COLUMN "AccountID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cards_pkey" PRIMARY KEY ("CardID");
DROP SEQUENCE "Cards_CardID_seq";

-- AlterTable
ALTER TABLE "CommunicationPreferences" DROP CONSTRAINT "CommunicationPreferences_pkey",
ALTER COLUMN "CommunicationPreferenceID" DROP DEFAULT,
ALTER COLUMN "CommunicationPreferenceID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "CommunicationPreferences_pkey" PRIMARY KEY ("CommunicationPreferenceID");
DROP SEQUENCE "CommunicationPreferences_CommunicationPreferenceID_seq";

-- AlterTable
ALTER TABLE "Loans" DROP CONSTRAINT "Loans_pkey",
ALTER COLUMN "LoanID" DROP DEFAULT,
ALTER COLUMN "LoanID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ALTER COLUMN "BankID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Loans_pkey" PRIMARY KEY ("LoanID");
DROP SEQUENCE "Loans_LoanID_seq";

-- AlterTable
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_pkey",
ALTER COLUMN "NotificationID" DROP DEFAULT,
ALTER COLUMN "NotificationID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY ("NotificationID");
DROP SEQUENCE "Notifications_NotificationID_seq";

-- AlterTable
ALTER TABLE "SavingsAccount" DROP CONSTRAINT "SavingsAccount_pkey",
ALTER COLUMN "AccountID" DROP DEFAULT,
ALTER COLUMN "AccountID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ALTER COLUMN "BankID" SET DATA TYPE TEXT,
ADD CONSTRAINT "SavingsAccount_pkey" PRIMARY KEY ("AccountID");
DROP SEQUENCE "SavingsAccount_AccountID_seq";

-- AlterTable
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_pkey",
ALTER COLUMN "TransactionID" DROP DEFAULT,
ALTER COLUMN "TransactionID" SET DATA TYPE TEXT,
ALTER COLUMN "FromAccountID" SET DATA TYPE TEXT,
ALTER COLUMN "ToAccountID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("TransactionID");
DROP SEQUENCE "Transactions_TransactionID_seq";

-- AlterTable
ALTER TABLE "TwoFactorAuth" DROP CONSTRAINT "TwoFactorAuth_pkey",
ALTER COLUMN "TwoFactorAuthID" DROP DEFAULT,
ALTER COLUMN "TwoFactorAuthID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "TwoFactorAuth_pkey" PRIMARY KEY ("TwoFactorAuthID");
DROP SEQUENCE "TwoFactorAuth_TwoFactorAuthID_seq";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "UserID" DROP DEFAULT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID");
DROP SEQUENCE "Users_UserID_seq";

-- AddForeignKey
ALTER TABLE "SavingsAccount" ADD CONSTRAINT "SavingsAccount_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingsAccount" ADD CONSTRAINT "SavingsAccount_BankID_fkey" FOREIGN KEY ("BankID") REFERENCES "Banks"("BankID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "SavingsAccount"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_FromAccountID_fkey" FOREIGN KEY ("FromAccountID") REFERENCES "SavingsAccount"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_ToAccountID_fkey" FOREIGN KEY ("ToAccountID") REFERENCES "SavingsAccount"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

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
