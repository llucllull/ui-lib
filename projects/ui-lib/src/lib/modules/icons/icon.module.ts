import { NgModule } from '@angular/core';
import { ArrowLeft, ArrowRight, ArrowUpRight, LucideAngularModule, Twitter } from 'lucide-angular';

const icons = {
    ArrowUpRight,
    ArrowRight,
    ArrowLeft,
    Twitter
};

@NgModule({
    imports: [LucideAngularModule.pick(icons)],
    exports: [LucideAngularModule],
})
export class IconsModule {}
