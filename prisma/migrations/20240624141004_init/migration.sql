/*
  Warnings:

  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[AccountNumber]` on the table `Loans` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AccountNumber` to the `Loans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_BankID_fkey";

-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_AccountID_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_FromAccountID_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_ToAccountID_fkey";

-- AlterTable
ALTER TABLE "Loans" ADD COLUMN     "AccountNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "Accounts";

-- CreateTable
CREATE TABLE "SavingsAccount" (
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

    CONSTRAINT "SavingsAccount_pkey" PRIMARY KEY ("AccountID")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavingsAccount_AccountNumber_key" ON "SavingsAccount"("AccountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Loans_AccountNumber_key" ON "Loans"("AccountNumber");

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
