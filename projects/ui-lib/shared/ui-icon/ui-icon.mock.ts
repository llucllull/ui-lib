import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-icon',
    standalone: true,
    template: '',
})
export class MockUiIconComponent {
    @Input() name!: string;
    @Input() size = 24;
    @Input() color = 'currentColor';
}