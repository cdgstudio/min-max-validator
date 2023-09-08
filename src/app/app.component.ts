import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaxLengthHintComponent } from './max-length-hint.component';
import { MinValuePipe } from './min-value.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <form [formGroup]="form">
      <div class="mb-3">
        <label for="title" class="text-gray-300"> Title </label>
        <input
          type="text"
          class="form-control"
          id="title"
          formControlName="title"
          autocomplete="off"
          placeholder="Provide title"
        />
        <app-max-length-hint [control]="form.controls.title" class="mt-2" />
      </div>

      <div class="mb-3">
        <label for="age" class="text-gray-300"> Age </label>
        <input
          type="number"
          class="form-control"
          id="age"
          formControlName="age"
          autocomplete="off"
          placeholder="Provide age"
          [min]="form.controls.age | minValue"
        />
        <label
          for="age"
          class="mt-2 block text-end text-xs text-gray-500 text-end;"
          [class.text-red-600]="form.controls.age.hasError('min')"
        >
          You have to be older than {{ form.controls.age | minValue }}
        </label>
      </div>
    </form>
  `,
  styles: [
    `
      :host {
        @apply block container my-5;
      }

      .form-control {
        @apply border text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500;
      }

      label {
        @apply block mb-2;
      }
    `,
  ],
  imports: [ReactiveFormsModule, MaxLengthHintComponent, MinValuePipe, NgIf],
})
export class AppComponent {
  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(15)],
    }),
    age: new FormControl<number>(null!, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(18)],
    }),
  });
}
