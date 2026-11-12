import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'lib-form-textarea',
    standalone: true,
    templateUrl: './form-textarea.component.html',
    styleUrl: './form-textarea.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormTextareaComponent),
            multi: true,
        },
    ],
})
export class FormTextareaComponent implements ControlValueAccessor {
    @Input({ required: true }) id = '';
    @Input() placeholder = '';
    @Input() describedBy = '';
    @Input() rows = 6;
    @Input() maxLength: number | null = null;
    @Input() required = false;
    @Input() invalid = false;
    @Input() showCounter = false;

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
        this.value = (event.target as HTMLTextAreaElement).value;
        this.onChange(this.value);
    }

    handleBlur(): void {
        this.onTouched();
    }
}
