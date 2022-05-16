import { AbstractControl } from '../models';
export class FormArray {
  controls: AbstractControl[];

  /**
   * Getter for the length of controls
   * @readonly
   * @type {number}
   * @memberof FormArray
   */
  get length(): number {
    return this.controls.length;
  }

  /**
   * Getter for the controls value
   * @readonly
   * @type {any[]}
   * @memberof FormArray
   */
  get value(): any[] {
    return this._getValueAsArray();
  }

  /**
   * Getter for controls validity
   * @readonly
   * @type {boolean}
   * @memberof FormArray
   */
  get valid(): boolean {
    return this._checkIsValid();
  }

  /**
   * Getter for the array touched value
   * @readonly
   * @type {boolean}
   * @memberof FormArray
   */
  get touched(): boolean {
    return this._checkIsTouched();
  }

  /**
   * Initialize the FormArray instance
   * @param controls - controls for the FormArray
   */
  constructor(controls: AbstractControl[]) {
    this.controls = controls;
  }

  /**
   * Get control at the given index in the array of controls
   * @param index - the index number of the control
   * @returns AbstractControl at the given index
   */
  at(index: number): AbstractControl {
    return this.controls[index];
  }

  /**
   * Add a new control at the end of the array of controls
   * @param control - new AbstractControl
   */
  push(control: AbstractControl): void {
    this.controls.push(control);
  }

  /**
   * Insert a new control at the given index in the array of controls
   * @param index - index number where we want to insert the control
   * @param control - new AbstractControl
   */
  insert(index: number, control: AbstractControl): void {
    this.controls.splice(index, 0, control);
  }

  /**
   * Remove control at the given index from the array of controls
   * @param index - the index number of the control we want to delete
   */
  removeAt(index: number): void {
    this.controls.splice(index, 1);
  }

  /**
   * Replace an existing control at the given index in the array of controls
   * @param index - the index number of the control we want to replace
   * @param control - new AbstractControl
   */
  setControl(index: number, control: AbstractControl): void {
    if (index > 0 && index <= this.length) {
      this.controls[index] = control;
    } else {
      this.controls.push(control);
    }
  }

  /**
   * Resets all the controls in this array to the initial value,
   * setting all of it as untouched, resetting error
   * and setting validators to the initial value
   */
  reset(): void {
    this.controls.forEach((control: AbstractControl) => control.reset());
  }

  /**
   * Remove all controls from this array
   */
  clear(): void {
    this.controls.splice(0);
  }

  /**
   * Marks all the controls in this array as touched
   */
  markAllAsTouched(): void {
    this.controls.forEach((control: AbstractControl) => {
      control.markAllAsTouched();
    });
  }

  /**
   * Patches the value of this array
   * @param values - array of values for the controls
   */
  patchValue(values: any[]): void {
    values.forEach((value: any, index: number) => {
      this.controls[index]?.patchValue(value);
    });
  }

  /**
   * Private method for checking validaty of the controls
   * @returns if all controls are valid returns true, if not return false
   */
  private _checkIsValid(): boolean {
    let valid: boolean = true;
    this.controls.forEach((control: AbstractControl) => {
      if (!control.valid) {
        valid = false;
      }
    });
    return valid;
  }

  /**
   * Private method for getting controls as array of values
   * @returns array of controls value
   */
  private _getValueAsArray(): any[] {
    return this.controls.map((control: AbstractControl) => control.value);
  }

  /**
   * Private method for checking touched of the controls in this array
   * @returns true if any control in this array is touched, false if all controls are untouched.
   */
  private _checkIsTouched(): boolean {
    let touched: boolean = false;
    this.controls.forEach((control: AbstractControl) => {
      if (control.touched) {
        touched = true;
      }
    });
    return touched;
  }
}
