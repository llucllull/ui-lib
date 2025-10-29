import { NgModule } from '@angular/core';
import { ArrowLeft, ArrowRight, ArrowUpRight, LucideAngularModule } from 'lucide-angular';

const icons = {
    ArrowUpRight,
    ArrowRight,
    ArrowLeft,
};

@NgModule({
    imports: [LucideAngularModule.pick(icons)],
    exports: [LucideAngularModule],
})
export class IconsModule {}
