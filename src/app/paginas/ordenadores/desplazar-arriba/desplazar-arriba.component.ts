import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';

@Component({
  selector: 'app-desplazar-arriba',
  templateUrl: './desplazar-arriba.component.html',
  styleUrls: ['./desplazar-arriba.component.css']
})
export class DesplazarArribaComponent implements OnInit {

  @Input() ubicacion: string = '';

  windowScrolled: boolean | undefined;

  ngOnInit(): void {
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  desplazamientoEnVentana(): void {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  desplazarArriba(): void {
      (function suave(): void {
          const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(suave);
              window.scrollTo(0, currentScroll - (currentScroll / 1.5));
          }
      })();
  }
}
