const path = require('path');

function resolveFixturePath(relativePath) {
  return path.resolve(__dirname, '..', 'fixtures', relativePath);
}

Object.assign(global, { resolveFixturePath });
