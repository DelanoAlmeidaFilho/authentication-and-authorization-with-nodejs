/*
  Warnings:

  - You are about to drop the `RoleOnPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersOnRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleOnPermission" DROP CONSTRAINT "RoleOnPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "RoleOnPermission" DROP CONSTRAINT "RoleOnPermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnRole" DROP CONSTRAINT "usersOnRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnRole" DROP CONSTRAINT "usersOnRole_userId_fkey";

-- DropTable
DROP TABLE "RoleOnPermission";

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "usersOnRole";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleToPermission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRole_AB_unique" ON "_UserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRole_B_index" ON "_UserRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToPermission_AB_unique" ON "_RoleToPermission"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToPermission_B_index" ON "_RoleToPermission"("B");

-- AddForeignKey
ALTER TABLE "_UserRole" ADD CONSTRAINT "_UserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRole" ADD CONSTRAINT "_UserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToPermission" ADD CONSTRAINT "_RoleToPermission_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToPermission" ADD CONSTRAINT "_RoleToPermission_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
