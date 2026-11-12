import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface UiLibSelectOptionI {
    label: string;
    value: string;
    disabled?: boolean;
}

@Component({
    selector: 'lib-form-select',
    standalone: true,
    templateUrl: './form-select.component.html',
    styleUrl: './form-select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectComponent),
            multi: true,
        },
    ],
})
export class FormSelectComponent implements ControlValueAccessor {
    @Input({ required: true }) id = '';
    @Input() options: UiLibSelectOptionI[] = [];
    @Input() placeholder = '';
    @Input() describedBy = '';
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

    handleChange(event: Event): void {
        this.value = (event.target as HTMLSelectElement).value;
        this.onChange(this.value);
    }

    handleBlur(): void {
        this.onTouched();
    }
}
