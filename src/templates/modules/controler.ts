import { capitalize, lowerCapitalize } from "../../utils/string";

export const controllerTemplate = (module: string) => {
    const moduleCapitalized = capitalize(module);
    const moduleLowerCap = lowerCapitalize(module);

    return `
import { Controller } from '@nestjs/common';
import { ${moduleCapitalized}Service } from './${moduleLowerCap}.service';

@SecureController({
    path: 'apikey',
    role: 'USER',
    func: validateSeller,
})
export class ${moduleCapitalized}Controller {
    constructor(private readonly ${moduleLowerCap}Service: ${moduleCapitalized}Service) {}
}
    `;
};
