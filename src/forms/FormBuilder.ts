import { ValidatorFunction, ControlType, AbstractControl } from '../models';
import { FormArray } from './FormArray';
import { FormControl } from './FormControl';
import { FormGroup } from './FormGroup';

export class FormBuilder {
  /**
   * Construct a new FormControl instance
   * @param value - value for the FormControl
   * @param validators - validator or array of validators for the control
   * @returns new FormControl instance
   */
  static control = (value: any, validators?: ValidatorFunction[] | ValidatorFunction): FormControl => {
    return new FormControl(value, validators);
  };

  /**
   * Construct a new FormGroup instance
   * @param controls - controls for FromGroup
   * @returns new FormGroup instance
   */
  static group = (controls: { [key: string]: any }): FormGroup => {
    let formGroup: ControlType = {};
    let value: any = null;
    let validators: ValidatorFunction[] | ValidatorFunction | null = null;

    Object.keys(controls).forEach((control: string) => {
      const controlElement: any = controls[control];

      if (
        controlElement instanceof FormGroup ||
        controlElement instanceof FormControl ||
        controlElement instanceof FormArray
      ) {
        formGroup = {
          ...formGroup,
          [control]: controlElement,
        };
      } else if (controlElement instanceof Object && !(controlElement instanceof Array)) {
        formGroup = {
          ...formGroup,
          [control]: this.group(controlElement),
        };
      } else {
        if (controlElement instanceof Array && controlElement.length > 1) {
          value = controlElement[0];
          validators = controlElement[1];
        } else {
          value = controlElement instanceof Array ? controlElement[0] : controlElement;
          validators = null;
        }

        formGroup = {
          ...formGroup,
          [control]: validators ? this.control(value, validators) : this.control(value),
        };
      }
    });

    return new FormGroup(formGroup);
  };

  /**
   * Construct a new FormArray instance
   * @param controls - controls for FromArray as AbstractControl array
   * @returns new FormArray instance
   */
  static array = (controls: AbstractControl[]): FormArray => {
    return new FormArray(controls);
  };
}
