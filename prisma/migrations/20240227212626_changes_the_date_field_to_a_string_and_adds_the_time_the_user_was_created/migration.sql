-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "birthDate" SET DATA TYPE TEXT;
