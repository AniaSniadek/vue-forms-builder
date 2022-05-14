import { AbstractControl } from '../models';
import { FormControl } from './FormControl';
import { FormGroup } from './FormGroup';

export class FormArray {
  controls: AbstractControl[];

  get length(): number {
    return this.controls.length;
  }

  get valid(): boolean {
    return this._checkIsValid();
  }

  constructor(controls: AbstractControl[]) {
    this.controls = controls;
  }

  at(index: number): AbstractControl {
    return this.controls[index];
  }

  push(control: AbstractControl): void {
    this.controls.push(control);
  }

  insert(index: number, control: AbstractControl): void {
    this.controls.splice(index, 0, control);
  }

  removeAt(index: number): void {
    this.controls.splice(index, 1);
  }

  setControl(index: number, control: AbstractControl): void {
    if (index > 0 && index <= this.length) {
      this.controls[index] = control;
    } else {
      this.controls.push(control);
    }
  }

  reset(): void {
    this.controls.forEach((control: AbstractControl) => control.reset());
  }

  clear(): void {
    this.controls.splice(0);
  }

  markAllAsTouched(): void {
    this.controls.forEach((control: AbstractControl) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else {
        control.markAllAsTouched();
      }
    });
  }

  patchValue(values: any[]): void {
    values.forEach((value: any, index: number) => {
      if (value instanceof Object || value instanceof Array) {
        (this.controls[index] as FormGroup | FormArray).patchValue(value);
      } else {
        (this.controls[index] as FormControl).setValue(value);
      }
    });
  }

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
