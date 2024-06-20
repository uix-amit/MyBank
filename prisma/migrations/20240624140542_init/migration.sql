/*
  Warnings:

  - Changed the type of `TransactionType` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "TransactionType",
ADD COLUMN     "TransactionType" "TransactionType" NOT NULL;
