import { ValidationError, ValidatorFunction } from '../models';

export class FormControl {
  private _value: any = null;
  private _cachedValue: any;
  private _validators: ValidatorFunction[] = [];
  touched = false;
  valid = true;
  error: ValidationError = {};

  /**
   * Setter for the control value
   * @memberof FormControl
   */
  set value(value: any) {
    this._value = value;
    this.markAsTouched();
  }

  /**
   * Getter for the control value
   * @type {*}
   * @memberof FormControl
   */
  get value(): any {
    return this._value;
  }

  /**
   * Initialize the FormControl instance.
   * @param value - value for the control
   * @param validators - validator or array of validators for the control
   */
  constructor(value: any, validators?: ValidatorFunction[] | ValidatorFunction) {
    this._value = value;
    this._cachedValue = JSON.parse(JSON.stringify(value));

    if (validators) {
      this._validators = validators instanceof Array ? validators : [validators];
      this._validateControl();
    }
  }

  /**
   * Sets a new value for the control
   * @param value - new value
   */
  setValue(value: any): void {
    this.value = value;
  }

  /**
   * Marks the control as touched
   */
  markAsTouched(): void {
    this.touched = true;
    if (this._validators.length) {
      this._validateControl();
    }
  }

  /**
   * Marks the control as untouched
   */
  markAsUntouched(): void {
    this.touched = false;
  }

  /**
   * Sets validators to this control
   * If it has any validators, they will be overwritten
   * @param validators - new validator or array of validators
   */
  setValidators(validators: ValidatorFunction | ValidatorFunction[]): void {
    this._validators = validators instanceof Array ? validators : [validators];
    this._validateControl();
  }

  /**
   * Add validators to this control
   * If it has any validators, they will be added to the existing ones
   * @param validators - new validator or array of validators
   */
  addValidators(validators: ValidatorFunction | ValidatorFunction[]): void {
    if (validators instanceof Array) {
      this._validators = this._validators.concat(validators);
    } else {
      this._validators.push(validators);
    }
    this._validateControl();
  }

  /**
   * Removes validators from this control
   * @param validators - validator or array of validators to be removed
   */
  removeValidators(validators: ValidatorFunction | ValidatorFunction[]): void {
    if (validators instanceof Array) {
      validators.forEach((validator: ValidatorFunction) => this._removeValidator(validator));
    } else {
      this._removeValidator(validators);
    }
    this._validateControl();
  }

  /**
   * Checks if validator exist in this control
   * @param validators - validator to check
   * @returns if validator exist returns true, if not returns false
   */
  hasValidator(validator: ValidatorFunction): boolean {
    let isFound: boolean = false;
    this._validators.forEach((validatorItem: ValidatorFunction) => {
      if (validatorItem.toString() === validator.toString()) {
        isFound = true;
      }
    });
    return isFound;
  }

  /**
   * Removes all validators from this control
   */
  clearValidators(): void {
    this._validators = [];
    this._validateControl();
  }

  /**
   * Sets error to this control
   * It also set validation to be falsy
   * @param error - error to be set
   */
  setError(error: ValidationError): void {
    this.error = error;
    this.valid = false;
  }

  /**
   * Checks if the control have specified error
   * @param error - name of error
   * @returns if error exist returns true, if not returns false
   */
  hasError(error: string): boolean {
    return this.error[error];
  }

  /**
   * Resets the control to the initial value,
   * setting it as untouched, resetting error
   * and setting validators to the initial value
   */
  reset(): void {
    this.value = this._cachedValue;
    this.markAsUntouched();
    this.valid = !this._validators.length;
    this.error = {};
  }

  /**
   * Private method that checks if the control is valid
   * and setting error and control validity
   */
  private _validateControl(): void {
    let isFound: boolean = false;
    this.error = {};
    this._validators.forEach((validator: ValidatorFunction) => {
      if (!isFound) {
        const error: ValidationError | null = validator(this._value);
        if (error) {
          this.error = error;
          isFound = true;
        }
      }
    });
    this.valid = Object.keys(this.error).length === 0;
  }

  /**
   * Private method for removing validator from the control
   * @param validator - validator to be removed
   */
  private _removeValidator(validator: ValidatorFunction): void {
    const index: number = this._validators.indexOf(validator);
    if (index > -1) {
      this._validators.splice(index, 1);
    }
  }
}
