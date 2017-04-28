import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TREE_ACTIONS } from './models/tree-options.model';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { LoadingComponent } from './components/loading.component';
import { LoadingComponent as DeprecatedLoadingComponent } from './components/deprecated-loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeContent as DeprecatedTreeNodeContent } from './components/deprecated-tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { AdHocComponentFactoryCreator } from './components/adhoc-component-factory.service';
import './polyfills';
import { deprecated } from './deprecated';
export { TreeModel, TreeNode, TreeDraggedElement, TREE_ACTIONS, KEYS, LoadingComponent, TreeComponent, TreeNodeComponent, TreeNodeContent, TreeDropDirective, TreeDragDirective, TreeNodeDropSlot };
var TreeModule = (function () {
    function TreeModule() {
    }
    return TreeModule;
}());
export { TreeModule };
TreeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    LoadingComponent,
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeDropSlot,
                    TreeNodeContent,
                    TreeDropDirective,
                    TreeDragDirective
                ],
                exports: [
                    TreeComponent,
                    TreeDropDirective,
                    TreeDragDirective
                ],
                imports: [
                    CommonModule,
                ],
                providers: [
                    TreeDraggedElement
                ]
            },] },
];
/** @nocollapse */
TreeModule.ctorParameters = function () { return []; };
var DeprecatedTreeModule = (function () {
    function DeprecatedTreeModule() {
        deprecated('DeprecatedTreeModule', 'TreeModule for AoT compilation');
    }
    return DeprecatedTreeModule;
}());
export { DeprecatedTreeModule };
DeprecatedTreeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DeprecatedLoadingComponent,
                    DeprecatedTreeNodeContent
                ],
                exports: [
                    TreeComponent,
                    TreeDropDirective,
                    TreeDragDirective
                ],
                imports: [
                    CommonModule,
                    TreeModule,
                ],
                providers: [
                    AdHocComponentFactoryCreator
                ],
            },] },
];
/** @nocollapse */
DeprecatedTreeModule.ctorParameters = function () { return []; };
export default TreeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9hbmd1bGFyMi10cmVlLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQVksZUFBQSxDQUFnQjtBQUM5QyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFFL0MsT0FBTyxFQUFFLFlBQUEsRUFBNkMsTUFBTyw2QkFBQSxDQUE4QjtBQUUzRixPQUFPLEVBQUUsSUFBQSxFQUFLLE1BQU8sa0JBQUEsQ0FBbUI7QUFDeEMsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLHFCQUFBLENBQXNCO0FBQ2hELE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTywwQkFBQSxDQUEyQjtBQUNwRCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxxQ0FBQSxDQUFzQztBQUN6RSxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxnQ0FBQSxDQUFpQztBQUNsRSxPQUFPLEVBQUUsZ0JBQUEsSUFBb0IsMEJBQUEsRUFBMkIsTUFBTywyQ0FBQSxDQUE0QztBQUMzRyxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sNkJBQUEsQ0FBOEI7QUFDNUQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sa0NBQUEsQ0FBbUM7QUFDckUsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTywwQ0FBQSxDQUEyQztBQUMzRSxPQUFPLEVBQUUsZUFBQSxJQUFtQix5QkFBQSxFQUEwQixNQUFPLHFEQUFBLENBQXNEO0FBQ25ILE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLDRDQUFBLENBQTZDO0FBQzlFLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGtDQUFBLENBQW1DO0FBQ3JFLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGtDQUFBLENBQW1DO0FBQ3JFLE9BQU8sRUFBRSw0QkFBQSxFQUE2QixNQUFPLDhDQUFBLENBQStDO0FBRTVGLE9BQU8sYUFBQSxDQUFjO0FBQ3JCLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxjQUFBLENBQWU7QUFFMUMsT0FBTyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1Isa0JBQWtCLEVBRWxCLFlBQVksRUFDWixJQUFJLEVBR0osZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2pCLENBQUM7QUFHRjtJQUFBO0lBMkJBLENBQUM7SUFBRCxpQkFBQztBQUFELENBM0JBLEFBMkJDOztBQTNCK0IscUJBQVUsR0FBMEI7SUFDcEUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGtCQUFrQjtpQkFDbkI7YUFDRixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gseUJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFHRjtJQUNFO1FBQ0UsVUFBVSxDQUFDLHNCQUFzQixFQUFFLGdDQUFnQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQXdCSCwyQkFBQztBQUFELENBM0JBLEFBMkJDOztBQXZCTSwrQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRTtvQkFDWiwwQkFBMEI7b0JBQzFCLHlCQUF5QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFVBQVU7aUJBQ1g7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULDRCQUE0QjtpQkFDN0I7YUFDRixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsbUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFFRixlQVplLFVBQUEsQ0FBVyIsImZpbGUiOiJhbmd1bGFyMi10cmVlLWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFRSRUVfQUNUSU9OUywgSUFjdGlvbk1hcHBpbmcsIElBY3Rpb25IYW5kbGVyIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgSVRyZWVPcHRpb25zIH0gZnJvbSAnLi9kZWZzL2FwaSc7XHJcbmltcG9ydCB7IEtFWVMgfSBmcm9tICcuL2NvbnN0YW50cy9rZXlzJztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRpbmcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCBhcyBEZXByZWNhdGVkTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kZXByZWNhdGVkLWxvYWRpbmcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZU5vZGVDb250ZW50IGFzIERlcHJlY2F0ZWRUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGVwcmVjYXRlZC10cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZURyb3BTbG90IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS1kcm9wLXNsb3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZURyb3BEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcm9wLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRyZWVEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL2FkaG9jLWNvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICcuL3BvbHlmaWxscyc7XHJcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICcuL2RlcHJlY2F0ZWQnO1xyXG5cclxuZXhwb3J0IHtcclxuICBUcmVlTW9kZWwsXHJcbiAgVHJlZU5vZGUsXHJcbiAgVHJlZURyYWdnZWRFbGVtZW50LFxyXG4gIElUcmVlT3B0aW9ucyxcclxuICBUUkVFX0FDVElPTlMsXHJcbiAgS0VZUyxcclxuICBJQWN0aW9uTWFwcGluZyxcclxuICBJQWN0aW9uSGFuZGxlcixcclxuICBMb2FkaW5nQ29tcG9uZW50LFxyXG4gIFRyZWVDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVDb250ZW50LFxyXG4gIFRyZWVEcm9wRGlyZWN0aXZlLFxyXG4gIFRyZWVEcmFnRGlyZWN0aXZlLFxyXG4gIFRyZWVOb2RlRHJvcFNsb3RcclxufTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7c3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBMb2FkaW5nQ29tcG9uZW50LFxyXG4gICAgVHJlZUNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVEcm9wU2xvdCxcclxuICAgIFRyZWVOb2RlQ29udGVudCxcclxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxyXG4gICAgVHJlZURyYWdEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRyZWVDb21wb25lbnQsXHJcbiAgICBUcmVlRHJvcERpcmVjdGl2ZSxcclxuICAgIFRyZWVEcmFnRGlyZWN0aXZlXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFRyZWVEcmFnZ2VkRWxlbWVudFxyXG4gIF1cclxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbl07XG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVwcmVjYXRlZFRyZWVNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgZGVwcmVjYXRlZCgnRGVwcmVjYXRlZFRyZWVNb2R1bGUnLCAnVHJlZU1vZHVsZSBmb3IgQW9UIGNvbXBpbGF0aW9uJyk7XHJcbiAgfVxyXG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERlcHJlY2F0ZWRMb2FkaW5nQ29tcG9uZW50LFxyXG4gICAgRGVwcmVjYXRlZFRyZWVOb2RlQ29udGVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVHJlZUNvbXBvbmVudCxcclxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxyXG4gICAgVHJlZURyYWdEaXJlY3RpdmVcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFRyZWVNb2R1bGUsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEFkSG9jQ29tcG9uZW50RmFjdG9yeUNyZWF0b3JcclxuICBdLFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbn1cclxuZXhwb3J0IGRlZmF1bHQgVHJlZU1vZHVsZTtcclxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=