import { Directive, ViewContainerRef, TemplateRef, IterableDiffers, Input, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/lazy-for.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LazyForDirective {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/lazy-for.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LazyForModule {
}
LazyForModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LazyForDirective],
                exports: [LazyForDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lazy-for.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { LazyForDirective, LazyForModule };
//# sourceMappingURL=lazy-for.js.map
