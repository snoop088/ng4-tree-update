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
            AdHocModule.ctorParameters = [];
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
    AdHocComponentFactoryCreator.ctorParameters = [
        { type: core_1.Compiler, },
    ];
    return AdHocComponentFactoryCreator;
}());
exports.AdHocComponentFactoryCreator = AdHocComponentFactoryCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRob2MtY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2FkaG9jLWNvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFpRSxlQUFlLENBQUMsQ0FBQTtBQUNqRix1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUcvQztJQUdFLHNDQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRnRDLGNBQVMsR0FBNEIsRUFBRSxDQUFDO0lBR3hDLENBQUM7SUFFRCxpREFBVSxHQUFWLFVBQVcsU0FBYztRQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsbUVBQTRCLEdBQTVCLFVBQTZCLFNBQWM7UUFFekM7WUFBQTtZQVVKLENBQUM7WUFWNkIsc0JBQVUsR0FBMEI7Z0JBQ2xFLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs0QkFDbkIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUN6QixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQzVCLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7eUJBQ3hCLEVBQUcsRUFBRTthQUNULENBQUM7WUFDRixrQkFBa0I7WUFDWCwwQkFBYyxHQUE2RCxFQUNqRixDQUFDO1lBQ0Ysa0JBQUM7UUFBRCxDQUFDLEFBVkcsSUFVSDtRQUNHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUNBQWlDLENBQUMsV0FBVyxDQUFDLENBQUMsa0JBQWtCO2FBQzFGLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0ksdUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkNBQWMsR0FBNkQ7UUFDbEYsRUFBQyxJQUFJLEVBQUUsZUFBUSxHQUFHO0tBQ2pCLENBQUM7SUFDRixtQ0FBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksb0NBQTRCLCtCQXVDeEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nTW9kdWxlLCBDb21wb25lbnRGYWN0b3J5LCBDb21waWxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5leHBvcnQgY2xhc3MgQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvciB7XG4gIGZhY3RvcmllczogQ29tcG9uZW50RmFjdG9yeTxhbnk+W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBpbGVyOiBDb21waWxlcikge1xuICB9XG5cbiAgZ2V0RmFjdG9yeShjb21wb25lbnQ6IGFueSk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiB7XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLmZhY3Rvcmllcy5maW5kKGZhY3RvcnkgPT4gZmFjdG9yeS5jb21wb25lbnRUeXBlID09PSBjb21wb25lbnQpO1xuICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgZmFjdG9yeSA9IHRoaXMuX2NyZWF0ZUFkSG9jQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfVxuXG4gIF9jcmVhdGVBZEhvY0NvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50OiBhbnkpOiBDb21wb25lbnRGYWN0b3J5PGFueT4ge1xuICAgIFxuICAgIGNsYXNzIEFkSG9jTW9kdWxlIHtzdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcbiAgICAgIGRlY2xhcmF0aW9uczogW2NvbXBvbmVudF0sXG4gICAgICBlbnRyeUNvbXBvbmVudHM6IFtjb21wb25lbnRdLFxuICAgICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgfSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbl07XG59XG4gICAgbGV0IGZhY3RvcnkgPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYyhBZEhvY01vZHVsZSkuY29tcG9uZW50RmFjdG9yaWVzXG4gICAgICAuZmluZChmYWN0b3J5ID0+IGZhY3RvcnkuY29tcG9uZW50VHlwZSA9PT0gY29tcG9uZW50KTtcbiAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKGZhY3RvcnkpO1xuICAgIHJldHVybiBmYWN0b3J5O1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IENvbXBpbGVyLCB9LFxuXTtcbn1cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==