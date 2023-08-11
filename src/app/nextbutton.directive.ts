import { Directive, ElementRef, HostListener} from '@angular/core';


@Directive({
  selector: '[appNextbutton]'
})
export class NextbuttonDirective {

  constructor(private element:ElementRef) {
  
   }


   @HostListener('click')
    nextFun(){
     var elm = this.element.nativeElement.parentElement.parentElement.children[0];
     var item=elm.getElementsByClassName("item");
     elm.append(item[0]);

     console.log(item);
    }
 


}

