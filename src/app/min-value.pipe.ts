import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getMinValueFromValidator } from './forms/min-validator.utils';

@Pipe({
  name: 'minValue',
  standalone: true,
})
export class MinValuePipe implements PipeTransform {
  transform(control: AbstractControl<number>): number {
    return getMinValueFromValidator(control, 0);
  }
}
