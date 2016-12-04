"use strict";
var core_1 = require('@angular/core');
var tree_dragged_element_model_1 = require('../models/tree-dragged-element.model');
var DRAG_OVER_CLASS = 'is-dragging-over';
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
var TreeDropDirective = (function () {
    function TreeDropDirective(el, renderer, treeDraggedElement) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.onDropCallback = new core_1.EventEmitter();
        this._allowDrop = function (element) { return true; };
    }
    Object.defineProperty(TreeDropDirective.prototype, "treeAllowDrop", {
        set: function (allowDrop) {
            if (allowDrop instanceof Function) {
                this._allowDrop = allowDrop;
            }
            else
                this._allowDrop = function (element) { return allowDrop; };
        },
        enumerable: true,
        configurable: true
    });
    TreeDropDirective.prototype.allowDrop = function () {
        return this._allowDrop(this.treeDraggedElement.get());
    };
    TreeDropDirective.prototype.onDragOver = function ($event) {
        if (!this.allowDrop())
            return this.addDisabledClass();
        $event.preventDefault();
        this.addClass();
    };
    TreeDropDirective.prototype.onDragLeave = function ($event) {
        if (!this.allowDrop())
            return this.removeDisabledClass();
        this.removeClass();
    };
    TreeDropDirective.prototype.onDrop = function ($event) {
        if (!this.allowDrop())
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
    };
    TreeDropDirective.prototype.addClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, true);
    };
    TreeDropDirective.prototype.removeClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, false);
    };
    TreeDropDirective.prototype.addDisabledClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, true);
    };
    TreeDropDirective.prototype.removeDisabledClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, false);
    };
    TreeDropDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[treeDrop]'
                },] },
    ];
    /** @nocollapse */
    TreeDropDirective.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: tree_dragged_element_model_1.TreeDraggedElement, },
    ];
    TreeDropDirective.propDecorators = {
        'onDropCallback': [{ type: core_1.Output, args: ['treeDrop',] },],
        'treeAllowDrop': [{ type: core_1.Input },],
        'onDragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
        'onDragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
        'onDrop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
    };
    return TreeDropDirective;
}());
exports.TreeDropDirective = TreeDropDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUEyRixlQUFlLENBQUMsQ0FBQTtBQUMzRywyQ0FBbUMsc0NBQXNDLENBQUMsQ0FBQTtBQUUxRSxJQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUMzQyxJQUFNLG1CQUFtQixHQUFHLDJCQUEyQixDQUFDO0FBR3hEO0lBY0UsMkJBQW9CLEVBQWMsRUFBVSxRQUFrQixFQUFVLGtCQUFxQztRQUF6RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFiNUcsbUJBQWMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUU3QixlQUFVLEdBQUcsVUFBQyxPQUFPLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO0lBWXZDLENBQUM7SUFYQSxzQkFBSSw0Q0FBYTthQUFqQixVQUFrQixTQUFTO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSTtnQkFBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQUMsT0FBTyxJQUFLLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUNELHFDQUFTLEdBQVQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBS0Esc0NBQVUsR0FBVixVQUFXLE1BQU07UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxF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LHlCQUFpQixvQkF1RTdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBSZW5kZXJlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcblxuY29uc3QgRFJBR19PVkVSX0NMQVNTID0gJ2lzLWRyYWdnaW5nLW92ZXInO1xuY29uc3QgRFJBR19ESVNBQkxFRF9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyLWRpc2FibGVkJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZURyb3BEaXJlY3RpdmUge1xuICAgb25Ecm9wQ2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfYWxsb3dEcm9wID0gKGVsZW1lbnQpID0+IHRydWU7XG4gICBzZXQgdHJlZUFsbG93RHJvcChhbGxvd0Ryb3ApIHtcbiAgICBpZiAoYWxsb3dEcm9wIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuX2FsbG93RHJvcCA9IGFsbG93RHJvcDtcbiAgICB9XG4gICAgZWxzZSB0aGlzLl9hbGxvd0Ryb3AgPSAoZWxlbWVudCkgPT4gYWxsb3dEcm9wO1xuICB9XG4gIGFsbG93RHJvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dEcm9wKHRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDpUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcbiAgfVxuXG4gICBvbkRyYWdPdmVyKCRldmVudCkge1xuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoKSkgcmV0dXJuIHRoaXMuYWRkRGlzYWJsZWRDbGFzcygpO1xuXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hZGRDbGFzcygpO1xuICB9XG5cbiAgIG9uRHJhZ0xlYXZlKCRldmVudCkge1xuICAgIGlmICghdGhpcy5hbGxvd0Ryb3AoKSkgcmV0dXJuIHRoaXMucmVtb3ZlRGlzYWJsZWRDbGFzcygpO1xuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygpO1xuICB9XG5cbiAgIG9uRHJvcCgkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dEcm9wKCkpIHJldHVybjtcblxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMub25Ecm9wQ2FsbGJhY2suZW1pdCh7ZXZlbnQ6JGV2ZW50LCBlbGVtZW50OnRoaXMudHJlZURyYWdnZWRFbGVtZW50LmdldCgpfSk7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDbGFzcygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIERSQUdfT1ZFUl9DTEFTUywgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNsYXNzKCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgRFJBR19PVkVSX0NMQVNTLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZERpc2FibGVkQ2xhc3MoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBEUkFHX0RJU0FCTEVEX0NMQVNTLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRGlzYWJsZWRDbGFzcygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIERSQUdfRElTQUJMRURfQ0xBU1MsIGZhbHNlKTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ1t0cmVlRHJvcF0nXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG57dHlwZTogUmVuZGVyZXIsIH0sXG57dHlwZTogVHJlZURyYWdnZWRFbGVtZW50LCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nb25Ecm9wQ2FsbGJhY2snOiBbeyB0eXBlOiBPdXRwdXQsIGFyZ3M6IFsndHJlZURyb3AnLCBdIH0sXSxcbid0cmVlQWxsb3dEcm9wJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uRHJhZ092ZXInOiBbeyB0eXBlOiBIb3N0TGlzdGVuZXIsIGFyZ3M6IFsnZHJhZ292ZXInLCBbJyRldmVudCddLCBdIH0sXSxcbidvbkRyYWdMZWF2ZSc6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydkcmFnbGVhdmUnLCBbJyRldmVudCddLCBdIH0sXSxcbidvbkRyb3AnOiBbeyB0eXBlOiBIb3N0TGlzdGVuZXIsIGFyZ3M6IFsnZHJvcCcsIFsnJGV2ZW50J10sIF0gfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19