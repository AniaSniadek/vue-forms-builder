# Vue forms builder

Vue forms builder is a package for handling forms in Vue. It is written in Typescript. Its functionality provides handling of user input events from a view, validates user input and creates a form model. It works similar to Angular Forms, but it is a rather limited version and was written specifically for Vue.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install vue-forms-builder --save
```

## Usage

### Create a new form

```js
const form = ref(
  FormBuilder.group({
    phone: [null, [Validators.required, Validators.maxLength(10)]],
    consent: FormBuilder.group({
      phoneContact: [false, Validators.requiredTrue],
      mailContact: false,
    }),
  }),
);
const control = ref(FormBuilder.control(null, Validators.required));
```

### Use form in html

```html
<input type="text" v-model="form.get('phone').value" />
<input type="checkbox" v-model="form.get('consent.phoneContact').value" />

<input type="text" v-model="control.value" />
```

## API

### FormControl

#### Properties

- `touched`: `boolean` - the default value is false.
- `valid`: `boolean` - the default value is true.
- `error`: `ValidationError` - the default value is an empty object.

#### Events

- `setValue(value: any)`: `void` - sets a new value for the control.
- `markAsTouched()`: `void` - marks the control as touched.
- `markAsUntouched()`: `void` - marks the control as untouched.
- `setValidators(validators: ValidatorFunction | ValidatorFunction[])`: `void` - sets validators to this control. If it has any validators, they will be overwritten.
- `addValidators(validators: ValidatorFunction | ValidatorFunction[])`: `void` - add validators to this control. If it has any validators, they will be added to the existing ones.
- `removeValidators(validators: ValidatorFunction | ValidatorFunction[])`: `void` - removes validators from this control.
- `hasValidator(validator: ValidatorFunction)`: `boolean` - checks if validator exist in this control.
- `clearValidators()`: `void` - removes all validators from this control.
- `setError(error: ValidationError)`: `void` - sets error to this control. It also set validation to be falsy.
- `hasError(error: string)`: `boolean` - checks if the control have specified error.
- `reset()`: `void` - resets the control to the initial value, setting it as untouched, resetting error and setting validators to the initial value.

### FormGroup

#### Properties

- `controls`: `ControlType` - controls of the group.

#### Events

- `get(controlName: string)`: `FormControl | FormGroup | undefined` - returns FormControl or FormGroup by given name.
- `markAllAsTouched()`: `void` - marks all the controls in this group as touched.
- `patchValue(value: { [key: string]: any })`: `void` - patches the value of this group.
- `reset()`: `void` - resets all the controls in this group to the initial value, setting all of it as untouched, resetting error and setting validators to the initial value.
- `addControl(name: string, control: FormControl | FormGroup)`: `void` - add a control to this group.
- `removeControl(name: string)`: `void` - remove a control from this group.
- `contains(name: string)`: `void` - check if this group contains a specific control.

### FormBuilder

#### Events

- `control(value: any, validators?: ValidatorFunction[] | ValidatorFunction)`: `FormControl` - construct a new FormControl instance.
- `group(controls: { [key: string]: any })`: `FormGroup` - construct a new FormGroup instance.

### Validators

#### Events

All events returns `ValidationError` or `null`.

- `required` - requires the control's value to be non-empty.
- `requiredTrue` - requires the control's value to be true.
- `pattern(pattern: RegExp)` - requires the control's value to match a regex pattern.
- `min(min: number)` - requires the control's value to be greater than or equal to the provided number.
- `max(max: number)` - requires the control's value to be less than or equal to the provided number.
- `minLength(minLength: number)` - requires the length of the control's value to be greater than or equal to the provided minimum length.
- `maxLength(maxLength: number)` - requires the length of the control's value to be less than or equal to the provided maximum length.

## Questions and bugs

For bugs and questions [please create an issue](https://github.com/AniaSniadek/vue-forms-builder/issues/new).

## License

Copyright © 2022, [Anna Śniadek](https://github.com/AniaSniadek).
Released under the [MIT license](https://github.com/AniaSniadek/vue-forms-builder/blob/main/LICENCE).
