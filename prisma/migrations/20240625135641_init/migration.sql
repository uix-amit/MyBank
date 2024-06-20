/*
  Warnings:

  - You are about to alter the column `LoanAmount` on the `Loans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `InterestRate` on the `Loans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `Balance` on the `SavingsAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `Amount` on the `Transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Loans" ALTER COLUMN "LoanAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "InterestRate" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SavingsAccount" ALTER COLUMN "Balance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "Amount" SET DATA TYPE DOUBLE PRECISION;
