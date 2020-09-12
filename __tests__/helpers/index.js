import fs from 'fs';
import url from 'url';
import path from 'path';

const currentFilePath = url.fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const fixturesPath = path.resolve(currentDirectory, '..', '..', '__fixtures__');

const resolveFixturePath = (relativePath) => path.resolve(fixturesPath, relativePath);

const readFixture = (relativePath) => fs.readFileSync(resolveFixturePath(relativePath), 'utf-8').trim();

export default { resolveFixturePath, readFixture };
