/*
  Warnings:

  - You are about to drop the column `pseudo` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_pseudo_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pseudo",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
