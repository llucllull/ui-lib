import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    FormFieldComponent,
    FormInputComponent,
    FormTextareaComponent,
} from '@lluc_llull/ui-lib/forms';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { UiImageComponent } from '@lluc_llull/ui-lib/shared';
import { ContactFormSubmissionI, ContactFormTextsI } from './contact-form.interface';
import { UiIconComponent } from '@lluc_llull/ui-lib/shared';

type ContactField = 'name' | 'email' | 'message';
type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
    selector: 'lib-contact-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormFieldComponent,
        FormInputComponent,
        FormTextareaComponent,
        UiImageComponent,
        UiIconComponent
    ],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.scss',
    host: {
        style: 'display: contents',
    },
})
export class ContactFormComponent {
    @Input({ required: true }) texts!: ContactFormTextsI;
    @Input() privacyUrl = '/es/privacy';
    @Input() img: UiLibImageI | null = null;
    @Output() readonly messageSubmitted = new EventEmitter<ContactFormSubmissionI>();

    readonly status = signal<ContactFormStatus>('idle');
    readonly submissionError = signal('');
    submitted = false;

    readonly form = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)],
        }),
        surname: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(100)],
        }),
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email, Validators.maxLength(254)],
        }),
        phone: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(40)],
        }),
        message: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(5000)],
        }),
        website: new FormControl('', { nonNullable: true }),
    });

    getError(field: ContactField): string {
        const control = this.form.controls[field];
        if (!control.invalid || (!control.touched && !this.submitted)) return '';
        if (control.hasError('required') || control.hasError('pattern')) {
            return this.texts.requiredError;
        }
        if (control.hasError('email')) return this.texts.emailError;
        if (control.hasError('maxlength')) return this.texts.lengthError;
        return this.texts.invalidError;
    }

    submit(): void {
        if (this.status() === 'sending') return;

        this.submitted = true;
        this.status.set('idle');
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.status.set('sending');
        this.messageSubmitted.emit(this.form.getRawValue());
    }

    setSubmissionResult(success: boolean, errorMessage = this.texts.error): void {
        this.status.set(success ? 'success' : 'error');
        this.submissionError.set(success ? '' : errorMessage);
        if (success) {
            this.form.reset();
            this.submitted = false;
        }
    }
}
