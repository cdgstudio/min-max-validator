import { AbstractControl, FormControl } from '@angular/forms';

export function hasControlMaxValidator(control: AbstractControl): boolean {
  const validator = control.validator;

  if (validator === null) {
    return false;
  }

  const errors = validator(new FormControl(Infinity)) ?? {};
  return 'max' in errors;
}

export function getMaxValue(control: AbstractControl, fallback: number): number;
export function getMaxValue(control: AbstractControl): number | undefined;
export function getMaxValue(
  control: AbstractControl,
  fallback?: number
): number | undefined {
  const validator = control.validator;

  if (validator === null) {
    return fallback;
  }

  const errors = validator(new FormControl(Infinity)) ?? {};
  return 'max' in errors ? errors['max']['max'] : fallback;
}
