/*
  Warnings:

  - You are about to drop the column `tokenName` on the `holders` table. All the data in the column will be lost.
  - You are about to drop the column `tokenSymbol` on the `holders` table. All the data in the column will be lost.
  - Made the column `walletAddress` on table `holders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "holders" DROP CONSTRAINT "holders_walletAddress_fkey";

-- AlterTable
ALTER TABLE "holders" DROP COLUMN "tokenName",
DROP COLUMN "tokenSymbol",
ALTER COLUMN "walletAddress" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "holders" ADD CONSTRAINT "holders_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "wallets"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
