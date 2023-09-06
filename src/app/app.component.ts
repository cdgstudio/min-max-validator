import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaxLengthHintComponent } from './forms/max-length-hint.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <form [formGroup]="form">
      <div class="mb-3">
        <label for="title"> Title </label>
        <input
          type="text"
          class="form-control"
          id="title"
          formControlName="title"
          autocomplete="off"
        />
        <app-max-length-hint [control]="form.controls.title" />
      </div>

      <div class="mb-3">
        <label for="content"> Content </label>
        <textarea
          class="form-control"
          id="content"
          formControlName="content"
          autocomplete="off"
        ></textarea>
        <app-max-length-hint [control]="form.controls.content" />
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

      button {
        @apply text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:bg-gray-500;
      }

      label {
        @apply block mb-2 text-sm font-medium text-gray-300;
      }
    `,
  ],
  imports: [ReactiveFormsModule, MaxLengthHintComponent],
})
export class AppComponent {
  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.max(15)],
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.max(50)],
    }),
  });
}
