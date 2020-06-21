import { genDiff, getFormatterTypes } from '../src/index.js';

import helpers from './helpers';

describe('diff', () => {
  describe.each(['json', 'yml', 'ini'])('%s', (extension) => {
    describe.each(getFormatterTypes())('%s', (format) => {
      it('should return correct diff', () => {
        const pathToFile1 = helpers.resolveFixturePath(`before.${extension}`);
        const pathToFile2 = helpers.resolveFixturePath(`after.${extension}`);
        const result = genDiff(pathToFile1, pathToFile2, format);

        expect(result).toMatchSnapshot();
      });
    });
  });
});
