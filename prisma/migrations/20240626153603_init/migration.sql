/*
  Warnings:

  - The `Currency` column on the `SavingsAccount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Status` column on the `SavingsAccount` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccoutStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DORMANT', 'CLOSED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'GBP', 'USD', 'AUD', 'JPY', 'EUR');

-- AlterTable
ALTER TABLE "SavingsAccount" DROP COLUMN "Currency",
ADD COLUMN     "Currency" "Currency" NOT NULL DEFAULT 'INR',
DROP COLUMN "Status",
ADD COLUMN     "Status" "AccoutStatus" NOT NULL DEFAULT 'ACTIVE';
