import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorDirective} from './color.directive';
import {PaletteDirective} from './palette.directive';

export const directives = [ ColorDirective, PaletteDirective ];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ...directives ],
  exports: [ ...directives ]
})
export class DatoThemesModule {
}
