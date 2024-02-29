/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ConfirmationCodes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `ConfirmationCodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationCodes_email_key" ON "ConfirmationCodes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationCodes_phone_key" ON "ConfirmationCodes"("phone");
