import { Component, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { AdHocComponentFactoryCreator } from './adhoc-component-factory.service';
var TreeNodeContent = (function () {
    function TreeNodeContent(treeModel, componentFactoryResolver, viewContainerRef, adHocComponentFactoryCreator) {
        this.treeModel = treeModel;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.adHocComponentFactoryCreator = adHocComponentFactoryCreator;
    }
    TreeNodeContent.prototype.ngAfterViewInit = function () {
        this._loadTreeNodeContent();
    };
    TreeNodeContent.prototype._loadTreeNodeContent = function () {
        var componentFactory;
        try {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.treeNodeContentComponent);
        }
        catch (error) {
            componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.treeNodeContentComponent);
        }
        var componentRef = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
        componentRef.instance.node = this.node;
        componentRef.instance.context = this.node.context;
        componentRef.changeDetectorRef.detectChanges();
    };
    return TreeNodeContent;
}());
export { TreeNodeContent };
TreeNodeContent.decorators = [
    { type: Component, args: [{
                selector: 'TreeNodeContent',
                template: '',
            },] },
];
/** @nocollapse */
TreeNodeContent.ctorParameters = function () { return [
    { type: TreeModel, },
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
    { type: AdHocComponentFactoryCreator, },
]; };
TreeNodeContent.propDecorators = {
    'node': [{ type: Input },],
    'treeNodeContentTemplate': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2RlcHJlY2F0ZWQtdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFPLHdCQUFBLEVBQXlFLGdCQUFBLEVBQThCLE1BQU8sZUFBQSxDQUFnQjtBQUd6SixPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sc0JBQUEsQ0FBdUI7QUFDakQsT0FBTyxFQUFFLDRCQUFBLEVBQTZCLE1BQU8sbUNBQUEsQ0FBb0M7QUFRakY7SUFJRSx5QkFDVSxTQUFvQixFQUNwQix3QkFBa0QsRUFDbEQsZ0JBQWtDLEVBQ2xDLDRCQUEwRDtRQUgxRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQThCO0lBRXBFLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDhDQUFvQixHQUFwQjtRQUNFLElBQUksZ0JBQWdCLENBQUM7UUFDckIsSUFBSSxDQUFDO1lBQ0gsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNwSCxDQUFDO1FBQUMsS0FBSyxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLGdCQUFnQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzNHLENBQUM7UUFDRCxJQUFJLFlBQVksR0FDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFvQixnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xILFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEQsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFrQkgsc0JBQUM7QUFBRCxDQS9DQSxBQStDQzs7QUFqQk0sMEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN4QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsRUFBRTthQUNiLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsU0FBUyxHQUFHO0lBQ25CLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixHQUFHO0lBQ2xDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixHQUFHO0lBQzFCLEVBQUMsSUFBSSxFQUFFLDRCQUE0QixHQUFHO0NBQ3JDLEVBTDZGLENBSzdGLENBQUM7QUFDSyw4QkFBYyxHQUEyQztJQUNoRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUMxQix5QkFBeUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQzVDLENBQUMiLCJmaWxlIjoiZGVwcmVjYXRlZC10cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIEFmdGVyVmlld0luaXQsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvciB9IGZyb20gJy4vYWRob2MtY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUcmVlTm9kZVRlbXBsYXRlIHtcclxuICBub2RlOiBUcmVlTm9kZTtcclxuICBjb250ZXh0OiBhbnk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb250ZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgIG5vZGU6IFRyZWVOb2RlO1xyXG4gICB0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVRyZWVOb2RlVGVtcGxhdGU+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSBhZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yOiBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yXHJcbiAgICApIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuX2xvYWRUcmVlTm9kZUNvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIF9sb2FkVHJlZU5vZGVDb250ZW50KCkge1xyXG4gICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy50cmVlTW9kZWwudHJlZU5vZGVDb250ZW50Q29tcG9uZW50KTtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuYWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvci5nZXRGYWN0b3J5KHRoaXMudHJlZU1vZGVsLnRyZWVOb2RlQ29udGVudENvbXBvbmVudCk7XHJcbiAgICB9XHJcbiAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8SVRyZWVOb2RlVGVtcGxhdGU+XHJcbiAgICAgID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudDxJVHJlZU5vZGVUZW1wbGF0ZT4oY29tcG9uZW50RmFjdG9yeSwgMCwgdGhpcy52aWV3Q29udGFpbmVyUmVmLmluamVjdG9yKTtcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnRleHQgPSB0aGlzLm5vZGUuY29udGV4dDtcclxuXHJcbiAgICBjb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xyXG4gIHNlbGVjdG9yOiAnVHJlZU5vZGVDb250ZW50JyxcclxuICB0ZW1wbGF0ZTogJycsXHJcbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG57dHlwZTogVHJlZU1vZGVsLCB9LFxue3R5cGU6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgfSxcbnt0eXBlOiBWaWV3Q29udGFpbmVyUmVmLCB9LFxue3R5cGU6IEFkSG9jQ29tcG9uZW50RmFjdG9yeUNyZWF0b3IsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ3RyZWVOb2RlQ29udGVudFRlbXBsYXRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==