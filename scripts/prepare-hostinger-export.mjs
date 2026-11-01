import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const outDir = resolve(root, 'out');
const apiDir = resolve(root, 'api');
const targetApiDir = resolve(outDir, 'api');

if (!existsSync(outDir)) {
    throw new Error('Missing "out" directory. Run "next build" first.');
}

if (!existsSync(apiDir)) {
    throw new Error('Missing "api" directory.');
}

rmSync(targetApiDir, { recursive: true, force: true });
cpSync(apiDir, targetApiDir, { recursive: true });

console.log('Hostinger package ready: copied api/ to out/api.');
