import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'lib-form-toggle',
    standalone: true,
    templateUrl: './form-toggle.component.html',
    styleUrl: './form-toggle.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormToggleComponent),
            multi: true,
        },
    ],
})
export class FormToggleComponent implements ControlValueAccessor {
    @Input({ required: true }) id = '';
    @Input() describedBy = '';

    checked = false;
    disabled = false;
    private onChange: (value: boolean) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: boolean | null): void {
        this.checked = value ?? false;
    }

    registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    handleChange(event: Event): void {
        this.checked = (event.target as HTMLInputElement).checked;
        this.onChange(this.checked);
    }

    handleBlur(): void {
        this.onTouched();
    }
}
