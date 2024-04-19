import { capitalize } from "../../utils/string";

export const serviceTemplate = (module: string) => {
    const moduleCapitalized = capitalize(module);

    return `
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class ${moduleCapitalized}Service {
    constructor(
        private readonly prisma: PrismaService,
    ) {}
}
    `;
};
