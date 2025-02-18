-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "permisos" TEXT,
    "departamento_id" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitudes" (
    "id" SERIAL NOT NULL,
    "curp" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "solicitud" TEXT,
    "apoyo_id" TEXT,
    "fecha" TIMESTAMP(3),
    "estatus_id" TEXT NOT NULL,
    "nota" TEXT,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solicitudes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitudes" ADD CONSTRAINT "Solicitudes_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
