import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type UiLibInputType = 'text' | 'email' | 'tel' | 'url' | 'search' | 'password';

@Component({
    selector: 'lib-form-input',
    standalone: true,
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInputComponent),
            multi: true,
        },
    ],
})
export class FormInputComponent implements ControlValueAccessor {
    @Input({ required: true }) id = '';
    @Input() type: UiLibInputType = 'text';
    @Input() placeholder = '';
    @Input() autocomplete = '';
    @Input() describedBy = '';
    @Input() maxLength: number | null = null;
    @Input() required = false;
    @Input() invalid = false;

    value = '';
    disabled = false;
    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: string | null): void {
        this.value = value ?? '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    handleInput(event: Event): void {
        this.value = (event.target as HTMLInputElement).value;
        this.onChange(this.value);
    }

    handleBlur(): void {
        this.onTouched();
    }
}
