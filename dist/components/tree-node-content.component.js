"use strict";
var core_1 = require('@angular/core');
var TreeNodeContent = (function () {
    function TreeNodeContent() {
    }
    TreeNodeContent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'TreeNodeContent',
                    template: "<span *ngIf=\"!treeNodeContentTemplate\">{{ node.displayField }}</span>\n  <template [ngTemplateOutlet]=\"treeNodeContentTemplate\" [ngOutletContext]=\"{ $implicit: node }\"></template>",
                },] },
    ];
    /** @nocollapse */
    TreeNodeContent.ctorParameters = function () { return []; };
    TreeNodeContent.propDecorators = {
        'node': [{ type: core_1.Input },],
        'treeNodeContentTemplate': [{ type: core_1.Input },],
    };
    return TreeNodeContent;
}());
exports.TreeNodeContent = TreeNodeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBOEMsZUFBZSxDQUFDLENBQUE7QUFTOUQ7SUFBQTtJQWlCQSxDQUFDO0lBZE0sMEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDJMQUNpRztpQkFDNUcsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0ssOEJBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDMUIseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtLQUM1QyxDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLHVCQUFlLGtCQWlCM0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUcmVlTm9kZVRlbXBsYXRlIHtcbiAgbm9kZTogVHJlZU5vZGU7XG4gIGNvbnRleHQ6IGFueTtcbn1cblxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb250ZW50IHtcbiAgIG5vZGU6IFRyZWVOb2RlO1xuICAgdHJlZU5vZGVDb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElUcmVlTm9kZVRlbXBsYXRlPjtcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgc2VsZWN0b3I6ICdUcmVlTm9kZUNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiIXRyZWVOb2RlQ29udGVudFRlbXBsYXRlXCI+e3sgbm9kZS5kaXNwbGF5RmllbGQgfX08L3NwYW4+XG4gIDx0ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZVwiIFtuZ091dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvdGVtcGxhdGU+YCxcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3RyZWVOb2RlQ29udGVudFRlbXBsYXRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19