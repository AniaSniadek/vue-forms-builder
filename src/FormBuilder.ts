import { FormGroup } from './FormGroup'
import { FormControl } from './FormControl'
import type { ValidatorFunction } from './Validators'

export class FormBuilder {
  /**
   * Construct a new FormControl instance
   * @param value - value for the FormControl
   * @param validators - validator or array of validators for the control
   * @returns new FormControl instance
   */
  static control = (
    value: any,
    validators?: ValidatorFunction[] | ValidatorFunction
  ): FormControl => {
    return new FormControl(value, validators)
  }

  /**
   * Construct a new FormGroup instance
   * @param controls - controls for FromGroup
   * @returns new FormGroup instance
   */
  static group = (controls: { [key: string]: any }): FormGroup => {
    let formGroup: any = {}
    let value: any = null
    let validators: ValidatorFunction[] | ValidatorFunction | null = null
    for (const control in controls) {
      const controlElement: any = controls[control]
      if (controlElement instanceof FormGroup) {
        formGroup = {
          ...formGroup,
          [control]: controlElement
        }
      } else {
        if (controlElement instanceof Array && controlElement.length > 1) {
          value = controlElement[0]
          validators = controlElement[1]
        } else {
          value =
            controlElement instanceof Array ? controlElement[0] : controlElement
          validators = null
        }
        formGroup = {
          ...formGroup,
          [control]: validators
            ? this.control(value, validators)
            : this.control(value)
        }
      }
    }
    return new FormGroup(formGroup)
  }
}
