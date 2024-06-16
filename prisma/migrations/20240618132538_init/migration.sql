/*
  Warnings:

  - The `loanStatus` column on the `LoanAccount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `accountBalance` on the `SavingsBankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `SavingsBankAccount` table. All the data in the column will be lost.
  - Changed the type of `cardType` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `emi` to the `LoanAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanType` to the `LoanAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outstandingAmount` to the `LoanAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remainingTerm` to the `LoanAccount` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `transactionType` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('HOME', 'VEHICLE', 'GOLD', 'MORTGAGE', 'PERSONAL', 'EDUCATIONAL');

-- CreateEnum
CREATE TYPE "LoanAccountStatus" AS ENUM ('OUTSTANDING', 'SETTLED');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardType",
ADD COLUMN     "cardType" "CardType" NOT NULL;

-- AlterTable
ALTER TABLE "LoanAccount" ADD COLUMN     "emi" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "loanType" "LoanType" NOT NULL,
ADD COLUMN     "outstandingAmount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "remainingTerm" INTEGER NOT NULL,
DROP COLUMN "loanStatus",
ADD COLUMN     "loanStatus" "LoanAccountStatus" NOT NULL DEFAULT 'OUTSTANDING';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SavingsBankAccount" DROP COLUMN "accountBalance",
DROP COLUMN "accountNumber";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionType",
ADD COLUMN     "transactionType" "TransactionType" NOT NULL;
