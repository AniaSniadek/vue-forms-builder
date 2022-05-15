# Vue forms builder 🚀

Vue forms builder is a package for handling forms in Vue 3. It is written in Typescript, but you don't need to install Typescript if you want to use this package in a Vue 3 project. Its functionality provides handling of user input events from a view, validates user input and creates a form model. The inspiration for this were Angular Forms, but it is a rather limited version and it was written specifically for Vue 3.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install vue-forms-builder
```

## Demo

Watch the Vue project demo on [StackBlitz ⚡️](https://stackblitz.com/edit/vue-forms-builder-demo) or checkout it source code on [Github 🎓](https://github.com/AniaSniadek/vue-forms-builder-demo).

## Usage

### Create a new form

```js
const form = ref(
  FormBuilder.group({
    phone: [null, [Validators.required, Validators.maxLength(10)]],
    consent: {
      phoneContact: [false, Validators.requiredTrue],
      mailContact: false,
    },
  }),
);
```

### Use form in html

```html
<input type="text" v-model="form.get('phone').value" />
<input type="checkbox" v-model="form.get('consent.phoneContact').value" />
```

### Create a new control

```js
const control = ref(FormBuilder.control(null, Validators.required));
```

### Use control in html

```html
<input type="text" v-model="control.value" />
```

## API

### FormControl

#### Properties

- `touched`: `boolean` - the default value is false.
- `valid`: `boolean` - the default value is true.
- `error`: `ValidationError` - the default value is an empty object.

#### Methods

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

#### Methods

- `valid`: `boolean` - returns controls validity.
- `get(controlName: string)`: `AbstractControl | undefined` - returns FormControl or FormGroup by given name.
- `markAllAsTouched()`: `void` - marks all the controls in this group as touched.
- `patchValue(value: { [key: string]: any })`: `void` - patches the value of this group.
- `reset()`: `void` - resets all the controls in this group to the initial value, setting all of it as untouched, resetting error and setting validators to the initial value.
- `addControl(name: string, control: AbstractControl)`: `void` - add a control to this group.
- `removeControl(name: string)`: `void` - remove a control from this group.
- `contains(name: string)`: `void` - check if this group contains a specific control.

### FormArray

#### Properties

- `controls`: `AbstractControl[]` - controls of the FormArray.

#### Methods

- `length`: `boolean` - returns length of controls.
- `valid`: `boolean` - returns controls validity.
- `at(index: number)`: `AbstractControl` - returns AbstractControl at the given index.
- `push(control: AbstractControl)`: `void` - add a new control at the end of the array of controls.
- `insert(index: number, control: AbstractControl)`: `void` - insert a new control at the given index in the array of controls.
- `removeAt(index: number)`: `void` - remove control at the given index from the array of controls.
- `setControl(index: number, control: AbstractControl)`: `void` - replace an existing control at the given index in the array of controls.
- `reset()`: `void` - resets all the controls in this array to the initial value, setting all of it as untouched, resetting error and setting validators to the initial value.
- `clear()`: `void` - remove all controls from this array.
- `markAllAsTouched()`: `void` - marks all the controls in this array as touched.
- `patchValue(values: any[])`: `void` - patches the value of this array.

### FormBuilder

#### Methods

- `control(value: any, validators?: ValidatorFunction[] | ValidatorFunction)`: `FormControl` - construct a new FormControl instance.
- `group(controls: { [key: string]: any })`: `FormGroup` - construct a new FormGroup instance.
- `array(controls: AbstractControl[])`: `FormArray` - construct a new FormArray instance.

### Validators

#### Methods

- `required`: `ValidationError | null` - requires the control's value to be non-empty.
- `requiredTrue`: `ValidationError | null` - requires the control's value to be true.
- `pattern(pattern: RegExp)`: `ValidatorFunction` - requires the control's value to match a regex pattern.
- `min(min: number)`: `ValidatorFunction` - requires the control's value to be greater than or equal to the provided number.
- `max(max: number)`: `ValidatorFunction` - requires the control's value to be less than or equal to the provided number.
- `minLength(minLength: number)`: `ValidatorFunction` - requires the length of the control's value to be greater than or equal to the provided minimum length.
- `maxLength(maxLength: number)`: `ValidatorFunction` - requires the length of the control's value to be less than or equal to the provided maximum length.

## Custom Validators

It is possible to create custom validators, but each validator should return type `ValidatorFunction` or `ValidationError | null`. Each method should also have a name, it cannot return anonymous functions.

### First example

The method checks if the given value has no white spaces

```js
export class CustomValidators {
  static noWhiteSpace = (value: any): ValidationError | null => {
    return !((value || '').trim().length === 0) ? null : { noWhiteSpace: true };
  };
}
```

Usage

```js
const nameControl = ref(FormBuilder.control(null, CustomValidators.noWhiteSpace));
```

### Second example with passing a value

The method checks if the given value is contained in the specified array

```js
export class CustomValidators {
  static arrayIncludes = (arrayOfValues: any[]): ValidatorFunction => {
    const arrayIncludes: ValidatorFunction = (value: any) => {
      return arrayOfValues.includes(value) ? null : { arrayIncludes: true };
    };

    return arrayIncludes;
  };
}
```

Usage

```js
const names = ['Joe', 'Anna', 'Mike'];
const nameControl = ref(FormBuilder.control(null, CustomValidators.arrayIncludes(names)));
```

## Tests

Everything is covered with unit tests written in [Jest](https://jestjs.io/).

## Questions and bugs

For any bugs or questions [please create an issue](https://github.com/AniaSniadek/vue-forms-builder/issues/new).

## License

Copyright © 2022, [Anna Śniadek 🔥](https://github.com/AniaSniadek).
Released under the [MIT license](https://github.com/AniaSniadek/vue-forms-builder/blob/main/LICENCE).
