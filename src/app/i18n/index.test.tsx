import { getOtherLanguage } from './index';

describe('I18n', () => {
  describe('getOtherLanguage', () => {
    test('en -> vi', () => {
      const language = 'en';

      expect(getOtherLanguage(language)).toBe('vi');
    });

    test('vi -> en', () => {
      const language = 'vi';

      expect(getOtherLanguage(language)).toBe('en');
    });

    test('EN -> vi', () => {
      const language = 'EN';

      expect(getOtherLanguage(language)).toBe('vi');
    });
  });
});
