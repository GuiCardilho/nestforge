import { capitalize, lowerCapitalize } from "../../utils/string";

export const controllerTemplate = (module: string) => {
    const moduleCapitalized = capitalize(module);
    const moduleLowerCap = lowerCapitalize(module);

    return `
import { SecureController } from '@/decorators/secure.decorator';
import { ${moduleCapitalized}Service } from './${moduleLowerCap}.service';

@SecureController({
    path: '${moduleLowerCap}',
    role: '',
})
export class ${moduleCapitalized}Controller {
    constructor(private readonly ${moduleLowerCap}Service: ${moduleCapitalized}Service) {}
}
    `;
};
