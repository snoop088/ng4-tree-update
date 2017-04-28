import { Injectable, NgModule, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';
var AdHocComponentFactoryCreator = (function () {
    function AdHocComponentFactoryCreator(compiler) {
        this.compiler = compiler;
        this.factories = [];
    }
    AdHocComponentFactoryCreator.prototype.getFactory = function (component) {
        var factory = this.factories.find(function (factory) { return factory.componentType === component; });
        if (!factory) {
            factory = this._createAdHocComponentFactory(component);
        }
        return factory;
    };
    AdHocComponentFactoryCreator.prototype._createAdHocComponentFactory = function (component) {
        var AdHocModule = (function () {
            function AdHocModule() {
            }
            return AdHocModule;
        }());
        AdHocModule.decorators = [
            { type: NgModule, args: [{
                        declarations: [component],
                        entryComponents: [component],
                        imports: [CommonModule],
                    },] },
        ];
        /** @nocollapse */
        AdHocModule.ctorParameters = function () { return []; };
        var factory = this.compiler.compileModuleAndAllComponentsSync(AdHocModule).componentFactories
            .find(function (factory) { return factory.componentType === component; });
        this.factories.push(factory);
        return factory;
    };
    return AdHocComponentFactoryCreator;
}());
export { AdHocComponentFactoryCreator };
AdHocComponentFactoryCreator.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AdHocComponentFactoryCreator.ctorParameters = function () { return [
    { type: Compiler, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2FkaG9jLWNvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQUEsRUFBWSxRQUFBLEVBQTRCLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDakYsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBRy9DO0lBR0Usc0NBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGdEMsY0FBUyxHQUE0QixFQUFFLENBQUM7SUFHeEMsQ0FBQztJQUVELGlEQUFVLEdBQVYsVUFBVyxTQUFjO1FBQ3ZCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUNsRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtRUFBNEIsR0FBNUIsVUFBNkIsU0FBYztRQUV6QztZQUFBO1lBVUosQ0FBQztZQUFELGtCQUFDO1FBQUQsQ0FWSSxBQVVIO1FBVjZCLHNCQUFVLEdBQTBCO1lBQ2xFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzt3QkFDbkIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUN6QixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQzVCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztxQkFDeEIsRUFBRyxFQUFFO1NBQ1QsQ0FBQztRQUNGLGtCQUFrQjtRQUNYLDBCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO1FBRUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQ0FBaUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxrQkFBa0I7YUFDMUYsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFRSCxtQ0FBQztBQUFELENBdkNBLEFBdUNDOztBQVBNLHVDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMkNBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRztDQUNqQixFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6ImFkaG9jLWNvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdNb2R1bGUsIENvbXBvbmVudEZhY3RvcnksIENvbXBpbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFkSG9jQ29tcG9uZW50RmFjdG9yeUNyZWF0b3Ige1xyXG4gIGZhY3RvcmllczogQ29tcG9uZW50RmFjdG9yeTxhbnk+W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21waWxlcjogQ29tcGlsZXIpIHtcclxuICB9XHJcblxyXG4gIGdldEZhY3RvcnkoY29tcG9uZW50OiBhbnkpOiBDb21wb25lbnRGYWN0b3J5PGFueT4ge1xyXG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLmZhY3Rvcmllcy5maW5kKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21wb25lbnRUeXBlID09PSBjb21wb25lbnQpO1xyXG4gICAgaWYgKCFmYWN0b3J5KSB7XHJcbiAgICAgIGZhY3RvcnkgPSB0aGlzLl9jcmVhdGVBZEhvY0NvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWN0b3J5O1xyXG4gIH1cclxuXHJcbiAgX2NyZWF0ZUFkSG9jQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQ6IGFueSk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiB7XHJcbiAgICBcclxuICAgIGNsYXNzIEFkSG9jTW9kdWxlIHtzdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcclxuICAgICAgZGVjbGFyYXRpb25zOiBbY29tcG9uZW50XSxcclxuICAgICAgZW50cnlDb21wb25lbnRzOiBbY29tcG9uZW50XSxcclxuICAgICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICB9LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbn1cclxuICAgIGxldCBmYWN0b3J5ID0gdGhpcy5jb21waWxlci5jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c1N5bmMoQWRIb2NNb2R1bGUpLmNvbXBvbmVudEZhY3Rvcmllc1xyXG4gICAgICAuZmluZChmYWN0b3J5ID0+IGZhY3RvcnkuY29tcG9uZW50VHlwZSA9PT0gY29tcG9uZW50KTtcclxuICAgIHRoaXMuZmFjdG9yaWVzLnB1c2goZmFjdG9yeSk7XHJcbiAgICByZXR1cm4gZmFjdG9yeTtcclxuICB9XHJcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG57dHlwZTogQ29tcGlsZXIsIH0sXG5dO1xufVxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19