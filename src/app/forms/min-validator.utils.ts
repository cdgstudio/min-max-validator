import { AbstractControl, FormControl } from '@angular/forms';

export function hasControlMinValidator(control: AbstractControl): boolean {
  const validator = control.validator;

  if (validator === null) {
    return false;
  }

  const errors = validator(new FormControl(-Infinity)) ?? {};
  return 'min' in errors;
}

export function getMinValue(control: AbstractControl, fallback: number): number;
export function getMinValue(control: AbstractControl): number | undefined;
export function getMinValue(
  control: AbstractControl,
  fallback?: number
): number | undefined {
  const validator = control.validator;

  if (validator === null) {
    return fallback;
  }

  const errors = validator(new FormControl(-Infinity)) ?? {};
  return 'min' in errors ? errors['min']['min'] : fallback;
}
