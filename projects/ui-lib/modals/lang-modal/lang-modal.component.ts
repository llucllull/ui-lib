import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UiLibLangItemI } from '@lluc_llull/ui-lib/interfaces';

@Component({
    selector: 'lib-lang-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lang-modal.component.html',
    styleUrl: './lang-modal.component.scss',
    host: {
        '[class.is-closing]': 'closing',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangModalComponent {
    @Input() langs: UiLibLangItemI[] = [];
    @Input() closing = false;

    @Output() close = new EventEmitter<void>();
    @Output() select = new EventEmitter<UiLibLangItemI>();

    selectLang(lang: UiLibLangItemI) {
        this.select.emit(lang);
    }

    closeModal() {
        this.close.emit();
    }
}
