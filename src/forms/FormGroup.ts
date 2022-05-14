import { AbstractControl, ControlType } from '../models';
import { FormArray } from './FormArray';
import { FormControl } from './FormControl';

export class FormGroup {
  controls: ControlType;

  /**
   * Getter for this group validaty
   * @readonly
   * @type {boolean}
   * @memberof FormGroup
   */
  get valid(): boolean {
    return this._checkIsValid();
  }

  /**
   * Initialize the FormGroup instance.
   * @param controls - controls for the FormGroup
   */
  constructor(controls: ControlType) {
    this.controls = controls;
  }

  /**
   * Returns FormControl or FormGroup by given name
   * @param controlName - name of the control
   * @returns if control exist returns it
   */
  get(controlName: string, formGroup?: FormGroup): AbstractControl | undefined {
    const controls: ControlType = formGroup?.controls || this.controls;
    const controlNameArray: string[] = controlName.split('.');

    for (const control in controls) {
      if (controls.hasOwnProperty(control)) {
        const controlElement: AbstractControl = controls[control];

        if (control === controlNameArray[0]) {
          if (controlNameArray.length === 1) {
            return controlElement;
          } else {
            controlNameArray.shift();
            return this.get(controlNameArray.join('.'), controlElement as FormGroup);
          }
        }
      }
    }
  }

  /**
   * Marks all the controls in this group as touched
   */
  markAllAsTouched(): void {
    Object.keys(this.controls).forEach((control: string) => {
      const controlElement: AbstractControl = this.controls[control];

      if (controlElement instanceof FormControl) {
        controlElement.markAsTouched();
      } else {
        controlElement.markAllAsTouched();
      }
    });
  }

  /**
   * Patches the value of this group
   * @param value - object that matches the structure of the group
   */
  patchValue(value: { [key: string]: any }): void {
    for (const key in value) {
      if (value[key] instanceof Object || value[key] instanceof Array) {
        (this.get(key) as FormGroup | FormArray)?.patchValue(value[key]);
      } else {
        (this.get(key) as FormControl)?.setValue(value[key]);
      }
    }
  }

  /**
   * Resets all the controls in this group to the initial value,
   * setting all of it as untouched, resetting error
   * and setting validators to the initial value
   */
  reset(): void {
    Object.keys(this.controls).forEach((control: string) => {
      this.controls[control].reset();
    });
  }

  /**
   * Add a control to this group
   * @param name - name of a new control
   * @param control - control for the given name
   */
  addControl(name: string, control: AbstractControl): void {
    this.controls[name] = control;
  }

  /**
   * Remove a control from this group
   * @param name - name of a control to be removed
   */
  removeControl(name: string): void {
    delete this.controls[name];
  }

  /**
   * Check if this group contains a specific control
   * @param name - name of a control
   * @returns if control exist returns true, if not returns false
   */
  contains(name: string): boolean {
    return this.controls[name] !== undefined;
  }

  /**
   * Private method for checking validaty of the controls in this group
   * @returns if all controls are valid returns true, if not return false
   */
  private _checkIsValid(): boolean {
    let valid: boolean = true;
    for (const control in this.controls) {
      if (!this.controls[control].valid) {
        valid = false;
      }
    }
    return valid;
  }
}
