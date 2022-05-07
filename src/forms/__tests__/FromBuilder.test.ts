import { FormGroup } from './../FormGroup';
import { Validators } from './../Validators';
import { FormControl } from './../FormControl';
import { FormBuilder } from './../FormBuilder';

describe('FormBuilder class', () => {
  it('should created FromBuilder class', () => {
    expect(new FormBuilder()).toBeTruthy();
  });

  describe('construct a new FormControl instance', () => {
    const control: FormControl = FormBuilder.control('test', Validators.required);

    it('should create a new FormControl', () => {
      expect(control).toBeTruthy();
      expect(control).toBeInstanceOf(FormControl);
    });

    it('new FormControl value should be equal to the specified value', () => {
      expect(control.value).toBe('test');
    });

    it('new FormControl value should have specific validator', () => {
      expect(control.hasValidator(Validators.required)).toBeTruthy();
      expect(control.hasValidator(Validators.requiredTrue)).toBeFalsy();
    });
  });

  describe('construct a new FormGroup instance', () => {
    const formGroup: FormGroup = FormBuilder.group({ test: null });

    it('should create a new FormGroup', () => {
      expect(formGroup).toBeTruthy();
      expect(formGroup).toBeInstanceOf(FormGroup);
    });

    it('group should be valid if no validators', () => {
      expect(formGroup.valid).toBeTruthy();
    });

    it('group should have specific FormControl', () => {
      expect(formGroup.contains('test')).toBeTruthy();
      expect(formGroup.contains('phone')).toBeFalsy();
    });
  });
});
