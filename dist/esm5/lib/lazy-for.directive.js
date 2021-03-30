/**
 * @fileoverview added by tsickle
 * Generated from: lib/lazy-for.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, IterableDiffers, TemplateRef, ViewContainerRef, } from "@angular/core";
var LazyForDirective = /** @class */ (function () {
    function LazyForDirective(vcr, tpl, iterableDiffers) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.iterableDiffers = iterableDiffers;
        this.list = [];
        this.initialized = false;
        this.firstUpdate = true;
        this.lastChangeTriggeredByScroll = false;
    }
    Object.defineProperty(LazyForDirective.prototype, "lazyForOf", {
        set: /**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            this.list = list;
            if (list) {
                this.differ = this.iterableDiffers.find(list).create();
                if (this.initialized) {
                    this.update();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LazyForDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function (e) {
            _this.lastChangeTriggeredByScroll = true;
        }));
        this.initialized = true;
    };
    /**
     * @return {?}
     */
    LazyForDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.differ && Array.isArray(this.list)) {
            if (this.lastChangeTriggeredByScroll) {
                this.update();
                this.lastChangeTriggeredByScroll = false;
            }
            else {
                /** @type {?} */
                var changes = this.differ.diff(this.list);
                if (changes !== null) {
                    this.update();
                }
            }
        }
    };
    // Clamps number within the inclusive lower and upper bounds.
    // Clamps number within the inclusive lower and upper bounds.
    /**
     * @private
     * @param {?} number
     * @param {?} boundOne
     * @param {?} boundTwo
     * @return {?}
     */
    LazyForDirective.prototype.clamp = 
    // Clamps number within the inclusive lower and upper bounds.
    /**
     * @private
     * @param {?} number
     * @param {?} boundOne
     * @param {?} boundTwo
     * @return {?}
     */
    function (number, boundOne, boundTwo) {
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
    };
    /**
     * @private
     * @return {?}
     */
    LazyForDirective.prototype.onFirstUpdate = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sampleItemElem;
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
    };
    /**
     * @private
     * @return {?}
     */
    LazyForDirective.prototype.update = /**
     * @private
     * @return {?}
     */
    function () {
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
        var listHeight = this.containerElem.clientHeight;
        /** @type {?} */
        var scrollTop = this.containerElem.scrollTop;
        //The height of anything inside the container but above the lazyFor content;
        /** @type {?} */
        var fixedHeaderHeight = (this.beforeListElem.getBoundingClientRect().top - this.beforeListElem.scrollTop) -
            (this.containerElem.getBoundingClientRect().top - this.beforeListElem.scrollTop);
        //This needs to run after the scrollTop is retrieved.
        this.vcr.clear();
        /** @type {?} */
        var listStartI = Math.floor((scrollTop - fixedHeaderHeight) / this.itemHeight);
        listStartI = this.clamp(listStartI, 0, this.list.length);
        /** @type {?} */
        var listEndI = Math.ceil((scrollTop - fixedHeaderHeight + listHeight) / this.itemHeight);
        listEndI = this.clamp(listEndI, -1, this.list.length - 1);
        for (var i = listStartI; i <= listEndI; i++) {
            this.vcr.createEmbeddedView(this.tpl, { context: this.list[i], index: i });
        }
        this.beforeListElem.style.height = listStartI * this.itemHeight + "px";
        this.afterListElem.style.height = (this.list.length - listEndI - 1) * this.itemHeight + "px";
    };
    LazyForDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[lazyFor]",
                },] }
    ];
    /** @nocollapse */
    LazyForDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: TemplateRef },
        { type: IterableDiffers }
    ]; };
    LazyForDirective.propDecorators = {
        itemHeight: [{ type: Input, args: ["lazyForWithHeight",] }],
        containerElem: [{ type: Input, args: ["lazyForWithContainer",] }],
        itemTagName: [{ type: Input, args: ["lazyForWithTagName",] }],
        lazyForOf: [{ type: Input }]
    };
    return LazyForDirective;
}());
export { LazyForDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1mb3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGF6eS1mb3IvIiwic291cmNlcyI6WyJsaWIvbGF6eS1mb3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBRUwsZUFBZSxFQUNmLFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFtQ0UsMEJBQ1UsR0FBcUIsRUFDckIsR0FBcUIsRUFDckIsZUFBZ0M7UUFGaEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBWmxDLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFVixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUluQixnQ0FBMkIsR0FBRyxLQUFLLENBQUM7SUFNekMsQ0FBQztJQS9CSixzQkFDSSx1Q0FBUzs7Ozs7UUFEYixVQUNjLElBQUk7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFdkQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNwQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2Y7YUFDRjtRQUNILENBQUM7OztPQUFBOzs7O0lBc0JELG1DQUFROzs7SUFBUjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFbkQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUNwQyxJQUFJLENBQUMs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QVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztpQkFDdEI7Ozs7Z0JBTEMsZ0JBQWdCO2dCQURoQixXQUFXO2dCQURYLGVBQWU7Ozs2QkFTZCxLQUFLLFNBQUMsbUJBQW1CO2dDQUN6QixLQUFLLFNBQUMsc0JBQXNCOzhCQUM1QixLQUFLLFNBQUMsb0JBQW9COzRCQUUxQixLQUFLOztJQXNKUix1QkFBQztDQUFBLEFBOUpELElBOEpDO1NBM0pZLGdCQUFnQjs7O0lBQzNCLHNDQUErQzs7SUFDL0MseUNBQTBEOztJQUMxRCx1Q0FBaUQ7Ozs7O0lBZWpELHdDQUFrQzs7Ozs7SUFFbEMsMENBQW9DOzs7OztJQUNwQyx5Q0FBbUM7Ozs7O0lBRW5DLGdDQUFrQjs7Ozs7SUFFbEIsdUNBQTRCOzs7OztJQUM1Qix1Q0FBMkI7Ozs7O0lBRTNCLGtDQUFvQzs7Ozs7SUFFcEMsdURBQTRDOzs7OztJQUcxQywrQkFBNkI7Ozs7O0lBQzdCLCtCQUE2Qjs7Ozs7SUFDN0IsMkNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogXCJbbGF6eUZvcl1cIixcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUZvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBASW5wdXQoXCJsYXp5Rm9yV2l0aEhlaWdodFwiKSBpdGVtSGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dChcImxhenlGb3JXaXRoQ29udGFpbmVyXCIpIGNvbnRhaW5lckVsZW06IEhUTUxFbGVtZW50O1xuICBASW5wdXQoXCJsYXp5Rm9yV2l0aFRhZ05hbWVcIikgaXRlbVRhZ05hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgbGF6eUZvck9mKGxpc3QpIHtcbiAgICB0aGlzLmxpc3QgPSBsaXN0O1xuXG4gICAgaWYgKGxpc3QpIHtcbiAgICAgIHRoaXMuZGlmZmVyID0gdGhpcy5pdGVyYWJsZURpZmZlcnMuZmluZChsaXN0KS5jcmVhdGUoKTtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRlbXBsYXRlRWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBiZWZvcmVMaXN0RWxlbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgYWZ0ZXJMaXN0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBsaXN0ID0gW107XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIGZpcnN0VXBkYXRlID0gdHJ1ZTtcblxuICBwcml2YXRlIGRpZmZlcjogSXRlcmFibGVEaWZmZXI8YW55PjtcblxuICBwcml2YXRlIGxhc3RDaGFuZ2VUcmlnZ2VyZWRCeVNjcm9sbCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdHBsOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnNcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudGVtcGxhdGVFbGVtID0gdGhpcy52Y3IuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWxlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsZW0gPSB0aGlzLnRlbXBsYXRlRWxlbS5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIC8vQWRkaW5nIGFuIGV2ZW50IGxpc3RlbmVyIHdpbGwgdHJpZ2dlciBuZ0RvQ2hlY2sgd2hlbmV2ZXIgdGhlIGV2ZW50IGZpcmVzIHNvIHdlIGRvbid0IGFjdHVhbGx5IG5lZWQgdG8gY2FsbFxuICAgIC8vdXBkYXRlIGhlcmUuXG4gICAgdGhpcy5jb250YWluZXJFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKGUpID0+IHtcbiAgICAgIHRoaXMubGFzdENoYW5nZVRyaWdnZXJlZEJ5U2Nyb2xsID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmRpZmZlciAmJiBBcnJheS5pc0FycmF5KHRoaXMubGlzdCkpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RDaGFuZ2VUcmlnZ2VyZWRCeVNjcm9sbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmxhc3RDaGFuZ2VUcmlnZ2VyZWRCeVNjcm9sbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMubGlzdCk7XG5cbiAgICAgICAgaWYgKGNoYW5nZXMgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xhbXBzIG51bWJlciB3aXRoaW4gdGhlIGluY2x1c2l2ZSBsb3dlciBhbmQgdXBwZXIgYm91bmRzLlxuICBwcml2YXRlIGNsYW1wKG51bWJlcjogbnVtYmVyLCBib3VuZE9uZTogbnVtYmVyLCBib3VuZFR3bzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIWJvdW5kVHdvKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgobnVtYmVyLCBib3VuZE9uZSkgPT09IGJvdW5kT25lID8gbnVtYmVyIDogYm91bmRPbmU7IFxuICAgIH0gXG4gICAgXG4gICAgaWYgKE1hdGgubWluKG51bWJlciwgYm91bmRPbmUpID09PSBudW1iZXIpIHtcbiAgICAgIHJldHVybiBib3VuZE9uZTtcbiAgICB9IFxuICAgIFxuICAgIGlmIChNYXRoLm1heChudW1iZXIsIGJvdW5kVHdvKSA9PT0gbnVtYmVyKSB7XG4gICAgICByZXR1cm4gYm91bmRUd287XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfVxuXG4gIHByaXZhdGUgb25GaXJzdFVwZGF0ZSgpIHtcbiAgICBsZXQgc2FtcGxlSXRlbUVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuaXRlbUhlaWdodCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuaXRlbVRhZ05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy52Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudHBsLCB7IGNvbnRleHQ6IHRoaXMubGlzdFswXSwgaW5kZXg6IDAgfSk7XG4gICAgICBzYW1wbGVJdGVtRWxlbSA9IDxIVE1MRWxlbWVudD50aGlzLnRlbXBsYXRlRWxlbS5uZXh0U2libGluZztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pdGVtSGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaXRlbUhlaWdodCA9IHNhbXBsZUl0ZW1FbGVtLmNsaWVudEhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pdGVtVGFnTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLml0ZW1UYWdOYW1lID0gc2FtcGxlSXRlbUVsZW0udGFnTmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLmJlZm9yZUxpc3RFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLml0ZW1UYWdOYW1lKTtcbiAgICB0aGlzLnRlbXBsYXRlRWxlbS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmJlZm9yZUxpc3RFbGVtLCB0aGlzLnRlbXBsYXRlRWxlbSk7XG5cbiAgICB0aGlzLmFmdGVyTGlzdEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuaXRlbVRhZ05hbWUpO1xuICAgIC8vVGhpcyBpbnNlcnRzIGFmdGVyIHRoZSB0ZW1wbGF0ZUVsZW0uIHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NzkzNjMwLzM3MzY1NSBmb3IgZGV0YWlsc1xuICAgIHRoaXMudGVtcGxhdGVFbGVtLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuYWZ0ZXJMaXN0RWxlbSwgdGhpcy50ZW1wbGF0ZUVsZW0ubmV4dFNpYmxpbmcpO1xuXG4gICAgaWYgKHRoaXMuaXRlbVRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2xpJykge1xuICAgICAgdGhpcy5iZWZvcmVMaXN0RWxlbS5zdHlsZS5saXN0U3R5bGVUeXBlID0gJ25vbmUnO1xuICAgICAgdGhpcy5hZnRlckxpc3RFbGVtLnN0eWxlLmxpc3RTdHlsZVR5cGUgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMubGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMudmNyLmNsZWFyKCk7XG4gICAgICBpZiAoIXRoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVMaXN0RWxlbS5zdHlsZS5oZWlnaHQgPSAnMCc7XG4gICAgICAgIHRoaXMuYWZ0ZXJMaXN0RWxlbS5zdHlsZS5oZWlnaHQgPSAnMCc7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgIHRoaXMub25GaXJzdFVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGxldCBsaXN0SGVpZ2h0ID0gdGhpcy5jb250YWluZXJFbGVtLmNsaWVudEhlaWdodDtcbiAgICBsZXQgc2Nyb2xsVG9wID0gdGhpcy5jb250YWluZXJFbGVtLnNjcm9sbFRvcDtcblxuICAgIC8vVGhlIGhlaWdodCBvZiBhbnl0aGluZyBpbnNpZGUgdGhlIGNvbnRhaW5lciBidXQgYWJvdmUgdGhlIGxhenlGb3IgY29udGVudDtcbiAgICBsZXQgZml4ZWRIZWFkZXJIZWlnaHQgPVxuICAgICAgKHRoaXMuYmVmb3JlTGlzdEVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5iZWZvcmVMaXN0RWxlbS5zY3JvbGxUb3ApIC1cbiAgICAgICh0aGlzLmNvbnRhaW5lckVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdGhpcy5iZWZvcmVMaXN0RWxlbS5zY3JvbGxUb3ApO1xuICAgIFxuICAgIC8vVGhpcyBuZWVkcyB0byBydW4gYWZ0ZXIgdGhlIHNjcm9sbFRvcCBpcyByZXRyaWV2ZWQuXG4gICAgdGhpcy52Y3IuY2xlYXIoKTtcblxuICAgIGxldCBsaXN0U3RhcnRJID0gTWF0aC5mbG9vcigoc2Nyb2xsVG9wIC0gZml4ZWRIZWFkZXJIZWlnaHQpIC8gdGhpcy5pdGVtSGVpZ2h0KTtcbiAgICBsaXN0U3RhcnRJID0gdGhpcy5jbGFtcChsaXN0U3RhcnRJLCAwLCB0aGlzLmxpc3QubGVuZ3RoKTtcblxuICAgIGxldCBsaXN0RW5kSSA9IE1hdGguY2VpbCgoc2Nyb2xsVG9wIC0gZml4ZWRIZWFkZXJIZWlnaHQgKyBsaXN0SGVpZ2h0KSAvIHRoaXMuaXRlbUhlaWdodCk7XG4gICAgbGlzdEVuZEkgPSB0aGlzLmNsYW1wKGxpc3RFbmRJLCAtMSwgdGhpcy5saXN0Lmxlbmd0aCAtIDEpO1xuXG4gICAgZm9yIChsZXQgaSA9IGxpc3RTdGFydEk7IGkgPD0gbGlzdEVuZEk7IGkrKykge1xuICAgICAgdGhpcy52Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudHBsLCB7IGNvbnRleHQ6IHRoaXMubGlzdFtpXSwgaW5kZXg6IGkgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5iZWZvcmVMaXN0RWxlbS5zdHlsZS5oZWlnaHQgPSBgJHtsaXN0U3RhcnRJICogdGhpcy5pdGVtSGVpZ2h0fXB4YDtcbiAgICB0aGlzLmFmdGVyTGlzdEVsZW0uc3R5bGUuaGVpZ2h0ID0gYCR7KHRoaXMubGlzdC5sZW5ndGggLSBsaXN0RW5kSSAtIDEpICogdGhpcy5pdGVtSGVpZ2h0fXB4YDtcbiAgfVxufVxuIl19