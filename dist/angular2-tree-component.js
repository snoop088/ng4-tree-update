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
    TreeModule.ctorParameters = function () { return []; };
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
    DeprecatedTreeModule.ctorParameters = function () { return []; };
    return DeprecatedTreeModule;
}());
exports.DeprecatedTreeModule = DeprecatedTreeModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItdHJlZS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvYW5ndWxhcjItdHJlZS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUM5Qyx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUUvQyxtQ0FBNkQsNkJBQTZCLENBQUMsQ0FBQTtBQXlCekYsb0JBQVk7QUF2QmQscUJBQXFCLGtCQUFrQixDQUFDLENBQUE7QUF3QnRDLFlBQUk7QUF2Qk4sMkJBQTBCLHFCQUFxQixDQUFDLENBQUE7QUFrQjlDLGlCQUFTO0FBakJYLGdDQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBa0JsRCxnQkFBUTtBQWpCViwyQ0FBbUMscUNBQXFDLENBQUMsQ0FBQTtBQWtCdkUsMEJBQWtCO0FBakJwQixrQ0FBaUMsZ0NBQWdDLENBQUMsQ0FBQTtBQXVCaEUsd0JBQWdCO0FBdEJsQiw2Q0FBK0QsMkNBQTJDLENBQUMsQ0FBQTtBQUMzRywrQkFBOEIsNkJBQTZCLENBQUMsQ0FBQTtBQXNCMUQscUJBQWE7QUFyQmYsb0NBQWtDLGtDQUFrQyxDQUFDLENBQUE7QUFzQm5FLHlCQUFpQjtBQXJCbkIsNENBQWdDLDBDQUEwQyxDQUFDLENBQUE7QUFzQnpFLHVCQUFlO0FBckJqQix1REFBNkQscURBQXFELENBQUMsQ0FBQTtBQUNuSCw4Q0FBaUMsNENBQTRDLENBQUMsQ0FBQTtBQXVCNUUsd0JBQWdCO0FBdEJsQixvQ0FBa0Msa0NBQWtDLENBQUMsQ0FBQTtBQW9CbkUseUJBQWlCO0FBbkJuQixvQ0FBa0Msa0NBQWtDLENBQUMsQ0FBQTtBQW9CbkUseUJBQWlCO0FBbkJuQixnREFBNkMsOENBQThDLENBQUMsQ0FBQTtBQUU1RixRQUFPLGFBQWEsQ0FBQyxDQUFBO0FBQ3JCLDJCQUEyQixjQUFjLENBQUMsQ0FBQTtBQXFCMUM7SUFBQTtJQTJCQSxDQUFDO0lBM0IrQixxQkFBVSxHQUEwQjtRQUNwRSxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDWixvQ0FBZ0I7d0JBQ2hCLDhCQUFhO3dCQUNiLHVDQUFpQjt3QkFDakIsZ0RBQWdCO3dCQUNoQiw2Q0FBZTt3QkFDZix1Q0FBaUI7d0JBQ2pCLHVDQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLDhCQUFhO3dCQUNiLHVDQUFpQjt3QkFDakIsdUNBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AscUJBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULCtDQUFrQjtxQkFDbkI7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLGtCQUFVLGFBMkJ0QixDQUFBO0FBRUQ7SUFDRTtRQUNFLHVCQUFVLENBQUMsc0JBQXNCLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0ksK0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1osK0NBQTBCO3dCQUMxQix3REFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDUCw4QkFBYTt3QkFDYix1Q0FBaUI7d0JBQ2pCLHVDQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHFCQUFZO3dCQUNaLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDhEQUE0QjtxQkFDN0I7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLDRCQUFvQix1QkEyQmhDLENBQUE7QUFDRDtrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBUUkVFX0FDVElPTlMsIElBY3Rpb25NYXBwaW5nLCBJQWN0aW9uSGFuZGxlciB9IGZyb20gJy4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBJVHJlZU9wdGlvbnMgfSBmcm9tICcuL2RlZnMvYXBpJztcbmltcG9ydCB7IEtFWVMgfSBmcm9tICcuL2NvbnN0YW50cy9rZXlzJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgTG9hZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2FkaW5nQ29tcG9uZW50IGFzIERlcHJlY2F0ZWRMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RlcHJlY2F0ZWQtbG9hZGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTm9kZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlQ29udGVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250ZW50IGFzIERlcHJlY2F0ZWRUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGVwcmVjYXRlZC10cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGVEcm9wU2xvdCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlRHJvcERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmVlLWRyb3AuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRyZWVEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWRIb2NDb21wb25lbnRGYWN0b3J5Q3JlYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9hZGhvYy1jb21wb25lbnQtZmFjdG9yeS5zZXJ2aWNlJztcblxuaW1wb3J0ICcuL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAnLi9kZXByZWNhdGVkJztcblxuZXhwb3J0IHtcbiAgVHJlZU1vZGVsLFxuICBUcmVlTm9kZSxcbiAgVHJlZURyYWdnZWRFbGVtZW50LFxuICBJVHJlZU9wdGlvbnMsXG4gIFRSRUVfQUNUSU9OUyxcbiAgS0VZUyxcbiAgSUFjdGlvbk1hcHBpbmcsXG4gIElBY3Rpb25IYW5kbGVyLFxuICBMb2FkaW5nQ29tcG9uZW50LFxuICBUcmVlQ29tcG9uZW50LFxuICBUcmVlTm9kZUNvbXBvbmVudCxcbiAgVHJlZU5vZGVDb250ZW50LFxuICBUcmVlRHJvcERpcmVjdGl2ZSxcbiAgVHJlZURyYWdEaXJlY3RpdmUsXG4gIFRyZWVOb2RlRHJvcFNsb3Rcbn07XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUge3N0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBMb2FkaW5nQ29tcG9uZW50LFxuICAgIFRyZWVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVDb21wb25lbnQsXG4gICAgVHJlZU5vZGVEcm9wU2xvdCxcbiAgICBUcmVlTm9kZUNvbnRlbnQsXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXG4gICAgVHJlZURyYWdEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRyZWVDb21wb25lbnQsXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXG4gICAgVHJlZURyYWdEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVHJlZURyYWdnZWRFbGVtZW50XG4gIF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xufVxuXG5leHBvcnQgY2xhc3MgRGVwcmVjYXRlZFRyZWVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBkZXByZWNhdGVkKCdEZXByZWNhdGVkVHJlZU1vZHVsZScsICdUcmVlTW9kdWxlIGZvciBBb1QgY29tcGlsYXRpb24nKTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlcHJlY2F0ZWRMb2FkaW5nQ29tcG9uZW50LFxuICAgIERlcHJlY2F0ZWRUcmVlTm9kZUNvbnRlbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRyZWVDb21wb25lbnQsXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXG4gICAgVHJlZURyYWdEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmVlTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBZEhvY0NvbXBvbmVudEZhY3RvcnlDcmVhdG9yXG4gIF0sXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xuXTtcbn1cbmV4cG9ydCBkZWZhdWx0IFRyZWVNb2R1bGU7XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==