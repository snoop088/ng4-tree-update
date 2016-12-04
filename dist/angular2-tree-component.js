"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var tree_options_model_1 = require('./models/tree-options.model');
exports.TREE_ACTIONS = tree_options_model_1.TREE_ACTIONS;
var keys_1 = require('./constants/keys');
exports.KEYS = keys_1.KEYS;
var tree_model_1 = require('./models/tree.model');
exports.TreeModel = tree_model_1.TreeModel;
var tree_node_model_1 = require('./models/tree-node.model');
exports.TreeNode = tree_node_model_1.TreeNode;
var tree_dragged_element_model_1 = require('./models/tree-dragged-element.model');
exports.TreeDraggedElement = tree_dragged_element_model_1.TreeDraggedElement;
var loading_component_1 = require('./components/loading.component');
exports.LoadingComponent = loading_component_1.LoadingComponent;
var deprecated_loading_component_1 = require('./components/deprecated-loading.component');
var tree_component_1 = require('./components/tree.component');
exports.TreeComponent = tree_component_1.TreeComponent;
var tree_node_component_1 = require('./components/tree-node.component');
exports.TreeNodeComponent = tree_node_component_1.TreeNodeComponent;
var tree_node_content_component_1 = require('./components/tree-node-content.component');
exports.TreeNodeContent = tree_node_content_component_1.TreeNodeContent;
var deprecated_tree_node_content_component_1 = require('./components/deprecated-tree-node-content.component');
var tree_node_drop_slot_component_1 = require('./components/tree-node-drop-slot.component');
exports.TreeNodeDropSlot = tree_node_drop_slot_component_1.TreeNodeDropSlot;
var tree_drop_directive_1 = require('./directives/tree-drop.directive');
exports.TreeDropDirective = tree_drop_directive_1.TreeDropDirective;
var tree_drag_directive_1 = require('./directives/tree-drag.directive');
exports.TreeDragDirective = tree_drag_directive_1.TreeDragDirective;
var adhoc_component_factory_service_1 = require('./components/adhoc-component-factory.service');
require('./polyfills');
var deprecated_1 = require('./deprecated');
var TreeModule = (function () {
    function TreeModule() {
    }
    TreeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        loading_component_1.LoadingComponent,
                        tree_component_1.TreeComponent,
                        tree_node_component_1.TreeNodeComponent,
                        tree_node_drop_slot_component_1.TreeNodeDropSlot,
                        tree_node_content_component_1.TreeNodeContent,
                        tree_drop_directive_1.TreeDropDirective,
                        tree_drag_directive_1.TreeDragDirective
                    ],
                    exports: [
                        tree_component_1.TreeComponent,
                        tree_drop_directive_1.TreeDropDirective,
                        tree_drag_directive_1.TreeDragDirective
                    ],
                    imports: [
                        common_1.CommonModule,
                    ],
                    providers: [
                        tree_dragged_element_model_1.TreeDraggedElement
                    ]
                },] },
    ];
    /** @nocollapse */
    TreeModule.ctorParameters = [];
    return TreeModule;
}());
exports.TreeModule = TreeModule;
var DeprecatedTreeModule = (function () {
    function DeprecatedTreeModule() {
        deprecated_1.deprecated('DeprecatedTreeModule', 'TreeModule for AoT compilation');
    }
    DeprecatedTreeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        deprecated_loading_component_1.LoadingComponent,
                        deprecated_tree_node_content_component_1.TreeNodeContent
                    ],
                    exports: [
                        tree_component_1.TreeComponent,
                        tree_drop_directive_1.TreeDropDirective,
                        tree_drag_directive_1.TreeDragDirective
                    ],
                    imports: [
                        common_1.CommonModule,
                        TreeModule,
                    ],
                    providers: [
                        adhoc_component_factory_service_1.AdHocComponentFactoryCreator
                    ],
                },] },
    ];
    /** @nocollapse */
    DeprecatedTreeModule.ctorParameters = [];
    return DeprecatedTreeModule;
}());
exports.DeprecatedTreeModule = DeprecatedTreeModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItdHJlZS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvYW5ndWxhcjItdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUM5Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUUvQyxtQ0FBNkQsNkJBQTZCLENBQUMsQ0FBQTtBQXlCekYsb0JBQVk7QUF2QmQscUJBQXFCLGtCQUFrQixDQUFDLENBQUE7QUF3QnRDLFlBQUk7QUF2Qk4sMkJBQTBCLHFCQUFxQixDQUFDLENBQUE7QUFrQjlDLGlCQUFTO0FBakJYLGdDQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBa0JsRCxnQkFBUTtBQWpCViwyQ0FBbUMscUNBQXFDLENBQUMsQ0FBQTtBQWtCdkUsMEJBQWtCO0FBakJwQixrQ0FBaUMsZ0NBQWdDLENBQUMsQ0FBQTtBQXVCaEUsd0JBQWdCO0FBdEJsQiw2Q0FBK0QsMkNBQTJDLENBQUMsQ0FBQTtBQUMzRywrQkFBOEIsNkJBQTZCLENBQUMsQ0FBQTtBQXNCMUQscUJBQWE7QUFyQmYsb0NBQWtDLGtDQUFrQyxDQUFDLENBQUE7QUFzQm5FLHlCQUFpQjtBQXJCbkIsNENBQWdDLDBDQUEwQyxDQUFDLENBQUE7QUFzQnpFLHVCQUFlO0FBckJqQix1REFBNkQscURBQXFELENBQUMsQ0FBQTtBQUNuSCw4Q0FBaUMsNENBQTRDLENBQUMsQ0FBQTtBQXVCNUUsd0JBQWdCO0FBdEJsQixvQ0FBa0Msa0NBQWtDLENBQUMsQ0FBQTtBQW9CbkUseUJBQWlCO0FBbkJuQixvQ0FBa0Msa0NBQWtDLENBQUMsQ0FBQTtBQW9CbkUseUJBQWlCO0FBbkJuQixnREFBNkMsOENBQThDLENBQUMsQ0FBQTtBQUU1RixRQUFPLGFBQWEsQ0FBQyxDQUFBO0FBQ3JCLDJCQUEyQixjQUFjLENBQUMsQ0FBQTtBQXFCMUM7SUFBQTtJQTJCQSxDQUFDO0lBM0IrQixxQkFBVSxHQUEwQjtRQUNwRSxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDWixvQ0FBZ0I7d0JBQ2hCLDhCQUFhO3dCQUNiLHVDQUFpQjt3QkFDakIsZ0RBQWdCO3dCQUNoQiw2Q0FBZTt3QkFDZix1Q0FBaUI7d0JBQ2pCLHVDQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDhCQUFhO3dCQUNiLHVDQUFpQjt3QkFDakIsdUNBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AscUJBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULCtDQUFrQjtxQkFDbkI7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQTZELEVBQ2pGLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksa0JBQVUsYUEyQnRCLENBQUE7QUFFRDtJQUNFO1FBQ0UsdUJBQVUsQ0FBQyxzQkFBc0IsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDSSwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDWiwrQ0FBMEI7d0JBQzFCLHdEQUF5QjtxQkFDMUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDhCQUFhO3dCQUNiLHVDQUFpQjt3QkFDakIsdUNBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AscUJBQVk7d0JBQ1osVUFBVTtxQkFDWDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsOERBQTRCO3FCQUM3QjtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBNkQsRUFDakYsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSw0QkFBb0IsdUJBMkJoQyxDQUFBO0FBQ0Q7a0JBQWUsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgVFJFRV9BQ1RJT05TLCBJQWN0aW9uTWFwcGluZywgSUFjdGlvbkhhbmRsZXIgfSBmcm9tICcuL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgSVRyZWVPcHRpb25zIH0gZnJvbSAnLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi9jb25zdGFudHMva2V5cyc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL21vZGVscy90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVEcmFnZ2VkRWxlbWVudCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcbmltcG9ydCB7IExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9hZGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCBhcyBEZXByZWNhdGVkTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kZXByZWNhdGVkLWxvYWRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29udGVudCBhcyBEZXByZWNhdGVkVHJlZU5vZGVDb250ZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RlcHJlY2F0ZWQtdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlRHJvcFNsb3QgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZURyb3BEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcm9wLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUcmVlRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWRyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFkSG9jQ29tcG9uZW50RmFjdG9yeUNyZWF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRob2MtY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZSc7XG5cbmltcG9ydCAnLi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZCB9IGZyb20gJy4vZGVwcmVjYXRlZCc7XG5cbmV4cG9ydCB7XG4gIFRyZWVNb2RlbCxcbiAgVHJlZU5vZGUsXG4gIFRyZWVEcmFnZ2VkRWxlbWVudCxcbiAgSVRyZWVPcHRpb25zLFxuICBUUkVFX0FDVElPTlMsXG4gIEtFWVMsXG4gIElBY3Rpb25NYXBwaW5nLFxuICBJQWN0aW9uSGFuZGxlcixcbiAgTG9hZGluZ0NvbXBvbmVudCxcbiAgVHJlZUNvbXBvbmVudCxcbiAgVHJlZU5vZGVDb21wb25lbnQsXG4gIFRyZWVOb2RlQ29udGVudCxcbiAgVHJlZURyb3BEaXJlY3RpdmUsXG4gIFRyZWVEcmFnRGlyZWN0aXZlLFxuICBUcmVlTm9kZURyb3BTbG90XG59O1xuXG5cbmV4cG9ydCBjbGFzcyBUcmVlTW9kdWxlIHtzdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTG9hZGluZ0NvbXBvbmVudCxcbiAgICBUcmVlQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlQ29tcG9uZW50LFxuICAgIFRyZWVOb2RlRHJvcFNsb3QsXG4gICAgVHJlZU5vZGVDb250ZW50LFxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxuICAgIFRyZWVEcmFnRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmVlQ29tcG9uZW50LFxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxuICAgIFRyZWVEcmFnRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRyZWVEcmFnZ2VkRWxlbWVudFxuICBdXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xuXTtcbn1cblxuZXhwb3J0IGNsYXNzIERlcHJlY2F0ZWRUcmVlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgZGVwcmVjYXRlZCgnRGVwcmVjYXRlZFRyZWVNb2R1bGUnLCAnVHJlZU1vZHVsZSBmb3IgQW9UIGNvbXBpbGF0aW9uJyk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZXByZWNhdGVkTG9hZGluZ0NvbXBvbmVudCxcbiAgICBEZXByZWNhdGVkVHJlZU5vZGVDb250ZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUcmVlQ29tcG9uZW50LFxuICAgIFRyZWVEcm9wRGlyZWN0aXZlLFxuICAgIFRyZWVEcmFnRGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJlZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvclxuICBdLFxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbl07XG59XG5leHBvcnQgZGVmYXVsdCBUcmVlTW9kdWxlO1xuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=