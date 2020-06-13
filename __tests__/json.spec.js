import genDiff from '../src/index.js';

describe('json', () => {
  describe('flat', () => {
    it('should return correct diff', () => {
      const result = genDiff(resolveFixturePath('json/flat/before.json'), resolveFixturePath('json/flat/after.json'));
      expect(result).toMatchSnapshot();
    });
  });
});
