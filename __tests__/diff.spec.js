import genDiff from '../src/index.js';

describe.each(['json', 'yml', 'ini'])('%s', (extension) => {
  describe('flat', () => {
    it('should return correct diff', () => {
      const pathToFile1 = resolveFixturePath(`${extension}/flat/before.${extension}`);
      const pathToFile2 = resolveFixturePath(`${extension}/flat/after.${extension}`);
      const result = genDiff(pathToFile1, pathToFile2);

      expect(result).toMatchSnapshot();
    });
  });
});
