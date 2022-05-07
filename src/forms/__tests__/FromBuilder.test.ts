import { FormGroup } from './../FormGroup';
import { Validators } from './../Validators';
import { FormControl } from './../FormControl';
import { FormBuilder } from './../FormBuilder';

describe('FormBuilder class', () => {
  it('should created FromBuilder class', () => {
    expect(new FormBuilder()).toBeTruthy();
  });

  it('should construct a new FormControl instance', () => {
    const control: FormControl = FormBuilder.control('test', Validators.required);

    expect(control).toBeTruthy();
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should construct a new FormGroup instance', () => {
    const formGroup: FormGroup = FormBuilder.group({ test: null });

    expect(formGroup).toBeTruthy();
    expect(formGroup).toBeInstanceOf(FormGroup);
  });
});
