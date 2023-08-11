import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrevbutton]'
})
export class PrevbuttonDirective {

  constructor(private element:ElementRef) { }

  @HostListener('click')
  prevFUn(){
    var elm = this.element.nativeElement.parentElement.parentElement.children[0];
    var item=elm.getElementsByClassName("item");
    elm.prepend(item[item.length-1]);
   }
}
