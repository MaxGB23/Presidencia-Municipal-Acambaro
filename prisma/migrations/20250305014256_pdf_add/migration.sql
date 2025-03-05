-- CreateTable
CREATE TABLE "documentos_pdf" (
    "id" SERIAL NOT NULL,
    "presidente" TEXT NOT NULL,
    "sexo_presidente" TEXT NOT NULL,
    "atencion_ciudadana" TEXT NOT NULL,
    "sexo_atencion_ciudadana" TEXT NOT NULL,
    "hay_jefe" BOOLEAN NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentos_pdf_pkey" PRIMARY KEY ("id")
);
