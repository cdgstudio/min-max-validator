import { AbstractControl, FormControl } from '@angular/forms';

export function hasMaxLengthValidator(control: AbstractControl): boolean {
  const validator = control.validator;

  if (validator === null) {
    return false;
  }

  const errors = validator(new FormControl({ length: Infinity })) ?? {};
  return 'maxlength' in errors;
}

export function getMaxLengthFromValidator(control: AbstractControl, fallback: number): number;
export function getMaxLengthFromValidator(control: AbstractControl): number | undefined;
export function getMaxLengthFromValidator(control: AbstractControl, fallback?: number): number | undefined {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return fallback;
  }

  const errors = validatorFn(new FormControl({ length: Infinity }));
  return errors?.['maxlength']['requiredLength'] ?? fallback;
}
