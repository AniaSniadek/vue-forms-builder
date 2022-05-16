import { AbstractControl, ControlType } from '../models';

export class FormGroup {
  controls: ControlType;

  /**
   * Getter for the controls value
   * @readonly
   * @type {*}
   * @memberof FormGroup
   */
  get value(): any {
    return this._getValueAsObject();
  }

  /**
   * Getter for controls validity
   * @readonly
   * @type {boolean}
   * @memberof FormGroup
   */
  get valid(): boolean {
    return this._checkIsValid();
  }

  /**
   * Getter for the group touched value
   * @readonly
   * @type {boolean}
   * @memberof FormGroup
   */
  get touched(): boolean {
    return this._checkIsTouched();
  }

  /**
   * Initialize the FormGroup instance
   * @param controls - controls for the FormGroup
   */
  constructor(controls: ControlType) {
    this.controls = controls;
  }

  /**
   * Get control by given name
   * @param controlName - name of the control
   * @returns AbstractControl if exist, if not method returns undefined
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
      this.controls[control].markAllAsTouched();
    });
  }

  /**
   * Patches the value of this group
   * @param value - object that matches the structure of the group
   */
  patchValue(value: { [key: string]: any }): void {
    Object.keys(value).forEach((key: string) => {
      this.get(key)?.patchValue(value[key]);
    });
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

  /**
   * Private method for getting controls as object of values
   * @returns object of controls value
   */
  private _getValueAsObject(): any {
    let valueObject: any = {};
    Object.keys(this.controls).forEach((control: string) => {
      valueObject = {
        ...valueObject,
        [control]: this.controls[control].value,
      };
    });

    return valueObject;
  }

  /**
   * Private method for checking touched of the controls in this group
   * @returns true if any control in this group is touched, false if all controls are untouched.
   */
  private _checkIsTouched(): boolean {
    let touched: boolean = false;
    Object.keys(this.controls).forEach((control: string) => {
      if (this.controls[control].touched) {
        touched = true;
      }
    });

    return touched;
  }
}
