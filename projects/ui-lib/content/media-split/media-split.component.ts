import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';

@Component({
  selector: 'lib-media-split',
  imports: [CommonModule],
  templateUrl: './media-split.component.html',
  styleUrl: './media-split.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSplitComponent {
    @Input() title?: string;
    @Input() text?: string;
    @Input() images?: UiLibImageI[];

    activeImageIndex = signal(0);

    updateActiveImage(index: number) {
      this.activeImageIndex.set(index);
    }

    resetImage() {
      this.activeImageIndex.set(0);
    }
}
