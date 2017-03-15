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
    LoadingComponent.ctorParameters = function () { return []; };
    LoadingComponent.propDecorators = {
        'loadingTemplate': [{ type: core_1.Input },],
    };
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQThDLGVBQzlDLENBQUMsQ0FENEQ7QUFJN0Q7SUFBQTtJQWVBLENBQUM7SUFiTSwyQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsb0hBQ2lEO2lCQUM1RCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSywrQkFBYyxHQUEyQztRQUNoRSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO0tBQ3BDLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksd0JBQWdCLG1CQWU1QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUubW9kZWwnO1xuXG5cbmV4cG9ydCBjbGFzcyBMb2FkaW5nQ29tcG9uZW50IHtcbiAgIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgc2VsZWN0b3I6ICdMb2FkaW5nQ29tcG9uZW50JyxcbiAgdGVtcGxhdGU6IGA8c3BhbiAqbmdJZj1cIiFsb2FkaW5nVGVtcGxhdGVcIj5sb2FkaW5nLi4uPC9zcGFuPlxuICA8dGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibG9hZGluZ1RlbXBsYXRlXCI+PC90ZW1wbGF0ZT5gLFxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ2xvYWRpbmdUZW1wbGF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==