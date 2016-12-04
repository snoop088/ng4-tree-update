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
    TreeDragDirective.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: tree_dragged_element_model_1.TreeDraggedElement, },
    ];
    TreeDragDirective.propDecorators = {
        'draggedElement': [{ type: core_1.Input, args: ['treeDrag',] },],
        'treeDragEnabled': [{ type: core_1.Input },],
        'onDragStart': [{ type: core_1.HostListener, args: ['dragstart',] },],
        'onDragEnd': [{ type: core_1.HostListener, args: ['dragend',] },],
    };
    return TreeDragDirective;
}());
exports.TreeDragDirective = TreeDragDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUE0RixlQUFlLENBQUMsQ0FBQTtBQUM1RywyQ0FBbUMsc0NBQXNDLENBQUMsQ0FBQTtBQUUxRSxJQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUczQztJQUlFLDJCQUFvQixFQUFjLEVBQVUsUUFBa0IsRUFBVSxrQkFBcUM7UUFBekYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO0lBQzdHLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVBLHVDQUFXLEdBQVg7UUFBQSxpQkFFQTtRQURDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQWhELENBQWdELEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVBLHFDQUFTLEdBQVQ7UUFDQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDSSw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsWUFBWTtpQkFDdkIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGdDQUFjLEdBQTZEO1FBQ2xGLEVBQUMsSUFBSSxFQUFFLGlCQUFVLEdBQUc7UUFDcEIsRUFBQyxJQUFJLEVBQUUsZUFBUSxHQUFHO1FBQ2xCLEVBQUMsSUFBSSxFQUFFLCtDQUFrQixHQUFHO0tBQzNCLENBQUM7SUFDSyxnQ0FBYyxHQUEyQztRQUNoRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUcsRUFBRSxFQUFFO1FBQzFELGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDckMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUcsRUFBRSxFQUFFO1FBQy9ELFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFHLEVBQUUsRUFBRTtLQUMxRCxDQUFDO0lBQ0Ysd0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLHlCQUFpQixvQkFtQzdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIsIEVsZW1lbnRSZWYsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4uL21vZGVscy90cmVlLWRyYWdnZWQtZWxlbWVudC5tb2RlbCc7XG5cbmNvbnN0IERSQUdfT1ZFUl9DTEFTUyA9ICdpcy1kcmFnZ2luZy1vdmVyJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZURyYWdEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgIGRyYWdnZWRFbGVtZW50O1xuICAgdHJlZURyYWdFbmFibGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDpUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2dhYmxlJywgdGhpcy50cmVlRHJhZ0VuYWJsZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gIH1cblxuICAgb25EcmFnU3RhcnQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5zZXQodGhpcy5kcmFnZ2VkRWxlbWVudCksIDMwKTtcbiAgfVxuXG4gICBvbkRyYWdFbmQoKSB7XG4gICAgdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KG51bGwpO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gIHNlbGVjdG9yOiAnW3RyZWVEcmFnXSdcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBSZW5kZXJlciwgfSxcbnt0eXBlOiBUcmVlRHJhZ2dlZEVsZW1lbnQsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidkcmFnZ2VkRWxlbWVudCc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ3RyZWVEcmFnJywgXSB9LF0sXG4ndHJlZURyYWdFbmFibGVkJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uRHJhZ1N0YXJ0JzogW3sgdHlwZTogSG9zdExpc3RlbmVyLCBhcmdzOiBbJ2RyYWdzdGFydCcsIF0gfSxdLFxuJ29uRHJhZ0VuZCc6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydkcmFnZW5kJywgXSB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=