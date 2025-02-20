/*
  Warnings:

  - Made the column `updatedBy` on table `Solicitudes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Solicitudes" DROP CONSTRAINT "Solicitudes_updatedBy_fkey";

-- AlterTable
ALTER TABLE "Solicitudes" ALTER COLUMN "updatedBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
