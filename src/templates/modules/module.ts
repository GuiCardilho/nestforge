import { capitalize, lowerCapitalize } from "../../utils/string";

export const moduleTemplate = (module: string) => {
    const moduleCapitalized = capitalize(module);
    const moduleLowerCap = lowerCapitalize(module);

    return `
import { Module } from '@nestjs/common';
import { ${moduleCapitalized}Controller } from './${moduleLowerCap}.controller';
import { ${moduleCapitalized}Service } from './${moduleLowerCap}.service';

@Module({
controllers: [${moduleCapitalized}Controller],
providers: [${moduleCapitalized}Service],
})
export class ${moduleCapitalized}Module {}
    `;
};
