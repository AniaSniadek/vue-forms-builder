import { ValidationErrors, ValidatorFunction } from '../models'

export class Validators {
  /**
   * Requires the control's value to be non-empty
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * required property as true
   */
  static required = (value: any): ValidationErrors | null => {
    return !this._isEmpty(value) ? null : { required: true }
  }

  /**
   * Requires the control's value to be true
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * required property as true
   */
  static requiredTrue = (value: any): ValidationErrors | null => {
    return value === true ? null : { required: true }
  }

  /**
   * Requires the control's value to match a regex pattern
   * @param pattern - provided regex pattern
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * pattern property as true
   */
  static pattern = (pattern: RegExp): ValidatorFunction => {
    return (value: any) => {
      if (this._isEmpty(value)) return null

      return pattern.test(value) ? null : { pattern: true }
    }
  }

  /**
   * Requires the control's value to be greater than or equal to the provided number.
   * @param min - provided min number
   * @returns null if control's value meets the
   * requirements, if not returns an error object with min
   * property as true
   */
  static min = (min: number): ValidatorFunction => {
    return (value: any) => {
      if (this._isEmpty(value)) return null

      return value >= min ? null : { min: true }
    }
  }

  /**
   * Requires the control's value to be less than or equal to the provided number.
   * @param max - provided max number
   * @returns null if control's value meets the
   * requirements, if not returns an error object with max
   * property as true
   */
  static max = (max: number): ValidatorFunction => {
    return (value: any) => {
      if (this._isEmpty(value)) return null

      return value <= max ? null : { max: true }
    }
  }

  /**
   * Requires the length of the control's value to be
   * greater than or equal to the provided minimum length
   * @param minLength - provided minimum length
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * minLength property as true
   */
  static minLength = (minLength: number): ValidatorFunction => {
    return (value: any) => {
      if (this._isEmpty(value)) return null

      return value?.length >= minLength ? null : { minLength: true }
    }
  }

  /**
   * Requires the length of the control's value to be
   * less than or equal to the provided maximum length
   * @param maxLength - provided maximum length
   * @returns null if control's value meets the
   * requirements, if not returns an error object with
   * maxLength property as true
   */
  static maxLength = (maxLength: number): ValidatorFunction => {
    return (value: any) => {
      if (this._isEmpty(value)) return null

      return value.length <= maxLength ? null : { maxLength: true }
    }
  }

  /**
   * Checks if value is empty
   * @param value - value to check
   * @returns if is empty returns true, if not returns false
   */
  private static _isEmpty(value: any): boolean {
    return (
      value === null ||
      ((typeof value === 'string' || value instanceof Array) &&
        value.length === 0)
    )
  }
}
