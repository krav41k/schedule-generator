import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSubjectItem]'
})
export class SubjectItemDirective implements OnInit, AfterViewInit {

  @Input('color') color;

  constructor(private el: ElementRef, private r: Renderer2) {  }

  ngOnInit(): void {
    this.r.setStyle(this.el.nativeElement, 'backgroundColor', this.color);
  }

  ngAfterViewInit(): void {
    this.sizeCalculator();
  }

  @HostListener('input') onInput() {
      this.sizeCalculator();
  }

  sizeCalculator() {
      const size = this.el.nativeElement.value.length;
      size > 15 ? this.el.nativeElement.size = size : this.el.nativeElement.size = 15;
  }
}
