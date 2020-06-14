import genDiff from '../src/index.js';
import { formatterTypes } from '../src/formatters/index.js';

describe('diff', () => {
  describe.each(['json', 'yml', 'ini'])('%s', (extension) => {
    describe.each(Object.values(formatterTypes))('%s', (format) => {
      it('should return correct diff', () => {
        const pathToFile1 = resolveFixturePath(`before.${extension}`);
        const pathToFile2 = resolveFixturePath(`after.${extension}`);
        const result = genDiff(pathToFile1, pathToFile2, format);

        expect(result).toMatchSnapshot();
      });
    });
  });
});
