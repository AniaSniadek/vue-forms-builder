import { Validators } from './../Validators';
import { FormControl } from './../FormControl';

describe('FormControl class', () => {
  describe('initialize the FormControl instance', () => {
    const control: FormControl = new FormControl('test', Validators.minLength(5));
    const controlNoValidator: FormControl = new FormControl(true);

    it('should created FormControl class', () => {
      expect(control).toBeTruthy();
      expect(control).toBeInstanceOf(FormControl);
    });

    it('should be untouched on initialization', () => {
      expect(control.touched).toBeFalsy();
    });

    it('value should be equal to the specified value', () => {
      expect(control.value).toBe('test');
    });

    it('should have specific validator', () => {
      expect(control.hasValidator(Validators.minLength(5))).toBeTruthy();
      expect(control.hasValidator(Validators.requiredTrue)).toBeFalsy();
    });

    it('should be invalid if has validators', () => {
      expect(control.valid).toBeFalsy();
    });

    it('should be valid if no validators', () => {
      expect(controlNoValidator.valid).toBeTruthy();
    });

    it('should has error if has validators and the value does not meet the requirements', () => {
      expect(control.error).toMatchObject({ minLength: true });
      expect(control.error).not.toMatchObject({ pattern: true });
    });

    it('should be touched when set value', () => {
      control.setValue('new value to set');
      expect(control.touched).toBeTruthy();
    });

    it('should has error when set or add new validator and the value does not meet the requirements', () => {
      control.setValidators(Validators.maxLength(10));
      expect(control.error).toMatchObject({ maxLength: true });

      control.setValue(1);
      control.addValidators(Validators.min(5));
      expect(control.error).toMatchObject({ min: true });
    });

    it('hasError() should return true when control has specific error, if not should return false', () => {
      expect(control.hasError('min')).toBeTruthy();
      expect(control.hasError('maxLength')).toBeFalsy();
    });

    it('should be valid if clear validators', () => {
      control.clearValidators();
      expect(control.valid).toBeTruthy();
    });

    it('should have default value when reset', () => {
      control.reset();
      expect(control.value).toBe('test');
    });
  });
});
