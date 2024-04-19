#!/usr/bin/env node

import path from "path";

import { createFile, createModuleDir } from "./utils/files";
import { capitalize, lowerCapitalize } from "./utils/string";

import { controllerTemplate as controller } from "./templates/modules/controler";
import { moduleTemplate as module } from "./templates/modules/module";
import { serviceTemplate as service } from "./templates/modules/service";

// Funções auxiliares
const rawModuleName = process.argv[2];
const moduleName = lowerCapitalize(rawModuleName);
const moduleNameCapitalized = capitalize(rawModuleName);

// Diretório base
const basePath = process.argv[3]
    ? path.resolve(process.argv[3])
    : process.cwd();
const dirPath = createModuleDir(moduleName, basePath);

// Templates
const controllerTemplate = controller(rawModuleName);
const moduleTemplate = module(rawModuleName);
const serviceTemplate = service(rawModuleName);

// Criação de arquivos baseados nos templates
createFile(
    path.join(dirPath, `${moduleName}.controller.ts`),
    controllerTemplate
);
createFile(path.join(dirPath, `${moduleName}.module.ts`), moduleTemplate);
createFile(path.join(dirPath, `${moduleName}.service.ts`), serviceTemplate);

// Mensagem de sucesso
console.log(`🚀 - Módulo ${moduleNameCapitalized} criado com sucesso.`);
console.log(`⭐ - Os arquivos foram criados em: ${dirPath}`);
