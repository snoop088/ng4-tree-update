"use strict";
var core_1 = require('@angular/core');
var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    LoadingComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'LoadingComponent',
                    template: "<span *ngIf=\"!loadingTemplate\">loading...</span>\n  <template [ngTemplateOutlet]=\"loadingTemplate\"></template>",
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = [];
    LoadingComponent.propDecorators = {
        'loadingTemplate': [{ type: core_1.Input },],
    };
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQThDLGVBQzlDLENBQUMsQ0FENEQ7QUFJN0Q7SUFBQTtJQWVBLENBQUM7SUFiTSwyQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsb0hBQ2lEO2lCQUM1RCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBNkQsRUFDakYsQ0FBQztJQUNLLCtCQUFjLEdBQTJDO1FBQ2hFLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7S0FDcEMsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSx3QkFBZ0IsbUJBZTVCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5cblxuZXhwb3J0IGNsYXNzIExvYWRpbmdDb21wb25lbnQge1xuICAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ0xvYWRpbmdDb21wb25lbnQnLFxuICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiIWxvYWRpbmdUZW1wbGF0ZVwiPmxvYWRpbmcuLi48L3NwYW4+XG4gIDx0ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJsb2FkaW5nVGVtcGxhdGVcIj48L3RlbXBsYXRlPmAsXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbG9hZGluZ1RlbXBsYXRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19