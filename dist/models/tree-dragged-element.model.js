"use strict";
var core_1 = require('@angular/core');
var TreeDraggedElement = (function () {
    function TreeDraggedElement() {
        this._draggedElement = null;
    }
    TreeDraggedElement.prototype.set = function (draggedElement) {
        this._draggedElement = draggedElement;
    };
    TreeDraggedElement.prototype.get = function () {
        return this._draggedElement;
    };
    TreeDraggedElement.prototype.isDragging = function () {
        return !!this.get();
    };
    TreeDraggedElement.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TreeDraggedElement.ctorParameters = [];
    return TreeDraggedElement;
}());
exports.TreeDraggedElement = TreeDraggedElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFHM0M7SUFBQTtRQUNFLG9CQUFlLEdBQVEsSUFBSSxDQUFDO0lBbUI5QixDQUFDO0lBakJDLGdDQUFHLEdBQUgsVUFBSSxjQUFrQjtRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsZ0NBQUcsR0FBSDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCx1Q0FBVSxHQUFWO1FBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNJLDZCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGlDQUFjLEdBQTZELEVBQ2pGLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksMEJBQWtCLHFCQW9COUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZURyYWdnZWRFbGVtZW50IHtcbiAgX2RyYWdnZWRFbGVtZW50OiBhbnkgPSBudWxsO1xuXG4gIHNldChkcmFnZ2VkRWxlbWVudDphbnkpIHtcbiAgICB0aGlzLl9kcmFnZ2VkRWxlbWVudCA9IGRyYWdnZWRFbGVtZW50O1xuICB9XG5cbiAgZ2V0KCk6YW55IHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ2dlZEVsZW1lbnQ7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiAhIXRoaXMuZ2V0KCk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG5dO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=