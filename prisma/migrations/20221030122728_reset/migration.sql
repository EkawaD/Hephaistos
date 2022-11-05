-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('Nourriture', 'Menage', 'Autres');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('doable', 'missing', 'ko');

-- CreateEnum
CREATE TYPE "WeekdayName" AS ENUM ('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('known', 'fluent', 'interested', 'tool', 'hobby');

-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('ecran', 'stockage', 'boitier', 'processeur', 'graphicCard', 'ram', 'alim', 'casque', 'clavier', 'souris', 'screenbar', 'mousepad', 'enceinte', 'desk', 'accessoires', 'cableManagements');

-- CreateEnum
CREATE TYPE "Meal" AS ENUM ('midi', 'soir');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profil" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#008080',
    "avatar" TEXT NOT NULL DEFAULT '/avatar.jpg',
    "firstname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "github" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lettre" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "objet" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Lettre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ref" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Ref_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diplome" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "diplomaDate" TIMESTAMP(3),
    "school" TEXT NOT NULL,
    "place" TEXT,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Diplome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "entreprise" TEXT NOT NULL,
    "poste" TEXT NOT NULL,
    "place" TEXT,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "github" TEXT,
    "demo" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "tech" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSetup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ItemSetup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backup" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "cronString" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Backup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT false,
    "toBuy" BOOLEAN NOT NULL DEFAULT false,
    "category" "ProductCategory" NOT NULL DEFAULT 'Nourriture',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'ko',
    "guestNumber" INTEGER,
    "tasks" TEXT[],
    "estimedTime" TEXT,
    "hint" TEXT,
    "image" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" SERIAL NOT NULL,
    "weekday" "WeekdayName" NOT NULL,
    "meal" "Meal" NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "Profil_userId_key" ON "Profil"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MealPlan_weekday_key" ON "MealPlan"("weekday");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRecipe_AB_unique" ON "_ProductToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRecipe_B_index" ON "_ProductToRecipe"("B");

-- AddForeignKey
ALTER TABLE "Profil" ADD CONSTRAINT "Profil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lettre" ADD CONSTRAINT "Lettre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ref" ADD CONSTRAINT "Ref_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diplome" ADD CONSTRAINT "Diplome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobby" ADD CONSTRAINT "Hobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSetup" ADD CONSTRAINT "ItemSetup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Backup" ADD CONSTRAINT "Backup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRecipe" ADD CONSTRAINT "_ProductToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRecipe" ADD CONSTRAINT "_ProductToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
