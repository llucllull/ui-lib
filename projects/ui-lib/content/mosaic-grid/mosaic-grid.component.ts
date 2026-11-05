import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ScrollRevealDirective } from '@lluc_llull/ui-lib/directives';
import { UiLibImageI } from '@lluc_llull/ui-lib/interfaces';
import { UiImageComponent } from '@lluc_llull/ui-lib/shared';

@Component({
  selector: 'lib-mosaic-grid',
  imports: [CommonModule, UiImageComponent, ScrollRevealDirective],
  templateUrl: './mosaic-grid.component.html',
  styleUrl: './mosaic-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      style: 'display: contents',
  },
})
export class MosaicGridComponent implements OnInit{
  @Input() text?: string;
  @Input() images?: UiLibImageI[];

  imageGroups: { row1: UiLibImageI[], row2: UiLibImageI[] }[] = [];

  ngOnInit(): void {
    console.log('MosaicGridComponent initialized with images:', this.images);
    if (!this.images?.length) {
      this.imageGroups = [];
      return;
    }
    const groups = [];
    for (let i = 0; i < this.images.length; i += 5) {
      groups.push({
        row1: this.images.slice(i, i + 3),
        row2: this.images.slice(i + 3, i + 5)
      });
    }
    this.imageGroups = groups;
  }
}