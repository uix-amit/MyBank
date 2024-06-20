/*
  Warnings:

  - You are about to drop the column `userId` on the `SavingsBankAccount` table. All the data in the column will be lost.
  - Added the required column `savingsAccountId` to the `SavingsBankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `savingsAccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SavingsBankAccount" DROP CONSTRAINT "SavingsBankAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_cardId_fkey";

-- AlterTable
ALTER TABLE "SavingsBankAccount" DROP COLUMN "userId",
ADD COLUMN     "savingsAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "savingsAccountId" TEXT NOT NULL,
ALTER COLUMN "cardId" DROP NOT NULL,
ALTER COLUMN "transactionDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_savingsAccountId_fkey" FOREIGN KEY ("savingsAccountId") REFERENCES "SavingsAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingsBankAccount" ADD CONSTRAINT "SavingsBankAccount_savingsAccountId_fkey" FOREIGN KEY ("savingsAccountId") REFERENCES "SavingsAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
