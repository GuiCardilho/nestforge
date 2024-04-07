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

function toCamelCase(str: string) {
    return str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
}

function toPascalCase(str: string) {
    const camelCase = toCamelCase(str);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

const rawModuleName = process.argv[2];
const moduleName = toCamelCase(rawModuleName);
const moduleNameCapitalized = toPascalCase(rawModuleName);

const basePath = process.argv[3]
    ? path.resolve(process.argv[3])
    : process.cwd();
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
