/*
  Warnings:

  - Added the required column `fullName` to the `ConfirmationCodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConfirmationCodes" ADD COLUMN     "fullName" TEXT NOT NULL;
