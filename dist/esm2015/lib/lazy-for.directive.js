/**
 * @fileoverview added by tsickle
 * Generated from: lib/lazy-for.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, IterableDiffers, TemplateRef, ViewContainerRef, } from "@angular/core";
export class LazyForDirective {
    /**
     * @param {?} vcr
     * @param {?} tpl
     * @param {?} iterableDiffers
     */
    constructor(vcr, tpl, iterableDiffers) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.iterableDiffers = iterableDiffers;
        this.list = [];
        this.initialized = false;
        this.firstUpdate = true;
        this.lastChangeTriggeredByScroll = false;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    set lazyForOf(list) {
        this.list = list;
        if (list) {
            this.differ = this.iterableDiffers.find(list).create();
            if (this.initialized) {
                this.update();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.templateElem = this.vcr.element.nativeElement;
        if (this.containerElem === undefined) {
            this.containerElem = this.templateElem.parentElement;
        }
        //Adding an event listener will trigger ngDoCheck whenever the event fires so we don't actually need to call
        //update here.
        this.containerElem.addEventListener("scroll", (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.lastChangeTriggeredByScroll = true;
        }));
        this.initialized = true;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.differ && Array.isArray(this.list)) {
            if (this.lastChangeTriggeredByScroll) {
                this.update();
                this.lastChangeTriggeredByScroll = false;
            }
            else {
                /** @type {?} */
                let changes = this.differ.diff(this.list);
                if (changes !== null) {
                    this.update();
                }
            }
        }
    }
    // Clamps number within the inclusive lower and upper bounds.
    /**
     * @private
     * @param {?} number
     * @param {?} boundOne
     * @param {?} boundTwo
     * @return {?}
     */
    clamp(number, boundOne, boundTwo) {
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
    /**
     * @private
     * @return {?}
     */
    onFirstUpdate() {
        /** @type {?} */
        let sampleItemElem;
        if (this.itemHeight === undefined || this.itemTagName === undefined) {
            this.vcr.createEmbeddedView(this.tpl, { context: this.list[0], index: 0 });
            sampleItemElem = (/** @type {?} */ (this.templateElem.nextSibling));
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
    /**
     * @private
     * @return {?}
     */
    update() {
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
        /** @type {?} */
        let listHeight = this.containerElem.clientHeight;
        /** @type {?} */
        let scrollTop = this.containerElem.scrollTop;
        //The height of anything inside the container but above the lazyFor content;
        /** @type {?} */
        let fixedHeaderHeight = (this.beforeListElem.getBoundingClientRect().top - this.beforeListElem.scrollTop) -
            (this.containerElem.getBoundingClientRect().top - this.beforeListElem.scrollTop);
        //This needs to run after the scrollTop is retrieved.
        this.vcr.clear();
        /** @type {?} */
        let listStartI = Math.floor((scrollTop - fixedHeaderHeight) / this.itemHeight);
        listStartI = this.clamp(listStartI, 0, this.list.length);
        /** @type {?} */
        let listEndI = Math.ceil((scrollTop - fixedHeaderHeight + listHeight) / this.itemHeight);
        listEndI = this.clamp(listEndI, -1, this.list.length - 1);
        for (let i = listStartI; i <= listEndI; i++) {
            this.vcr.createEmbeddedView(this.tpl, { context: this.list[i], index: i });
        }
        this.beforeListElem.style.height = `${listStartI * this.itemHeight}px`;
        this.afterListElem.style.height = `${(this.list.length - listEndI - 1) * this.itemHeight}px`;
    }
}
LazyForDirective.decorators = [
    { type: Directive, args: [{
                selector: "[lazyFor]",
            },] }
];
/** @nocollapse */
LazyForDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: IterableDiffers }
];
LazyForDirective.propDecorators = {
    itemHeight: [{ type: Input, args: ["lazyForWithHeight",] }],
    containerElem: [{ type: Input, args: ["lazyForWithContainer",] }],
    itemTagName: [{ type: Input, args: ["lazyForWithTagName",] }],
    lazyForOf: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LazyForDirective.prototype.itemHeight;
    /** @type {?} */
    LazyForDirective.prototype.containerElem;
    /** @type {?} */
    LazyForDirective.prototype.itemTagName;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.templateElem;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.beforeListElem;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.afterListElem;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.list;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.initialized;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.firstUpdate;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.differ;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.lastChangeTriggeredByScroll;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.vcr;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.tpl;
    /**
     * @type {?}
     * @private
     */
    LazyForDirective.prototype.iterableDiffers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1mb3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGF6eS1mb3IvIiwic291cmNlcyI6WyJsaWIvbGF6eS1mb3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBRUwsZUFBZSxFQUNmLFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7O0lBZ0MzQixZQUNVLEdBQXFCLEVBQ3JCLEdBQXFCLEVBQ3JCLGVBQWdDO1FBRmhDLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVpsQyxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVYsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFJbkIsZ0NBQTJCLEdBQUcsS0FBSyxDQUFDO0lBTXpDLENBQUM7Ozs7O0lBL0JKLElBQ0ksU0FBUyxDQUFDLElBQUk7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXZELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7U0FDRjtJQUNILENBQUM7Ozs7SUFzQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBRW5ELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJ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QjtZQURoQixXQUFXO1lBRFgsZUFBZTs7O3lCQVNkLEtBQUssU0FBQyxtQkFBbUI7NEJBQ3pCLEtBQUssU0FBQyxzQkFBc0I7MEJBQzVCLEtBQUssU0FBQyxvQkFBb0I7d0JBRTFCLEtBQUs7Ozs7SUFKTixzQ0FBK0M7O0lBQy9DLHlDQUEwRDs7SUFDMUQsdUNBQWlEOzs7OztJQWVqRCx3Q0FBa0M7Ozs7O0lBRWxDLDBDQUFvQzs7Ozs7SUFDcEMseUNBQW1DOzs7OztJQUVuQyxnQ0FBa0I7Ozs7O0lBRWxCLHVDQUE0Qjs7Ozs7SUFDNUIsdUNBQTJCOzs7OztJQUUzQixrQ0FBb0M7Ozs7O0lBRXBDLHVEQUE0Qzs7Ozs7SUFHMUMsK0JBQTZCOzs7OztJQUM3QiwrQkFBNkI7Ozs7O0lBQzdCLDJDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgSW5wdXQsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiW2xhenlGb3JdXCIsXG59KVxuZXhwb3J0IGNsYXNzIExhenlGb3JEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgQElucHV0KFwibGF6eUZvcldpdGhIZWlnaHRcIikgaXRlbUhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoXCJsYXp5Rm9yV2l0aENvbnRhaW5lclwiKSBjb250YWluZXJFbGVtOiBIVE1MRWxlbWVudDtcbiAgQElucHV0KFwibGF6eUZvcldpdGhUYWdOYW1lXCIpIGl0ZW1UYWdOYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2V0IGxhenlGb3JPZihsaXN0KSB7XG4gICAgdGhpcy5saXN0ID0gbGlzdDtcblxuICAgIGlmIChsaXN0KSB7XG4gICAgICB0aGlzLmRpZmZlciA9IHRoaXMuaXRlcmFibGVEaWZmZXJzLmZpbmQobGlzdCkuY3JlYXRlKCk7XG5cbiAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0ZW1wbGF0ZUVsZW06IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgYmVmb3JlTGlzdEVsZW06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGFmdGVyTGlzdEVsZW06IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgbGlzdCA9IFtdO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmaXJzdFVwZGF0ZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBkaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPGFueT47XG5cbiAgcHJpdmF0ZSBsYXN0Q2hhbmdlVHJpZ2dlcmVkQnlTY3JvbGwgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHRwbDogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRlbXBsYXRlRWxlbSA9IHRoaXMudmNyLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb250YWluZXJFbGVtID0gdGhpcy50ZW1wbGF0ZUVsZW0ucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICAvL0FkZGluZyBhbiBldmVudCBsaXN0ZW5lciB3aWxsIHRyaWdnZXIgbmdEb0NoZWNrIHdoZW5ldmVyIHRoZSBldmVudCBmaXJlcyBzbyB3ZSBkb24ndCBhY3R1YWxseSBuZWVkIHRvIGNhbGxcbiAgICAvL3VwZGF0ZSBoZXJlLlxuICAgIHRoaXMuY29udGFpbmVyRWxlbS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChlKSA9PiB7XG4gICAgICB0aGlzLmxhc3RDaGFuZ2VUcmlnZ2VyZWRCeVNjcm9sbCA9IHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5kaWZmZXIgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmxpc3QpKSB7XG4gICAgICBpZiAodGhpcy5sYXN0Q2hhbmdlVHJpZ2dlcmVkQnlTY3JvbGwpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhbmdlVHJpZ2dlcmVkQnlTY3JvbGwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLmxpc3QpO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENsYW1wcyBudW1iZXIgd2l0aGluIHRoZSBpbmNsdXNpdmUgbG93ZXIgYW5kIHVwcGVyIGJvdW5kcy5cbiAgcHJpdmF0ZSBjbGFtcChudW1iZXI6IG51bWJlciwgYm91bmRPbmU6IG51bWJlciwgYm91bmRUd286IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFib3VuZFR3bykge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KG51bWJlciwgYm91bmRPbmUpID09PSBib3VuZE9uZSA/IG51bWJlciA6IGJvdW5kT25lOyBcbiAgICB9IFxuICAgIFxuICAgIGlmIChNYXRoLm1pbihudW1iZXIsIGJvdW5kT25lKSA9PT0gbnVtYmVyKSB7XG4gICAgICByZXR1cm4gYm91bmRPbmU7XG4gICAgfSBcbiAgICBcbiAgICBpZiAoTWF0aC5tYXgobnVtYmVyLCBib3VuZFR3bykgPT09IG51bWJlcikge1xuICAgICAgcmV0dXJuIGJvdW5kVHdvO1xuICAgIH1cblxuICAgIHJldHVybiBudW1iZXI7XG4gIH1cblxuICBwcml2YXRlIG9uRmlyc3RVcGRhdGUoKSB7XG4gICAgbGV0IHNhbXBsZUl0ZW1FbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGlmICh0aGlzLml0ZW1IZWlnaHQgPT09IHVuZGVmaW5lZCB8fCB0aGlzLml0ZW1UYWdOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudmNyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRwbCwgeyBjb250ZXh0OiB0aGlzLmxpc3RbMF0sIGluZGV4OiAwIH0pO1xuICAgICAgc2FtcGxlSXRlbUVsZW0gPSA8SFRNTEVsZW1lbnQ+dGhpcy50ZW1wbGF0ZUVsZW0ubmV4dFNpYmxpbmc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXRlbUhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLml0ZW1IZWlnaHQgPSBzYW1wbGVJdGVtRWxlbS5jbGllbnRIZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXRlbVRhZ05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pdGVtVGFnTmFtZSA9IHNhbXBsZUl0ZW1FbGVtLnRhZ05hbWU7XG4gICAgfVxuXG4gICAgdGhpcy5iZWZvcmVMaXN0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5pdGVtVGFnTmFtZSk7XG4gICAgdGhpcy50ZW1wbGF0ZUVsZW0ucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5iZWZvcmVMaXN0RWxlbSwgdGhpcy50ZW1wbGF0ZUVsZW0pO1xuXG4gICAgdGhpcy5hZnRlckxpc3RFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLml0ZW1UYWdOYW1lKTtcbiAgICAvL1RoaXMgaW5zZXJ0cyBhZnRlciB0aGUgdGVtcGxhdGVFbGVtLiBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc5MzYzMC8zNzM2NTUgZm9yIGRldGFpbHNcbiAgICB0aGlzLnRlbXBsYXRlRWxlbS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmFmdGVyTGlzdEVsZW0sIHRoaXMudGVtcGxhdGVFbGVtLm5leHRTaWJsaW5nKTtcblxuICAgIGlmICh0aGlzLml0ZW1UYWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdsaScpIHtcbiAgICAgIHRoaXMuYmVmb3JlTGlzdEVsZW0uc3R5bGUubGlzdFN0eWxlVHlwZSA9ICdub25lJztcbiAgICAgIHRoaXMuYWZ0ZXJMaXN0RWxlbS5zdHlsZS5saXN0U3R5bGVUeXBlID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHRoaXMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnZjci5jbGVhcigpO1xuICAgICAgaWYgKCF0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlTGlzdEVsZW0uc3R5bGUuaGVpZ2h0ID0gJzAnO1xuICAgICAgICB0aGlzLmFmdGVyTGlzdEVsZW0uc3R5bGUuaGVpZ2h0ID0gJzAnO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICB0aGlzLm9uRmlyc3RVcGRhdGUoKTtcbiAgICB9XG5cbiAgICBsZXQgbGlzdEhlaWdodCA9IHRoaXMuY29udGFpbmVyRWxlbS5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IHNjcm9sbFRvcCA9IHRoaXMuY29udGFpbmVyRWxlbS5zY3JvbGxUb3A7XG5cbiAgICAvL1RoZSBoZWlnaHQgb2YgYW55dGhpbmcgaW5zaWRlIHRoZSBjb250YWluZXIgYnV0IGFib3ZlIHRoZSBsYXp5Rm9yIGNvbnRlbnQ7XG4gICAgbGV0IGZpeGVkSGVhZGVySGVpZ2h0ID1cbiAgICAgICh0aGlzLmJlZm9yZUxpc3RFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMuYmVmb3JlTGlzdEVsZW0uc2Nyb2xsVG9wKSAtXG4gICAgICAodGhpcy5jb250YWluZXJFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHRoaXMuYmVmb3JlTGlzdEVsZW0uc2Nyb2xsVG9wKTtcbiAgICBcbiAgICAvL1RoaXMgbmVlZHMgdG8gcnVuIGFmdGVyIHRoZSBzY3JvbGxUb3AgaXMgcmV0cmlldmVkLlxuICAgIHRoaXMudmNyLmNsZWFyKCk7XG5cbiAgICBsZXQgbGlzdFN0YXJ0SSA9IE1hdGguZmxvb3IoKHNjcm9sbFRvcCAtIGZpeGVkSGVhZGVySGVpZ2h0KSAvIHRoaXMuaXRlbUhlaWdodCk7XG4gICAgbGlzdFN0YXJ0SSA9IHRoaXMuY2xhbXAobGlzdFN0YXJ0SSwgMCwgdGhpcy5saXN0Lmxlbmd0aCk7XG5cbiAgICBsZXQgbGlzdEVuZEkgPSBNYXRoLmNlaWwoKHNjcm9sbFRvcCAtIGZpeGVkSGVhZGVySGVpZ2h0ICsgbGlzdEhlaWdodCkgLyB0aGlzLml0ZW1IZWlnaHQpO1xuICAgIGxpc3RFbmRJID0gdGhpcy5jbGFtcChsaXN0RW5kSSwgLTEsIHRoaXMubGlzdC5sZW5ndGggLSAxKTtcblxuICAgIGZvciAobGV0IGkgPSBsaXN0U3RhcnRJOyBpIDw9IGxpc3RFbmRJOyBpKyspIHtcbiAgICAgIHRoaXMudmNyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRwbCwgeyBjb250ZXh0OiB0aGlzLmxpc3RbaV0sIGluZGV4OiBpIH0pO1xuICAgIH1cblxuICAgIHRoaXMuYmVmb3JlTGlzdEVsZW0uc3R5bGUuaGVpZ2h0ID0gYCR7bGlzdFN0YXJ0SSAqIHRoaXMuaXRlbUhlaWdodH1weGA7XG4gICAgdGhpcy5hZnRlckxpc3RFbGVtLnN0eWxlLmhlaWdodCA9IGAkeyh0aGlzLmxpc3QubGVuZ3RoIC0gbGlzdEVuZEkgLSAxKSAqIHRoaXMuaXRlbUhlaWdodH1weGA7XG4gIH1cbn1cbiJdfQ==