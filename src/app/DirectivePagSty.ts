import {
  ElementRef,
  AfterViewInit,
  Directive,
  Host,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatButton } from "@angular/material/button";
import { setLines } from "@angular/material/core";
import { ListItem } from "ng-multiselect-dropdown/multiselect.model";
import { MatList } from "@angular/material/list";
import { disableDebugTools } from "@angular/platform-browser";

interface PageObject {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

@Directive({
  selector: "[style-paginator]"
})
export class StylePaginatorDirective {
  private _pageGapTxt = "...";
  private _rangeStart!: number;
  private _rangeEnd!: number;
  private _buttons : any[] = [];
  private _curPageObj: PageObject = {
    length: 0,
    pageIndex: 0,
    pageSize: 0,
    previousPageIndex: 0
  };
  paginatorList!: HTMLCollectionOf<Element>;
  pageSize!: number;
  pageIndex!: number;
  length!: number;
  private _showTotalPages = 5;
  goTo!: number;
  pageNumbers!: number[];
  @Output() page = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input()
  get showTotalPages(): number {
    return this._showTotalPages + 5;
  }

  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 == 0 ? value + 1 : value;
  }

  get inc(): number {
    return this._showTotalPages % 2 == 0
      ? this.showTotalPages / 2
      : (this.showTotalPages - 1) / 2;
  }

  get numOfPages(): number {
    return this.matPag.getNumberOfPages();
  }

  get lastPageIndex(): number {
    return this.matPag.getNumberOfPages() - 1;
  }

  @Input("pageIndex") set pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex + 1;
  }
  @Input("length") set lengthChanged(length: number) {
    this.length = length;
    this.updateGoto();
  }
  @Input("pageSize") set pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.updateGoto();
  }

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2
  ) {
    //to rerender buttons on items per page change and first, last, next and prior buttons
    this.matPag.page.subscribe((e: PageObject) => {
      if (
        this._curPageObj.pageSize != e.pageSize &&
        this._curPageObj.pageIndex != 0
      ) {
        e.pageIndex = 0;
        this._rangeStart = 0;
        this._rangeEnd = this._showTotalPages - 1;
      }
      this._curPageObj = e;

      this.initPageRange();
    });
  }

  ngOnInit() {
    this.updateGoto();
  }

  updateGoto() {
    this.goTo = (this.pageIndex || 0) + 1;
    this.pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.length / this.pageSize); i++) {
      this.pageNumbers.push(i);
    }
  }
  
  private buildPageNumbers() {
    const actionContainer = this.vr.element.nativeElement.querySelector(
      "div.mat-paginator-range-actions"
    );
    const nextPageNode = this.vr.element.nativeElement.querySelector(
      "button.mat-paginator-navigation-next"
    );
    const prevButtonCount = this._buttons.length;

    // remove buttons before creating new ones
    // if(this._buttons.length == 5){
    //   this._buttons.forEach(button => {
    //     this.ren.createElement(actionContainer,button);
    //   })
    // }
    if (this._buttons.length > 5 ) {
      this._buttons.forEach(button => {
        this.ren.removeChild(actionContainer, button);
      });
  
      //Empty state array
      this._buttons.length == 0;
    }

    //initialize next page and last page buttons
    if (this._buttons.length == 0) {
      let nodeArray = this.vr.element.nativeElement.childNodes[0].childNodes[0]
        .childNodes[2].childNodes;

      setTimeout(() => {
        for (let i = 0; i < nodeArray.length; i++) {
          if (nodeArray[i].nodeName === "BUTTON") {
            if (nodeArray[i].innerHTML.length > 100 && nodeArray[i].disabled) {
              this.ren.setStyle(
                nodeArray[i],
                "background-color",
                "transprant",
              );
              this.ren.setStyle(nodeArray[i], "color", "black");
              this.ren.setStyle(nodeArray[i], "margin", "0.5% 0%");
              this.ren.setStyle(nodeArray[i], "left", "-65%");
              // this.ren.setStyle(nodeArray[i], "float", "left");
            } else if (
              nodeArray[i].innerHTML.length > 100 &&
              !nodeArray[i].disabled
            ) {
              this.ren.setStyle(
                nodeArray[i],
                "background-color",
                "transparent"
              );
              this.ren.setStyle(nodeArray[i], "color", "black");
              this.ren.setStyle(nodeArray[i], "margin", ".5%");
              this.ren.setStyle(nodeArray[i], "right", "0%");
            } else if (nodeArray[i].disabled) {
              this.ren.setStyle(nodeArray[i], "background-color", "lightgray");
            }
          }
        }
      });
    }

    for (let i = 0; i < this.numOfPages; i++) {
      if (i >= this._rangeStart && i <= this._rangeEnd) {
        this.ren.insertBefore(
          actionContainer,
          this.createButton(i, this.matPag.pageIndex),
          nextPageNode
        )
      }

      if (i == this._rangeEnd) {
        this.ren.insertBefore(
          actionContainer,
          this.createButton(this._pageGapTxt, this._rangeEnd),
          nextPageNode
        );
      }
    }
  }

  private createButton(i: any, pageIndex: number): any {
    const linkBtn: MatButton = this.ren.createElement("mat-button");

    if (i === pageIndex) {
      this.ren.addClass(linkBtn, "mat-mini-fab");
      this.ren.addClass(linkBtn, "elavation-z0");
    } else this.ren.addClass(linkBtn, "mat-button");

    const pagingTxt = isNaN(i) ? "" : +(i + 1);
    const text = this.ren.createText(pagingTxt + "");

    this.ren.addClass(linkBtn, "mat-custom-page");
    switch (i) {
      case pageIndex:
        this.ren.setAttribute(linkBtn, "disabled", "disabled");
        break;
      case this._pageGapTxt:
        let newIndex = this._curPageObj.pageIndex + this._showTotalPages;

        if (newIndex == this.numOfPages) newIndex = this.lastPageIndex;

        if (pageIndex != this.lastPageIndex) {
          this.ren.listen(linkBtn, "click", () => {
            console.log("working: ", pageIndex);
            this.switchPage(newIndex);
          });
        }

        if (pageIndex == this.lastPageIndex) {
          this.ren.setAttribute(linkBtn, "disabled", "disabled");
        }
        break;
      default:
        this.ren.listen(linkBtn, "click", () => {
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
        this._buttons.push(linkBtn)
        return linkBtn;
  }
  
  private initPageRange(): void {
    const middleIndex = (this._rangeStart + this._rangeEnd) / 2;
    this._rangeStart = this.calcRangeStart(middleIndex);
    this._rangeEnd = this.calcRangeEnd(middleIndex);

    this.buildPageNumbers();
  }

  //Helper function To calculate start of button range
  private calcRangeStart(middleIndex: number): number {
    switch (true) {
      case this._curPageObj.pageIndex == 0 && this._rangeStart != 0:
        return 0;
      case this._curPageObj.pageIndex > this._rangeEnd:
        return this._curPageObj.pageIndex + this.inc > this.lastPageIndex
          ? this.lastPageIndex - this.inc * 2
          : this._curPageObj.pageIndex - this.inc;
      case this._curPageObj.pageIndex > this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex > middleIndex &&
        this._rangeEnd < this.lastPageIndex:
        return this._rangeStart + 1;
      case this._curPageObj.pageIndex < this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex < middleIndex &&
        this._rangeStart > 0:
        return this._rangeStart - 1;
      default:
        return this._rangeStart;
    }
  }
  //Helpter function to calculate end of button range
  private calcRangeEnd(middleIndex: number): number {
    switch (true) {
      case this._curPageObj.pageIndex == 1 &&
        this._rangeEnd != this._showTotalPages:
        return this._showTotalPages - 1 ;
      case this._curPageObj.pageIndex > this._rangeEnd:
        return this._curPageObj.pageIndex + this.inc > this.lastPageIndex
          ? this.lastPageIndex
          : this._curPageObj.pageIndex + 1;
      case this._curPageObj.pageIndex > this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex > middleIndex &&
        this._rangeEnd < this.lastPageIndex:
        return this._rangeEnd + 1;
      case this._curPageObj.pageIndex < this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex < middleIndex &&
        this._rangeStart >= 0 &&
        this._rangeEnd > this._showTotalPages - 1:
        return this._rangeEnd - 1;
      default:
        return this._rangeEnd;
    }
  }

  goToChange() {
    this.paginator.pageIndex = this.goTo - 1;
    const event: PageEvent = {
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };
    this.paginator.page.next(event);
    this.emitPageEvent(event);
  }
  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }
  //Helper function to switch page #007bff on non first, last, next and previous buttons only.
  private switchPage(i: number): void {
    console.log("switch", i);
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex  = i;
    this.matPag["_emitPageEvent"](previousPageIndex);
    this.initPageRange();
  }

  //Initialize default state after view init
  public ngAfterViewInit() {
    this._rangeStart = 0;
    this._rangeEnd = this._showTotalPages - 1;
    this.initPageRange();
  }

  onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
    setTimeout((idx) => {
        let from = (paginator.pageSize * paginator.pageIndex) + 1;

        let to = (paginator.length < paginator.pageSize * (paginator.pageIndex + 1))
            ? paginator.length
            : paginator.pageSize * (paginator.pageIndex + 1);

    }, 0, paginator.pageIndex);
}

  ngAfterViewChecked() {
    const list = document.getElementsByClassName('mat-paginator-range-label');
    this.ren.setStyle(list[0], "margin", "1% 0% -1%");
    list[0].innerHTML = "&nbsp;" + 'On Page: ' + this.pageIndex + "&nbsp;&nbsp;&nbsp;" + "&nbsp;&nbsp;&nbsp;"+
    'Total Pages: '+ (1 + this.lastPageIndex) +" "+ "&nbsp;&nbsp;&nbsp;" + "&nbsp;&nbsp;&nbsp";

    // const goToChange = document.getElementsByClassName('mat-paginator-range-label');
}


}