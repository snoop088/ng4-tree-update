"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
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
            AdHocModule.decorators = [
                { type: core_1.NgModule, args: [{
                            declarations: [component],
                            entryComponents: [component],
                            imports: [common_1.CommonModule],
                        },] },
            ];
            /** @nocollapse */
            AdHocModule.ctorParameters = function () { return []; };
            return AdHocModule;
        }());
        var factory = this.compiler.compileModuleAndAllComponentsSync(AdHocModule).componentFactories
            .find(function (factory) { return factory.componentType === component; });
        this.factories.push(factory);
        return factory;
    };
    AdHocComponentFactoryCreator.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AdHocComponentFactoryCreator.ctorParameters = function () { return [
        { type: core_1.Compiler, },
    ]; };
    return AdHocComponentFactoryCreator;
}());
exports.AdHocComponentFactoryCreator = AdHocComponentFactoryCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRob2MtY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2FkaG9jLWNvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFpRSxlQUFlLENBQUMsQ0FBQTtBQUNqRix1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUcvQztJQUdFLHNDQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRnRDLGNBQVMsR0FBNEIsRUFBRSxDQUFDO0lBR3hDLENBQUM7SUFFRCxpREFBVSxHQUFWLFVBQVcsU0FBYztRQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsbUVBQTRCLEdBQTVCLFVBQTZCLFNBQWM7UUFFekM7WUFBQTtZQVVKLENBQUM7WUFWNkIsc0JBQVUsR0FBMEI7Z0JBQ2xFLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs0QkFDbkIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUN6QixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQzVCLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7eUJBQ3hCLEVBQUcsRUFBRTthQUNULENBQUM7WUFDRixrQkFBa0I7WUFDWCwwQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztZQUNGLGtCQUFDO1FBQUQsQ0FBQyxBQVZHLElBVUg7UUFDRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGtCQUFrQjthQUMxRixJQUFJLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNJLHVDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxlQUFRLEdBQUc7S0FDakIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLG1DQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxvQ0FBNEIsK0JBdUN4QyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdNb2R1bGUsIENvbXBvbmVudEZhY3RvcnksIENvbXBpbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yIHtcbiAgZmFjdG9yaWVzOiBDb21wb25lbnRGYWN0b3J5PGFueT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyKSB7XG4gIH1cblxuICBnZXRGYWN0b3J5KGNvbXBvbmVudDogYW55KTogQ29tcG9uZW50RmFjdG9yeTxhbnk+IHtcbiAgICBsZXQgZmFjdG9yeSA9IHRoaXMuZmFjdG9yaWVzLmZpbmQoZmFjdG9yeSA9PiBmYWN0b3J5LmNvbXBvbmVudFR5cGUgPT09IGNvbXBvbmVudCk7XG4gICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICBmYWN0b3J5ID0gdGhpcy5fY3JlYXRlQWRIb2NDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgfVxuICAgIHJldHVybiBmYWN0b3J5O1xuICB9XG5cbiAgX2NyZWF0ZUFkSG9jQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQ6IGFueSk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiB7XG4gICAgXG4gICAgY2xhc3MgQWRIb2NNb2R1bGUge3N0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICAgICAgZGVjbGFyYXRpb25zOiBbY29tcG9uZW50XSxcbiAgICAgIGVudHJ5Q29tcG9uZW50czogW2NvbXBvbmVudF0sXG4gICAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICB9LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbn1cbiAgICBsZXQgZmFjdG9yeSA9IHRoaXMuY29tcGlsZXIuY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jKEFkSG9jTW9kdWxlKS5jb21wb25lbnRGYWN0b3JpZXNcbiAgICAgIC5maW5kKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21wb25lbnRUeXBlID09PSBjb21wb25lbnQpO1xuICAgIHRoaXMuZmFjdG9yaWVzLnB1c2goZmFjdG9yeSk7XG4gICAgcmV0dXJuIGZhY3Rvcnk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG57dHlwZTogQ29tcGlsZXIsIH0sXG5dO1xufVxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19