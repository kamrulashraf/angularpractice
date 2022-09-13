import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBasicAttribute]'
})
export class BasicAttributeDirective implements OnInit {
  @Input('defaultColor') defaultColor : string = 'transparent';
  @Input('customColor') customColor : string = 'transparent';

  @HostBinding('style.backgroundColor') backgroundColor = 'red';
  @HostBinding('class.redcolor') color = false;

  constructor(private el: ElementRef, private render: Renderer2) { 
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  ngOnInit(){
    this.el.nativeElement.style.backgroundColor = 'red';
    this.render.setStyle(this.el.nativeElement, 'background-color', 'cyan');
    this.backgroundColor = 'red';
  }

  @HostListener('mouseenter') onMouseEnter(){
    // this.el.nativeElement.style.backgroundColor = this.customColor;
    this.backgroundColor = 'yellow';
    this.color = !this.color;
  }

  @HostListener('mouseleave') onMouseLeave(){
    // this.el.nativeElement.style.backgroundColor = this.defaultColor;
    this.backgroundColor = '';
    this.color = !this.color;
  }

}
