import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Injector,
  Input,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { getMaxLengthFromValidator } from './forms/max-length-validator.utils';

@Component({
  selector: 'app-max-length-hint',
  standalone: true,
  template: ` {{ currentLength() }}/{{ maxLengthValue }} `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        @apply block text-end text-xs text-gray-500 text-end;
      }

      :host.invalid {
        @apply text-red-600;
      }
    `,
  ],
})
export class MaxLengthHintComponent implements OnInit {
  @Input({ required: true }) control!: AbstractControl<string>;

  protected maxLengthValue = 0;
  protected currentLength = computed(() => 0);
  private injector = inject(Injector);

  ngOnInit(): void {
    this.maxLengthValue = getMaxLengthFromValidator(this.control, 0);

    const source$ = this.control.valueChanges.pipe(
      startWith(this.control.value),
      map((value) => value.length)
    );

    this.currentLength = toSignal(source$, {
      initialValue: 0,
      injector: this.injector,
    });
  }

  @HostBinding('class.invalid') get moreThanMax(): boolean {
    return this.currentLength() > this.maxLengthValue;
  }
}
