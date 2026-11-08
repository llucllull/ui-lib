import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-form-field',
    standalone: true,
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.scss',
    host: {
        class: 'form-field',
    },
})
export class FormFieldComponent {
    @Input({ required: true }) controlId = '';
    @Input() label = '';
    @Input() required = false;
    @Input() hint = '';
    @Input() error = '';

    get errorId(): string {
        return `${this.controlId}-error`;
    }

    get hintId(): string {
        return `${this.controlId}-hint`;
    }
}
