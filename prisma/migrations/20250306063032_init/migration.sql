-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `permisos` VARCHAR(191) NULL,
    `departamento_id` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitudes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `curp` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `domicilio` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `solicitud` VARCHAR(191) NULL,
    `apoyo_id` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NULL,
    `estatus_id` VARCHAR(191) NOT NULL,
    `nota` VARCHAR(191) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_pdf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `presidente` VARCHAR(191) NOT NULL,
    `sexo_presidente` VARCHAR(191) NOT NULL,
    `atencion_ciudadana` VARCHAR(191) NOT NULL,
    `sexo_atencion_ciudadana` VARCHAR(191) NOT NULL,
    `hay_jefe` BOOLEAN NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitudes` ADD CONSTRAINT `Solicitudes_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
