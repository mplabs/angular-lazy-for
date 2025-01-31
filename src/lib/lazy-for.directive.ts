import {
  Directive,
  DoCheck,
  Input,
  IterableDiffer,
  IterableDiffers,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({
  selector: "[lazyFor]",
})
export class LazyForDirective implements DoCheck {
  @Input("lazyForWithHeight") itemHeight: number;
  @Input("lazyForWithContainer") containerElem: HTMLElement;
  @Input("lazyForWithTagName") itemTagName: string;

  @Input()
  set lazyForOf(list) {
    this.list = list;

    if (list) {
      this.differ = this.iterableDiffers.find(list).create();

      if (this.initialized) {
        this.update();
      }
    }
  }

  private templateElem: HTMLElement;

  private beforeListElem: HTMLElement;
  private afterListElem: HTMLElement;

  private list = [];

  private initialized = false;
  private firstUpdate = true;

  private differ: IterableDiffer<any>;

  private lastChangeTriggeredByScroll = false;

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>,
    private iterableDiffers: IterableDiffers
  ) {}

  ngOnInit() {
    this.templateElem = this.vcr.element.nativeElement;

    if (this.containerElem === undefined) {
      this.containerElem = this.templateElem.parentElement;
    }

    //Adding an event listener will trigger ngDoCheck whenever the event fires so we don't actually need to call
    //update here.
    this.containerElem.addEventListener("scroll", (e) => {
      this.lastChangeTriggeredByScroll = true;
    });

    this.initialized = true;
  }

  ngDoCheck() {
    if (this.differ && Array.isArray(this.list)) {
      if (this.lastChangeTriggeredByScroll) {
        this.update();
        this.lastChangeTriggeredByScroll = false;
      } else {
        let changes = this.differ.diff(this.list);

        if (changes !== null) {
          this.update();
        }
      }
    }
  }

  // Clamps number within the inclusive lower and upper bounds.
  private clamp(number: number, boundOne: number, boundTwo: number): number {
    if (!boundTwo) {
      return Math.max(number, boundOne) === boundOne ? number : boundOne; 
    } 
    
    if (Math.min(number, boundOne) === number) {
      return boundOne;
    } 
    
    if (Math.max(number, boundTwo) === number) {
      return boundTwo;
    }

    return number;
  }

  private onFirstUpdate() {
    let sampleItemElem: HTMLElement;

    if (this.itemHeight === undefined || this.itemTagName === undefined) {
      this.vcr.createEmbeddedView(this.tpl, { context: this.list[0], index: 0 });
      sampleItemElem = <HTMLElement>this.templateElem.nextSibling;
    }

    if (this.itemHeight === undefined) {
      this.itemHeight = sampleItemElem.clientHeight;
    }

    if (this.itemTagName === undefined) {
      this.itemTagName = sampleItemElem.tagName;
    }

    this.beforeListElem = document.createElement(this.itemTagName);
    this.templateElem.parentElement.insertBefore(this.beforeListElem, this.templateElem);

    this.afterListElem = document.createElement(this.itemTagName);
    //This inserts after the templateElem. see http://stackoverflow.com/a/4793630/373655 for details
    this.templateElem.parentElement.insertBefore(this.afterListElem, this.templateElem.nextSibling);

    if (this.itemTagName.toLowerCase() === 'li') {
      this.beforeListElem.style.listStyleType = 'none';
      this.afterListElem.style.listStyleType = 'none';
    }

    this.firstUpdate = false;
  }

  private update() {
    if (this.list.length === 0) {
      this.vcr.clear();
      if (!this.firstUpdate) {
        this.beforeListElem.style.height = '0';
        this.afterListElem.style.height = '0';
      }
      return;
    }

    if (this.firstUpdate) {
      this.onFirstUpdate();
    }

    let listHeight = this.containerElem.clientHeight;
    let scrollTop = this.containerElem.scrollTop;

    //The height of anything inside the container but above the lazyFor content;
    let fixedHeaderHeight =
      (this.beforeListElem.getBoundingClientRect().top - this.beforeListElem.scrollTop) -
      (this.containerElem.getBoundingClientRect().top - this.beforeListElem.scrollTop);
    
    //This needs to run after the scrollTop is retrieved.
    this.vcr.clear();

    let listStartI = Math.floor((scrollTop - fixedHeaderHeight) / this.itemHeight);
    listStartI = this.clamp(listStartI, 0, this.list.length);

    let listEndI = Math.ceil((scrollTop - fixedHeaderHeight + listHeight) / this.itemHeight);
    listEndI = this.clamp(listEndI, -1, this.list.length - 1);

    for (let i = listStartI; i <= listEndI; i++) {
      this.vcr.createEmbeddedView(this.tpl, { context: this.list[i], index: i });
    }

    this.beforeListElem.style.height = `${listStartI * this.itemHeight}px`;
    this.afterListElem.style.height = `${(this.list.length - listEndI - 1) * this.itemHeight}px`;
  }
}
