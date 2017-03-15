"use strict";
var core_1 = require('@angular/core');
var tree_model_1 = require('../models/tree.model');
var tree_dragged_element_model_1 = require('../models/tree-dragged-element.model');
var _ = require('lodash');
var TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new core_1.EventEmitter(); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (_.includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = $event.target.closest('Tree');
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: _.pick(this, this.treeModel.eventNames)
        });
    };
    TreeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'Tree',
                    encapsulation: core_1.ViewEncapsulation.None,
                    host: {
                        '(body: keydown)': "onKeydown($event)",
                        '(body: mousedown)': "onMousedown($event)"
                    },
                    providers: [tree_model_1.TreeModel],
                    styles: [
                        '.tree-children { padding-left: 20px }',
                        ".tree {\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
                    ],
                    template: "\n    <div class=\"tree\" [class.node-dragging]=\"treeDraggedElement.isDragging()\">\n      <TreeNode\n        *ngFor=\"let node of treeModel.roots; let i = index\"\n        [node]=\"node\"\n        [nodeIndex]=\"i\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [treeNodeContentTemplate]=\"treeNodeTemplate\">\n      </TreeNode>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: tree_model_1.TreeModel, },
        { type: tree_dragged_element_model_1.TreeDraggedElement, },
    ]; };
    TreeComponent.propDecorators = {
        'loadingTemplate': [{ type: core_1.ContentChild, args: ['loadingTemplate',] },],
        'treeNodeTemplate': [{ type: core_1.ContentChild, args: ['treeNodeTemplate',] },],
        'nodes': [{ type: core_1.Input },],
        'options': [{ type: core_1.Input },],
        'focused': [{ type: core_1.Input },],
        'onToggle': [{ type: core_1.Output },],
        'onToggleExpanded': [{ type: core_1.Output },],
        'onActiveChanged': [{ type: core_1.Output },],
        'onActivate': [{ type: core_1.Output },],
        'onDeactivate': [{ type: core_1.Output },],
        'onFocus': [{ type: core_1.Output },],
        'onBlur': [{ type: core_1.Output },],
        'onDoubleClick': [{ type: core_1.Output },],
        'onContextMenu': [{ type: core_1.Output },],
        'onUpdateData': [{ type: core_1.Output },],
        'onInitialized': [{ type: core_1.Output },],
        'onMoveNode': [{ type: core_1.Output },],
        'onEvent': [{ type: core_1.Output },],
    };
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQThILGVBQWUsQ0FBQyxDQUFBO0FBRTlJLDJCQUEwQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2pELDJDQUFtQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBSTFFLElBQVksQ0FBQyxXQUFNLFFBR25CLENBQUMsQ0FIMEI7QUFHM0I7SUFDRSx1QkFBbUIsU0FBbUIsRUFBUyxrQkFBcUM7UUFEdEYsaUJBcUhDO1FBcEhvQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNsRixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFTQSxzQkFBSSxnQ0FBSztRQURWLGlDQUFpQzthQUNoQyxVQUFVLEtBQVcsSUFBSSxDQUFDOzs7T0FBQTs7SUFDMUIsc0JBQUksa0NBQU87YUFBWCxVQUFZLE9BQW1CLElBQUksQ0FBQzs7O09BQUE7O0lBRXBDLHNCQUFJLGtDQUFPO2FBQVgsVUFBWSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBZ0JELGlDQUFTLEdBQVQsVUFBVSxNQUFNO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFD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LElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUM3QixlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNwQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNwQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNuQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNwQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNqQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtLQUM3QixDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBckhELElBcUhDO0FBckhZLHFCQUFhLGdCQXFIekIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElUcmVlTm9kZVRlbXBsYXRlIH0gZnJvbSAnLi90cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2tleXMnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCdcblxuXG5leHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0cmVlTW9kZWw6VHJlZU1vZGVsLCBwdWJsaWMgdHJlZURyYWdnZWRFbGVtZW50OlRyZWVEcmFnZ2VkRWxlbWVudCkge1xuICAgIHRyZWVNb2RlbC5ldmVudE5hbWVzLmZvckVhY2goKG5hbWUpID0+IHRoaXNbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCkpO1xuICB9XG5cbiAgX25vZGVzOmFueVtdO1xuICBfb3B0aW9uczpUcmVlT3B0aW9ucztcblxuICAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8SVRyZWVOb2RlVGVtcGxhdGU+O1xuXG4gIC8vIFdpbGwgYmUgaGFuZGxlZCBpbiBuZ09uQ2hhbmdlc1xuICAgc2V0IG5vZGVzKG5vZGVzOmFueVtdKSB7IH07XG4gICBzZXQgb3B0aW9ucyhvcHRpb25zOlRyZWVPcHRpb25zKSB7IH07XG5cbiAgIHNldCBmb2N1c2VkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh2YWx1ZSk7XG4gIH1cblxuICAgb25Ub2dnbGU7XG4gICBvblRvZ2dsZUV4cGFuZGVkO1xuICAgb25BY3RpdmVDaGFuZ2VkO1xuICAgb25BY3RpdmF0ZTtcbiAgIG9uRGVhY3RpdmF0ZTtcbiAgIG9uRm9jdXM7XG4gICBvbkJsdXI7XG4gICBvbkRvdWJsZUNsaWNrO1xuICAgb25Db250ZXh0TWVudTtcbiAgIG9uVXBkYXRlRGF0YTtcbiAgIG9uSW5pdGlhbGl6ZWQ7XG4gICBvbk1vdmVOb2RlO1xuICAgb25FdmVudDtcblxuICBvbktleWRvd24oJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnRyZWVNb2RlbC5pc0ZvY3VzZWQpIHJldHVybjtcbiAgICBpZiAoXy5pbmNsdWRlcyhbJ2lucHV0JywgJ3RleHRhcmVhJ10sXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZm9jdXNlZE5vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuXG4gICAgdGhpcy50cmVlTW9kZWwucGVyZm9ybUtleUFjdGlvbihmb2N1c2VkTm9kZSwgJGV2ZW50KTtcbiAgfVxuXG4gIG9uTW91c2Vkb3duKCRldmVudCkge1xuICAgIGxldCBpbnNpZGVDbGljayA9ICRldmVudC50YXJnZXQuY2xvc2VzdCgnVHJlZScpO1xuICAgIGlmICghaW5zaWRlQ2xpY2spIHtcbiAgICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0RGF0YSh7XG4gICAgICBvcHRpb25zOiBjaGFuZ2VzLm9wdGlvbnMgJiYgY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSxcbiAgICAgIG5vZGVzOiBjaGFuZ2VzLm5vZGVzICYmIGNoYW5nZXMubm9kZXMuY3VycmVudFZhbHVlLFxuICAgICAgZXZlbnRzOiBfLnBpY2sodGhpcywgdGhpcy50cmVlTW9kZWwuZXZlbnROYW1lcylcbiAgICB9KTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICBzZWxlY3RvcjogJ1RyZWUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJyhib2R5OiBrZXlkb3duKSc6IFwib25LZXlkb3duKCRldmVudClcIixcbiAgICAnKGJvZHk6IG1vdXNlZG93biknOiBcIm9uTW91c2Vkb3duKCRldmVudClcIlxuICB9LFxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxuICBzdHlsZXM6IFtcbiAgICAnLnRyZWUtY2hpbGRyZW4geyBwYWRkaW5nLWxlZnQ6IDIwcHggfScsXG4gICAgYC50cmVlIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLyogaU9TIFNhZmFyaSAqL1xuICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgICAvKiBDaHJvbWUvU2FmYXJpL09wZXJhICovXG4gICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7ICAgIC8qIEtvbnF1ZXJvciAqL1xuICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgICAgICAvKiBGaXJlZm94ICovXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgIC8qIElFL0VkZ2UgKi9cbiAgICAgIHVzZXItc2VsZWN0OiBub25lOyAgICAgICAgICAgLyogbm9uLXByZWZpeGVkIHZlcnNpb24sIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkIGJ5IGFueSBicm93c2VyICovXG4gICAgfWBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidHJlZVwiIFtjbGFzcy5ub2RlLWRyYWdnaW5nXT1cInRyZWVEcmFnZ2VkRWxlbWVudC5pc0RyYWdnaW5nKClcIj5cbiAgICAgIDxUcmVlTm9kZVxuICAgICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiB0cmVlTW9kZWwucm9vdHM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgW25vZGVJbmRleF09XCJpXCJcbiAgICAgICAgW2xvYWRpbmdUZW1wbGF0ZV09XCJsb2FkaW5nVGVtcGxhdGVcIlxuICAgICAgICBbdHJlZU5vZGVDb250ZW50VGVtcGxhdGVdPVwidHJlZU5vZGVUZW1wbGF0ZVwiPlxuICAgICAgPC9UcmVlTm9kZT5cbiAgICA8L2Rpdj5cbiAgYFxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBUcmVlTW9kZWwsIH0sXG57dHlwZTogVHJlZURyYWdnZWRFbGVtZW50LCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbG9hZGluZ1RlbXBsYXRlJzogW3sgdHlwZTogQ29udGVudENoaWxkLCBhcmdzOiBbJ2xvYWRpbmdUZW1wbGF0ZScsIF0gfSxdLFxuJ3RyZWVOb2RlVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsndHJlZU5vZGVUZW1wbGF0ZScsIF0gfSxdLFxuJ25vZGVzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nZm9jdXNlZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidvblRvZ2dsZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Ub2dnbGVFeHBhbmRlZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25BY3RpdmVDaGFuZ2VkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkFjdGl2YXRlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkRlYWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uRm9jdXMnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uQmx1cic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Eb3VibGVDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Db250ZXh0TWVudSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25VcGRhdGVEYXRhJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkluaXRpYWxpemVkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbk1vdmVOb2RlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkV2ZW50JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==