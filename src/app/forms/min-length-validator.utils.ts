import { AbstractControl, FormControl } from '@angular/forms';

export function hasMinLengthValidator(control: AbstractControl): boolean {
  const validator = control.validator;

  if (validator === null) {
    return false;
  }

  const errors = validator(new FormControl({ length: 0 })) ?? {};
  return 'minlength' in errors;
}

export function getMinLengthFromValidator(control: AbstractControl, fallback: number): number;
export function getMinLengthFromValidator(control: AbstractControl): number | undefined;
export function getMinLengthFromValidator(control: AbstractControl, fallback?: number): number | undefined {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return fallback;
  }

  const errors = validatorFn(new FormControl({ length: 0 }));
  return errors?.['minlength']['requiredLength'] ?? fallback;
}
