/*
  Warnings:

  - The `TransactionStatus` column on the `Transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('INPROGRESS', 'COMPLETE', 'FAILED');

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "TransactionStatus",
ADD COLUMN     "TransactionStatus" "TransactionStatus" NOT NULL DEFAULT 'INPROGRESS';
