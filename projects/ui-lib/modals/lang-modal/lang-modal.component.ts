import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UiLibLangItemI } from '@lluc_llull/ui-lib/interfaces';
import { mapLangModal } from '@lluc_llull/ui-lib/mapper';

interface LangModalData {
    langs: any[];
    currentLang: string;
}

@Component({
    selector: 'lib-lang-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lang-modal.component.html',
    styleUrl: './lang-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangModalComponent {
    langs!: UiLibLangItemI[];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: LangModalData,
        @Optional() public dialogRef?: MatDialogRef<LangModalComponent>,
    ) {
        this.langs = mapLangModal(data.langs, data.currentLang);
    }

    selectLang(lang: UiLibLangItemI) {
        this.dialogRef?.close(lang);
    }

    closeModal() {
        this.dialogRef?.close();
    }
}
