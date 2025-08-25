import { NgModule } from '@angular/core';
import { LucideAngularModule, ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-angular';

const icons = {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft, 
};

@NgModule({
  imports: [
    LucideAngularModule.pick(icons)
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
