"use strict";
var core_1 = require('@angular/core');
var tree_model_1 = require('../models/tree.model');
var adhoc_component_factory_service_1 = require('./adhoc-component-factory.service');
var LoadingComponent = (function () {
    function LoadingComponent(treeModel, componentFactoryResolver, viewContainerRef, adHocComponentFactoryCreator) {
        this.treeModel = treeModel;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.adHocComponentFactoryCreator = adHocComponentFactoryCreator;
    }
    LoadingComponent.prototype.ngAfterViewInit = function () {
        this._loadTreeNodeContent();
    };
    LoadingComponent.prototype._loadTreeNodeContent = function () {
        var componentFactory;
        try {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.treeModel.loadingComponent);
        }
        catch (error) {
            componentFactory = this.adHocComponentFactoryCreator.getFactory(this.treeModel.loadingComponent);
        }
        var componentRef = this.viewContainerRef.createComponent(componentFactory);
        componentRef.changeDetectorRef.detectChanges();
    };
    LoadingComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'LoadingComponent',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: tree_model_1.TreeModel, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ViewContainerRef, },
        { type: adhoc_component_factory_service_1.AdHocComponentFactoryCreator, },
    ]; };
    LoadingComponent.propDecorators = {
        'loadingTemplate': [{ type: core_1.Input },],
    };
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwcmVjYXRlZC1sb2FkaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2RlcHJlY2F0ZWQtbG9hZGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUEySCxlQUMzSCxDQUFDLENBRHlJO0FBRTFJLDJCQUEwQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2pELGdEQUE2QyxtQ0FBbUMsQ0FBQyxDQUFBO0FBR2pGO0lBR0UsMEJBQW9CLFNBQW9CLEVBQ3BCLHdCQUFrRCxFQUNsRCxnQkFBa0MsRUFDbEMsNEJBQTBEO1FBSDFELGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBOEI7SUFDOUUsQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsK0NBQW9CLEdBQXBCO1FBQ0UsSUFBSSxnQkFBZ0IsQ0FBQztRQUNyQixJQUFJLENBQUM7WUFDSCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVHLENBQUU7UUFBQSxLQUFLLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkcsQ0FBQztRQUNELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRSxZQUFZLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUNJLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxFQUFFO2lCQUNiLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsc0JBQVMsR0FBRztRQUNuQixFQUFDLElBQUksRUFBRSwrQkFBd0IsR0FBRztRQUNsQyxFQUFDLElBQUksRUFBRSx1QkFBZ0IsR0FBRztRQUMxQixFQUFDLElBQUksRUFBRSw4REFBNEIsR0FBRztLQUNyQyxFQUw2RixDQUs3RixDQUFDO0lBQ0ssK0JBQWMsR0FBMkM7UUFDaEUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtLQUNwQyxDQUFDO0lBQ0YsdUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLHdCQUFnQixtQkF1QzVCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5wdXQsIENvbXBvbmVudEZhY3RvcnksIFRlbXBsYXRlUmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yIH0gZnJvbSAnLi9hZGhvYy1jb21wb25lbnQtZmFjdG9yeS5zZXJ2aWNlJztcblxuXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yOiBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fbG9hZFRyZWVOb2RlQ29udGVudCgpO1xuICB9XG5cbiAgX2xvYWRUcmVlTm9kZUNvbnRlbnQoKSB7XG4gICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRyZWVNb2RlbC5sb2FkaW5nQ29tcG9uZW50KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5hZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yLmdldEZhY3RvcnkodGhpcy50cmVlTW9kZWwubG9hZGluZ0NvbXBvbmVudCk7XG4gICAgfVxuICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgc2VsZWN0b3I6ICdMb2FkaW5nQ29tcG9uZW50JyxcbiAgdGVtcGxhdGU6ICcnXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFRyZWVNb2RlbCwgfSxcbnt0eXBlOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIH0sXG57dHlwZTogVmlld0NvbnRhaW5lclJlZiwgfSxcbnt0eXBlOiBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yLCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbG9hZGluZ1RlbXBsYXRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==