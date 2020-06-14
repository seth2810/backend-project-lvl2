import genDiff from '../src/index.js';

describe('diff', () => {
  describe.each(['json', 'yml', 'ini'])('%s', (extension) => {
    it('should return correct diff', () => {
      const pathToFile1 = resolveFixturePath(`before.${extension}`);
      const pathToFile2 = resolveFixturePath(`after.${extension}`);
      const result = genDiff(pathToFile1, pathToFile2, 'stylish');

      expect(result).toMatchSnapshot();
    });
  });
});
