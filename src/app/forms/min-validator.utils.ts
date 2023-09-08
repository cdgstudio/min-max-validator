import { AbstractControl, FormControl } from '@angular/forms';

export function hasMinValueValidator(control: AbstractControl): boolean {
  const validator = control.validator;

  if (validator === null) {
    return false;
  }

  const errors = validator(new FormControl(-Infinity)) ?? {};
  return 'min' in errors;
}

export function getMinValueFromValidator(control: AbstractControl, fallback: number): number;
export function getMinValueFromValidator(control: AbstractControl): number | undefined;
export function getMinValueFromValidator(control: AbstractControl, fallback?: number): number | undefined {
  const validator = control.validator;

  if (validator === null) {
    return fallback;
  }

  const errors = validator(new FormControl(-Infinity));
  return errors?.['min']['min'] ?? fallback;
}
