/*
  Warnings:

  - You are about to drop the column `cep` on the `Address` table. All the data in the column will be lost.
  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "cep",
ADD COLUMN     "zipCode" TEXT NOT NULL;
