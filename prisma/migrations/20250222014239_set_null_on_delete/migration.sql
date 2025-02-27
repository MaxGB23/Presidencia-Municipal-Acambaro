-- DropForeignKey
ALTER TABLE "Solicitudes" DROP CONSTRAINT "Solicitudes_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Solicitudes" DROP CONSTRAINT "Solicitudes_updatedBy_fkey";

-- AlterTable
ALTER TABLE "Solicitudes" ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
