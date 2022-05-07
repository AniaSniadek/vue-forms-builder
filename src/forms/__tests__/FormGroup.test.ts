import { Validators } from '../Validators';
import { FormControl } from './../FormControl';
import { FormGroup } from './../FormGroup';

describe('FormGroup class', () => {
  describe('initialize the FormGroup instance', () => {
    const formGroup: FormGroup = new FormGroup({ name: new FormControl(null, Validators.required) });
    const formGroupNoValidators: FormGroup = new FormGroup({ name: new FormControl(null) });

    it('should created FormGroup class', () => {
      expect(formGroup).toBeTruthy();
      expect(formGroup).toBeInstanceOf(FormGroup);
    });

    it('group should be invalid if any control has validator', () => {
      expect(formGroup.valid).toBeFalsy();
    });

    it('group should be valid if no validators', () => {
      expect(formGroupNoValidators.valid).toBeTruthy();
    });

    it('group should have specific FormControl', () => {
      expect(formGroup.contains('name')).toBeTruthy();
      expect(formGroup.contains('phone')).toBeFalsy();
    });

    it('should return a specific FormControl when get by control name', () => {
      expect(formGroup.get('name')).toBeInstanceOf(FormControl);
      expect(formGroup.get('phone')).toBe(undefined);
    });

    it('control shoud be touched when call markAllAsTouched()', () => {
      formGroup.markAllAsTouched();
      expect((formGroup.get('name') as FormControl).touched).toBeTruthy();
    });

    it('control should have a new value when call patchValue()', () => {
      formGroup.patchValue({
        name: 'new value',
      });
      expect((formGroup.get('name') as FormControl).value).toBe('new value');
    });

    it('control shoud have default value when reset all', () => {
      formGroup.reset();
      expect((formGroup.get('name') as FormControl).value).toBe(null);
    });

    it('should have new control when call addControl', () => {
      formGroup.addControl('test', new FormControl(null));
      expect(formGroup.contains('test')).toBeTruthy();
    });

    it('should not have control when call removeControl', () => {
      formGroup.removeControl('test');
      expect(formGroup.contains('test')).toBeFalsy();
    });
  });
});
