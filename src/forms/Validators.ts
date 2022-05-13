import { ValidationError, ValidatorFunction } from '../models';

export class Validators {
  /**
   * Requires the control's value to be non-empty
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * required property as true
   */
  static required = (value: any): ValidationError | null => {
    return !this._isEmpty(value) ? null : { required: true };
  };

  /**
   * Requires the control's value to be true
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * required property as true
   */
  static requiredTrue = (value: any): ValidationError | null => {
    return value === true ? null : { required: true };
  };

  /**
   * Requires the control's value to match a regex pattern
   * @param pattern - provided regex pattern
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * pattern property as true
   */
  static pattern = (regex: RegExp): ValidatorFunction => {
    const pattern: ValidatorFunction = (value: any) => {
      if (this._isEmpty(value)) return null;

      return regex.test(value) ? null : { pattern: true };
    };

    return pattern;
  };

  /**
   * Requires the control's value to be greater than or equal to the provided number.
   * @param min - provided min number
   * @returns null if control's value meets the
   * requirements, if not returns an error object with min
   * property as true
   */
  static min = (minValue: number): ValidatorFunction => {
    const min: ValidatorFunction = (value: any) => {
      if (this._isEmpty(value)) return null;

      return value >= minValue ? null : { min: true };
    };

    return min;
  };

  /**
   * Requires the control's value to be less than or equal to the provided number.
   * @param max - provided max number
   * @returns null if control's value meets the
   * requirements, if not returns an error object with max
   * property as true
   */
  static max = (maxValue: number): ValidatorFunction => {
    const max: ValidatorFunction = (value: any) => {
      if (this._isEmpty(value)) return null;

      return value <= maxValue ? null : { max: true };
    };

    return max;
  };

  /**
   * Requires the length of the control's value to be
   * greater than or equal to the provided minimum length
   * @param minLength - provided minimum length
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * minLength property as true
   */
  static minLength = (minLengthValue: number): ValidatorFunction => {
    const minLength: ValidatorFunction = (value: any) => {
      if (this._isEmpty(value)) return null;

      return value.toString().length >= minLengthValue ? null : { minLength: true };
    };

    return minLength;
  };

  /**
   * Requires the length of the control's value to be
   * less than or equal to the provided maximum length
   * @param maxLength - provided maximum length
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * maxLength property as true
   */
  static maxLength = (maxLengthValue: number): ValidatorFunction => {
    const maxLength: ValidatorFunction = (value: any) => {
      if (this._isEmpty(value)) return null;

      return value.toString().length <= maxLengthValue ? null : { maxLength: true };
    };

    return maxLength;
  };

  /**
   * Checks if value is empty
   * @param value - value to check
   * @returns if is empty returns true, if not returns false
   */
  private static _isEmpty(value: any): boolean {
    return value === null || ((typeof value === 'string' || value instanceof Array) && value.length === 0);
  }
}
