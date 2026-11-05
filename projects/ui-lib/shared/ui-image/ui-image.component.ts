import { CommonModule } from '@angular/common';
import { Component, HostBinding, Inject, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { CloudinaryModule, lazyload, responsive } from '@cloudinary/ng';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { limitFit } from '@cloudinary/url-gen/actions/resize';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as qAuto } from '@cloudinary/url-gen/qualifiers/quality';
import { CLOUDINARY_CLOUD_NAME } from '@lluc_llull/ui-lib/mapper';

@Component({
    selector: 'ui-image',
    standalone: true,
    imports: [CommonModule, CloudinaryModule],
    templateUrl: './ui-image.component.html',
    styleUrl: './ui-image.component.scss',
})
export class UiImageComponent implements OnChanges, OnInit {
    @Input({ required: true }) publicId!: string;
    @Input() cloudName?: string;
    @Input() transformations?: any;
    @Input() eager: boolean = false;
    @Input() width?: number | null;
    @Input() height?: number | null;

    img!: CloudinaryImage;
    plugins: any[] = [];

    constructor(@Optional() @Inject(CLOUDINARY_CLOUD_NAME) private globalCloudName?: string) {}

    ngOnInit(): void {
        this.initImage();
    }

    ngOnChanges(): void {
        this.initImage();
    }

    @HostBinding('style.--ui-image-ratio')
    get aspectRatioStyle(): string | null {
        if (this.width && this.height) {
            return `${this.width} / ${this.height}`;
        }
        return null;
    }

    private initImage(): void {
        const activeCloudName = this.cloudName || this.globalCloudName;

        if (this.publicId && activeCloudName) {
            this.img = new CloudinaryImage(this.publicId, { cloudName: activeCloudName })
                .delivery(format(auto()))
                .delivery(quality(qAuto()))
                .resize(limitFit().width(1920));

            this.plugins = [responsive({ steps: 200 })];

            if (!this.eager) {
                this.plugins.push(lazyload());
            }
        } else if (!activeCloudName) {
            console.warn(
                '[UiImageComponent]: No cloudName provided. Please provide it via @Input() or the CLOUDINARY_CLOUD_NAME InjectionToken.',
            );
        }
    }
}
