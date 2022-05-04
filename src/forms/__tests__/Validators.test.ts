import { ValidatorFunction } from '../../models';
import { Validators } from '../index';

const PHONE_PATTERN: RegExp = new RegExp('^[0-9]{9,12}$');

describe('Validators class', () => {
  describe('required validator', () => {
    it('should return null if value is non-empty', () => {
      expect(Validators.required('test')).toBe(null);
    });
    it('should return validation error if value is empty', () => {
      expect(Validators.required('')).toStrictEqual({ required: true });
    });
  });

  describe('requiredTrue validator', () => {
    it('should return null if value is true', () => {
      expect(Validators.requiredTrue(true)).toBe(null);
    });
    it('should return validation error if value is false', () => {
      expect(Validators.requiredTrue(false)).toStrictEqual({ required: true });
    });
  });

  describe('pattern validator', () => {
    const pattern: ValidatorFunction = Validators.pattern(PHONE_PATTERN);

    it('should return null if value match a pattern', () => {
      expect(pattern('876679328')).toBe(null);
    });
    it('should return validation error if value not match a pattern', () => {
      expect(pattern('test1234')).toStrictEqual({ pattern: true });
    });
  });

  describe('min validator', () => {
    const min: ValidatorFunction = Validators.min(3);

    it('should return null if value is greater than or equal to the provided number', () => {
      expect(min(5)).toBe(null);
    });
    it('should return validation error if value is less than provided number', () => {
      expect(min(1)).toStrictEqual({ min: true });
    });
  });

  describe('max validator', () => {
    const max: ValidatorFunction = Validators.max(3);

    it('should return null if value is less than or equal to the provided number', () => {
      expect(max(1)).toBe(null);
    });
    it('should return validation error if value is greater than provided number', () => {
      expect(max(5)).toStrictEqual({ max: true });
    });
  });

  describe('minLength validator', () => {
    const minLength: ValidatorFunction = Validators.minLength(3);

    it('should return null if value length is greater than or equal to the provided minimum length', () => {
      expect(minLength('test')).toBe(null);
    });
    it('should return validation error if value length is less than provided minimum length', () => {
      expect(minLength('t')).toStrictEqual({ minLength: true });
    });
  });

  describe('maxLength validator', () => {
    const maxLength: ValidatorFunction = Validators.maxLength(3);

    it('should return null if value length is less than or equal to the provided minimum length', () => {
      expect(maxLength('t')).toBe(null);
    });
    it('should return validation error if value length is greater than provided minimum length', () => {
      expect(maxLength('test')).toStrictEqual({ maxLength: true });
    });
  });
});
