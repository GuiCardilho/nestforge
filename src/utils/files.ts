import fs from "fs";
import path from "path";

export function createModuleDir(moduleName: string, basePath: string): string {
    const dirPath = path.join(basePath, moduleName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    return dirPath;
}

export function createFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content);
}
