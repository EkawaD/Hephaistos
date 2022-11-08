/*
  Warnings:

  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `Backup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemSetup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Backup" DROP CONSTRAINT "Backup_userId_fkey";

-- DropForeignKey
ALTER TABLE "ItemSetup" DROP CONSTRAINT "ItemSetup_userId_fkey";

-- DropForeignKey
ALTER TABLE "MealPlan" DROP CONSTRAINT "MealPlan_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "MealPlan" DROP CONSTRAINT "MealPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToRecipe" DROP CONSTRAINT "_ProductToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToRecipe" DROP CONSTRAINT "_ProductToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "category";

-- DropTable
DROP TABLE "Backup";

-- DropTable
DROP TABLE "ItemSetup";

-- DropTable
DROP TABLE "MealPlan";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "_ProductToRecipe";

-- DropEnum
DROP TYPE "ItemCategory";

-- DropEnum
DROP TYPE "Meal";

-- DropEnum
DROP TYPE "ProductCategory";

-- DropEnum
DROP TYPE "SkillCategory";

-- DropEnum
DROP TYPE "State";

-- DropEnum
DROP TYPE "WeekdayName";
