import genDiff from '../src/index.js';

describe('yaml', () => {
  describe('flat', () => {
    it('should return correct diff', () => {
      const result = genDiff(resolveFixturePath('yaml/flat/before.yml'), resolveFixturePath('yaml/flat/after.yml'));
      expect(result).toMatchSnapshot();
    });
  });
});
