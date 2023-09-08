import { AbstractControl, FormControl } from '@angular/forms';

export function hasMaxValueValidator(control: AbstractControl): boolean {
  const validator = control.validator;

  if (validator === null) {
    return false;
  }

  const errors = validator(new FormControl(Infinity)) ?? {};
  return 'max' in errors;
}

export function getMaxValueFromValidator(control: AbstractControl, fallback: number): number;
export function getMaxValueFromValidator(control: AbstractControl): number | undefined;
export function getMaxValueFromValidator(control: AbstractControl, fallback?: number): number | undefined {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return fallback;
  }

  const errors = validatorFn(new FormControl(Infinity));
  return errors?.['max']['max'] ?? fallback;
}
