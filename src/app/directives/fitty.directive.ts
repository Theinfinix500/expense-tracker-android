import { Directive, ElementRef } from '@angular/core';
import fitty, { FittyInstance } from 'fitty';

@Directive({
  selector: '[appFitty]',
  standalone: true,
  exportAs: 'fitty',
})
export class FittyDirective {
  fittyInstance: FittyInstance;

  constructor(el: ElementRef) {
    this.fittyInstance = fitty(el.nativeElement, {
      maxSize: 60,
      minSize: 12,
    });
  }

  refit() {
    this.fittyInstance.fit();
  }
}
