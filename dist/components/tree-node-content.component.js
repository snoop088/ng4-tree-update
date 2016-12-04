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
    TreeNodeContent.ctorParameters = [];
    TreeNodeContent.propDecorators = {
        'node': [{ type: core_1.Input },],
        'treeNodeContentTemplate': [{ type: core_1.Input },],
    };
    return TreeNodeContent;
}());
exports.TreeNodeContent = TreeNodeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBOEMsZUFBZSxDQUFDLENBQUE7QUFTOUQ7SUFBQTtJQWlCQSxDQUFDO0lBZE0sMEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDJMQUNpRztpQkFDNUcsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQTZELEVBQ2pGLENBQUM7SUFDSyw4QkFBYyxHQUEyQztRQUNoRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUMxQix5QkFBeUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO0tBQzVDLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksdUJBQWUsa0JBaUIzQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVOb2RlVGVtcGxhdGUge1xuICBub2RlOiBUcmVlTm9kZTtcbiAgY29udGV4dDogYW55O1xufVxuXG5cbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbnRlbnQge1xuICAgbm9kZTogVHJlZU5vZGU7XG4gICB0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVRyZWVOb2RlVGVtcGxhdGU+O1xuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ1RyZWVOb2RlQ29udGVudCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gKm5nSWY9XCIhdHJlZU5vZGVDb250ZW50VGVtcGxhdGVcIj57eyBub2RlLmRpc3BsYXlGaWVsZCB9fTwvc3Bhbj5cbiAgPHRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRyZWVOb2RlQ29udGVudFRlbXBsYXRlXCIgW25nT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogbm9kZSB9XCI+PC90ZW1wbGF0ZT5gLFxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ25vZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ndHJlZU5vZGVDb250ZW50VGVtcGxhdGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=