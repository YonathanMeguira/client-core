import { Attribute, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { typographyType } from './font.config';

@Directive({
  selector: '[datoFont]'
})
export class DatoFontDirective implements OnInit {
  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    @Attribute('datoFont') private datoFont: typographyType
  ) {}

  ngOnInit(): void {
    this.injectTypographyClass();
  }

  private injectTypographyClass() {
    if (this.datoFont) {
      this.renderer.addClass(this.element.nativeElement, this.datoFont);
    }
  }
}
