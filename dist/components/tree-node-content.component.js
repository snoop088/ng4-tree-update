import { Component, Input } from '@angular/core';
var TreeNodeContent = (function () {
    function TreeNodeContent() {
    }
    return TreeNodeContent;
}());
export { TreeNodeContent };
TreeNodeContent.decorators = [
    { type: Component, args: [{
                selector: 'TreeNodeContent',
                template: "<span *ngIf=\"!treeNodeContentTemplate\">{{ node.displayField }}</span>\n  <ng-template [ngTemplateOutlet]=\"treeNodeContentTemplate\" [ngOutletContext]=\"{ $implicit: node }\"></ng-template>",
            },] },
];
/** @nocollapse */
TreeNodeContent.ctorParameters = function () { return []; };
TreeNodeContent.propDecorators = {
    'node': [{ type: Input },],
    'treeNodeContentTemplate': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLEtBQUEsRUFBbUIsTUFBTyxlQUFBLENBQWdCO0FBUzlEO0lBQUE7SUFpQkEsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FqQkEsQUFpQkM7O0FBZE0sMEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN4QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsaU1BQ3VHO2FBQ2xILEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztBQUNLLDhCQUFjLEdBQTJDO0lBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzFCLHlCQUF5QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDNUMsQ0FBQyIsImZpbGUiOiJ0cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVOb2RlVGVtcGxhdGUge1xyXG4gIG5vZGU6IFRyZWVOb2RlO1xyXG4gIGNvbnRleHQ6IGFueTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbnRlbnQge1xyXG4gICBub2RlOiBUcmVlTm9kZTtcclxuICAgdHJlZU5vZGVDb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElUcmVlTm9kZVRlbXBsYXRlPjtcclxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xyXG4gIHNlbGVjdG9yOiAnVHJlZU5vZGVDb250ZW50JyxcclxuICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiIXRyZWVOb2RlQ29udGVudFRlbXBsYXRlXCI+e3sgbm9kZS5kaXNwbGF5RmllbGQgfX08L3NwYW4+XHJcbiAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRyZWVOb2RlQ29udGVudFRlbXBsYXRlXCIgW25nT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogbm9kZSB9XCI+PC9uZy10ZW1wbGF0ZT5gLFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbm9kZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XHJcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19