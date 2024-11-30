/*
  Warnings:

  - Added the required column `locked` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "onRampState" AS ENUM ('Success', 'Failure', 'Processings');

-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "locked" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "onRampTransactions" (
    "id" SERIAL NOT NULL,
    "state" "onRampState" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onRampTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "onRampTransactions" ADD CONSTRAINT "onRampTransactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
