#!/usr/bin/env node

import fs from "fs";
import path from "path";

function createModuleDir(moduleName: string, basePath: string): string {
    const dirPath = path.join(basePath, moduleName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    return dirPath;
}

function createFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content);
}

function replacePlaceholders(template: string, moduleName: string): string {
    return template
        .replace(
            /\[Name\]/g,
            moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
        )
        .replace(/\[name\]/g, moduleName.toLowerCase());
}

const moduleName = process.argv[2].toLowerCase();
const moduleNameCapitalized =
    moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

const basePath = process.cwd(); // Obtém o diretório de trabalho atual
const dirPath = createModuleDir(moduleName, basePath);

// Templates
const controllerTemplate = `import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ${moduleNameCapitalized}Service } from './${moduleName}.service';

@ApiTags('${moduleNameCapitalized}')
@Controller('${moduleName}')
export class ${moduleNameCapitalized}Controller {
  constructor(private readonly ${moduleName}Service: ${moduleNameCapitalized}Service) {}
}`;

const moduleTemplate = `import { Module } from '@nestjs/common';
import { ${moduleNameCapitalized}Controller } from './${moduleName}.controller';
import { ${moduleNameCapitalized}Service } from './${moduleName}.service';

@Module({
  controllers: [${moduleNameCapitalized}Controller],
  providers: [${moduleNameCapitalized}Service],
})
export class ${moduleNameCapitalized}Module {}`;

const serviceTemplate = `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${moduleNameCapitalized}Service {}`;

// Criação de arquivos baseados nos templates
createFile(
    path.join(dirPath, `${moduleName}.controller.ts`),
    controllerTemplate
);
createFile(path.join(dirPath, `${moduleName}.module.ts`), moduleTemplate);
createFile(path.join(dirPath, `${moduleName}.service.ts`), serviceTemplate);

console.log(`🚀 - Módulo ${moduleNameCapitalized} criado com sucesso.`);
console.log(`⭐ - Os arquivos foram criados em: ${dirPath}`);
