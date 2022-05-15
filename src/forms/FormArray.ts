import { AbstractControl } from '../models';
import { FormControl } from './FormControl';
import { FormGroup } from './FormGroup';

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
   * Getter for controls validity
   * @readonly
   * @type {boolean}
   * @memberof FormArray
   */
  get valid(): boolean {
    return this._checkIsValid();
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
   * Remove all controls from this FormArray
   */
  clear(): void {
    this.controls.splice(0);
  }

  /**
   * Marks all the controls in this array as touched
   */
  markAllAsTouched(): void {
    this.controls.forEach((control: AbstractControl) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else {
        control.markAllAsTouched();
      }
    });
  }

  /**
   * Patches the value of this array
   * @param values - array of values for the controls
   */
  patchValue(values: any[]): void {
    values.forEach((value: any, index: number) => {
      if (value instanceof Object || value instanceof Array) {
        (this.controls[index] as FormGroup | FormArray).patchValue(value);
      } else {
        (this.controls[index] as FormControl).setValue(value);
      }
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
}
