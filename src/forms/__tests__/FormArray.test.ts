import { FormGroup } from './../FormGroup';
import { FormControl } from './../FormControl';
import { FormArray } from './../FormArray';
import { Validators } from '../Validators';

describe('FormArray class', () => {
  describe('initialize the FormArray instance', () => {
    const formArray: FormArray = new FormArray([
      new FormControl(null, Validators.required),
      new FormGroup({
        name: new FormControl('Test'),
      }),
    ]);
    const formArrayNoValidators: FormArray = new FormArray([new FormControl(null)]);

    it('should created FormArray class', () => {
      expect(formArray).toBeTruthy();
      expect(formArray).toBeInstanceOf(FormArray);
    });

    it('array should be invalid if any control has validator', () => {
      expect(formArray.valid).toBeFalsy();
    });

    it('array should be valid if no validators', () => {
      expect(formArrayNoValidators.valid).toBeTruthy();
    });

    it('array should have length number 2', () => {
      expect(formArray.length).toBe(2);
    });

    it('should return a specific control by the given index', () => {
      const control: FormControl = new FormControl(null, Validators.required);
      expect(formArray.at(0)).toBeInstanceOf(FormControl);
      expect(formArray.at(0)).toStrictEqual(control);
    });

    it('array should have length number 3 when push new control', () => {
      formArray.push(new FormControl(null, Validators.required));
      expect(formArray.length).toBe(3);
    });

    it('array should have length number 2 when remove control', () => {
      formArray.removeAt(2);
      expect(formArray.length).toBe(2);
    });

    it('array should have a new control at the given index', () => {
      const control: FormControl = new FormControl('test');
      formArray.insert(1, control);
      expect(formArray.controls[1] as FormControl).toStrictEqual(control);
    });

    it('control should be equal to the new one when called setControl() at the specific index', () => {
      const control: FormControl = new FormControl('replace');
      formArray.setControl(1, control);
      expect(formArray.controls[1] as FormControl).toStrictEqual(control);
    });

    it('control shoud be touched when call markAllAsTouched()', () => {
      formArray.markAllAsTouched();
      expect((formArray.controls[0] as FormControl).touched).toBeTruthy();
    });

    it('control should have a new value when call patchValue()', () => {
      formArray.patchValue(['new value']);
      expect((formArray.controls[0] as FormControl).value).toBe('new value');
    });

    it('control shoud have default value when reset all', () => {
      formArray.reset();
      expect((formArray.controls[0] as FormControl).value).toBe(null);
    });

    it('array should be empty when clear', () => {
      formArray.clear();
      expect(formArray.controls).toStrictEqual([]);
      expect(formArray.length).toBe(0);
    });
  });
});
