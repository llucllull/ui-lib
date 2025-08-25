import { NgModule } from '@angular/core';
import { LucideAngularModule, ArrowUpRight } from 'lucide-angular';

const icons = {
  ArrowUpRight 
};

@NgModule({
  imports: [
    LucideAngularModule.pick(icons)
  ],
  exports: [LucideAngularModule]
})
export class IconsModule {}
