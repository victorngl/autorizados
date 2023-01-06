-- CreateTable
CREATE TABLE `responsaveis` (
    `id` VARCHAR(6) NOT NULL,
    `naluno` INTEGER NOT NULL,
    `username` VARCHAR(33) NULL,
    `nome` VARCHAR(60) NULL,
    `cpf` VARCHAR(17) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alunos` (
    `atividade_cultural` VARCHAR(60) NULL,
    `atividade_esportiva` VARCHAR(60) NULL,
    `atividade_optativa` VARCHAR(60) NULL,
    `date_registro` VARCHAR(60) NULL,
    `naluno` INTEGER NOT NULL,
    `nome` VARCHAR(100) NULL,
    `sexo` VARCHAR(15) NULL,
    `dnasc` VARCHAR(100) NULL,
    `s_rie` VARCHAR(50) NULL,

    UNIQUE INDEX `naluno`(`naluno`),
    PRIMARY KEY (`naluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `responsaveis` ADD CONSTRAINT `responsaveis_naluno_fkey` FOREIGN KEY (`naluno`) REFERENCES `alunos`(`naluno`) ON DELETE RESTRICT ON UPDATE CASCADE;
