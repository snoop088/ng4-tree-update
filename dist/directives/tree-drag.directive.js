"use strict";
var core_1 = require('@angular/core');
var tree_dragged_element_model_1 = require('../models/tree-dragged-element.model');
var DRAG_OVER_CLASS = 'is-dragging-over';
var TreeDragDirective = (function () {
    function TreeDragDirective(el, renderer, treeDraggedElement) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
    }
    TreeDragDirective.prototype.ngDoCheck = function () {
        this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? "true" : "false");
    };
    TreeDragDirective.prototype.onDragStart = function () {
        var _this = this;
        setTimeout(function () { return _this.treeDraggedElement.set(_this.draggedElement); }, 30);
    };
    TreeDragDirective.prototype.onDragEnd = function () {
        this.treeDraggedElement.set(null);
    };
    TreeDragDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[treeDrag]'
                },] },
    ];
    /** @nocollapse */
    TreeDragDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: tree_dragged_element_model_1.TreeDraggedElement, },
    ]; };
    TreeDragDirective.propDecorators = {
        'draggedElement': [{ type: core_1.Input, args: ['treeDrag',] },],
        'treeDragEnabled': [{ type: core_1.Input },],
        'onDragStart': [{ type: core_1.HostListener, args: ['dragstart',] },],
        'onDragEnd': [{ type: core_1.HostListener, args: ['dragend',] },],
    };
    return TreeDragDirective;
}());
exports.TreeDragDirective = TreeDragDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUE0RixlQUFlLENBQUMsQ0FBQTtBQUM1RywyQ0FBbUMsc0NBQXNDLENBQUMsQ0FBQTtBQUUxRSxJQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUczQztJQUlFLDJCQUFvQixFQUFjLEVBQVUsUUFBa0IsRUFBVSxrQkFBcUM7UUFBekYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO0lBQzdHLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVBLHVDQUFXLEdBQVg7UUFBQSxpQkFFQTtRQURDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQWhELENBQWdELEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVBLHFDQUFTLEdBQVQ7UUFDQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDSSw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsWUFBWTtpQkFDdkIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGdDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGVBQVEsR0FBRztRQUNsQixFQUFDLElBQUksRUFBRSwrQ0FBa0IsR0FBRztLQUMzQixFQUo2RixDQUk3RixDQUFDO0lBQ0ssZ0NBQWMsR0FBMkM7UUFDaEUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFHLEVBQUUsRUFBRTtRQUMxRCxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO1FBQ3JDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFHLEVBQUUsRUFBRTtRQUMvRCxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBWSxFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxFQUFFLEVBQUU7S0FDMUQsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSx5QkFBaUIsb0JBbUM3QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyLCBFbGVtZW50UmVmLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuXG5jb25zdCBEUkFHX09WRVJfQ0xBU1MgPSAnaXMtZHJhZ2dpbmctb3Zlcic7XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVEcmFnRGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjayB7XG4gICBkcmFnZ2VkRWxlbWVudDtcbiAgIHRyZWVEcmFnRW5hYmxlZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSB0cmVlRHJhZ2dlZEVsZW1lbnQ6VHJlZURyYWdnZWRFbGVtZW50KSB7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdnYWJsZScsIHRoaXMudHJlZURyYWdFbmFibGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICB9XG5cbiAgIG9uRHJhZ1N0YXJ0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KHRoaXMuZHJhZ2dlZEVsZW1lbnQpLCAzMCk7XG4gIH1cblxuICAgb25EcmFnRW5kKCkge1xuICAgIHRoaXMudHJlZURyYWdnZWRFbGVtZW50LnNldChudWxsKTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ1t0cmVlRHJhZ10nXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG57dHlwZTogUmVuZGVyZXIsIH0sXG57dHlwZTogVHJlZURyYWdnZWRFbGVtZW50LCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nZHJhZ2dlZEVsZW1lbnQnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWyd0cmVlRHJhZycsIF0gfSxdLFxuJ3RyZWVEcmFnRW5hYmxlZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidvbkRyYWdTdGFydCc6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydkcmFnc3RhcnQnLCBdIH0sXSxcbidvbkRyYWdFbmQnOiBbeyB0eXBlOiBIb3N0TGlzdGVuZXIsIGFyZ3M6IFsnZHJhZ2VuZCcsIF0gfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19