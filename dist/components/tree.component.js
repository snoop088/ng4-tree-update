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
    TreeComponent.ctorParameters = [
        { type: tree_model_1.TreeModel, },
        { type: tree_dragged_element_model_1.TreeDraggedElement, },
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQThILGVBQWUsQ0FBQyxDQUFBO0FBRTlJLDJCQUEwQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2pELDJDQUFtQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBSTFFLElBQVksQ0FBQyxXQUFNLFFBR25CLENBQUMsQ0FIMEI7QUFHM0I7SUFDRSx1QkFBbUIsU0FBbUIsRUFBUyxrQkFBcUM7UUFEdEYsaUJBcUhDO1FBcEhvQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNsRixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFTQSxzQkFBSSxnQ0FBSztRQURWLGlDQUFpQzthQUNoQyxVQUFVLEtBQVcsSUFBSSxDQUFDOzs7T0FBQTs7SUFDMUIsc0JBQUksa0NBQU87YUFBWCxVQUFZLE9BQW1CLElBQUksQ0FBQzs7O09BQUE7O0lBRXBDLHNCQUFJLGtDQUFPO2FBQVgsVUFBWSxLQUFhO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBZ0JELGlDQUFTLEdBQVQsVUFBVSxNQUFNO1FBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFD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QUFFO1FBQzdCLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ3BDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ3BDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ25DLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ3BDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ2pDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO0tBQzdCLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUFySEQsSUFxSEM7QUFySFkscUJBQWEsZ0JBcUh6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZSwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVRyZWVOb2RlVGVtcGxhdGUgfSBmcm9tICcuL3RyZWUtbm9kZS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IEtFWVMgfSBmcm9tICcuLi9jb25zdGFudHMva2V5cyc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xuXG5cbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRyZWVNb2RlbDpUcmVlTW9kZWwsIHB1YmxpYyB0cmVlRHJhZ2dlZEVsZW1lbnQ6VHJlZURyYWdnZWRFbGVtZW50KSB7XG4gICAgdHJlZU1vZGVsLmV2ZW50TmFtZXMuZm9yRWFjaCgobmFtZSkgPT4gdGhpc1tuYW1lXSA9IG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gIH1cblxuICBfbm9kZXM6YW55W107XG4gIF9vcHRpb25zOlRyZWVPcHRpb25zO1xuXG4gICBsb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICB0cmVlTm9kZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJVHJlZU5vZGVUZW1wbGF0ZT47XG5cbiAgLy8gV2lsbCBiZSBoYW5kbGVkIGluIG5nT25DaGFuZ2VzXG4gICBzZXQgbm9kZXMobm9kZXM6YW55W10pIHsgfTtcbiAgIHNldCBvcHRpb25zKG9wdGlvbnM6VHJlZU9wdGlvbnMpIHsgfTtcblxuICAgc2V0IGZvY3VzZWQodmFsdWU6Ym9vbGVhbikge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHZhbHVlKTtcbiAgfVxuXG4gICBvblRvZ2dsZTtcbiAgIG9uVG9nZ2xlRXhwYW5kZWQ7XG4gICBvbkFjdGl2ZUNoYW5nZWQ7XG4gICBvbkFjdGl2YXRlO1xuICAgb25EZWFjdGl2YXRlO1xuICAgb25Gb2N1cztcbiAgIG9uQmx1cjtcbiAgIG9uRG91YmxlQ2xpY2s7XG4gICBvbkNvbnRleHRNZW51O1xuICAgb25VcGRhdGVEYXRhO1xuICAgb25Jbml0aWFsaXplZDtcbiAgIG9uTW92ZU5vZGU7XG4gICBvbkV2ZW50O1xuXG4gIG9uS2V5ZG93bigkZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMudHJlZU1vZGVsLmlzRm9jdXNlZCkgcmV0dXJuO1xuICAgIGlmIChfLmluY2x1ZGVzKFsnaW5wdXQnLCAndGV4dGFyZWEnXSxcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XG5cbiAgICBjb25zdCBmb2N1c2VkTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG5cbiAgICB0aGlzLnRyZWVNb2RlbC5wZXJmb3JtS2V5QWN0aW9uKGZvY3VzZWROb2RlLCAkZXZlbnQpO1xuICB9XG5cbiAgb25Nb3VzZWRvd24oJGV2ZW50KSB7XG4gICAgbGV0IGluc2lkZUNsaWNrID0gJGV2ZW50LnRhcmdldC5jbG9zZXN0KCdUcmVlJyk7XG4gICAgaWYgKCFpbnNpZGVDbGljaykge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcbiAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxuICAgICAgbm9kZXM6IGNoYW5nZXMubm9kZXMgJiYgY2hhbmdlcy5ub2Rlcy5jdXJyZW50VmFsdWUsXG4gICAgICBldmVudHM6IF8ucGljayh0aGlzLCB0aGlzLnRyZWVNb2RlbC5ldmVudE5hbWVzKVxuICAgIH0pO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gIHNlbGVjdG9yOiAnVHJlZScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnKGJvZHk6IGtleWRvd24pJzogXCJvbktleWRvd24oJGV2ZW50KVwiLFxuICAgICcoYm9keTogbW91c2Vkb3duKSc6IFwib25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gIH0sXG4gIHByb3ZpZGVyczogW1RyZWVNb2RlbF0sXG4gIHN0eWxlczogW1xuICAgICcudHJlZS1jaGlsZHJlbiB7IHBhZGRpbmctbGVmdDogMjBweCB9JyxcbiAgICBgLnRyZWUge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOyAvKiBpT1MgU2FmYXJpICovXG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAgIC8qIENocm9tZS9TYWZhcmkvT3BlcmEgKi9cbiAgICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgICAgLyogS29ucXVlcm9yICovXG4gICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAgICAgIC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgICAgICAgLyogSUUvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgICAgICAvKiBub24tcHJlZml4ZWQgdmVyc2lvbiwgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQgYnkgYW55IGJyb3dzZXIgKi9cbiAgICB9YFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ0cmVlXCIgW2NsYXNzLm5vZGUtZHJhZ2dpbmddPVwidHJlZURyYWdnZWRFbGVtZW50LmlzRHJhZ2dpbmcoKVwiPlxuICAgICAgPFRyZWVOb2RlXG4gICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHRyZWVNb2RlbC5yb290czsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICBbbm9kZUluZGV4XT1cImlcIlxuICAgICAgICBbbG9hZGluZ1RlbXBsYXRlXT1cImxvYWRpbmdUZW1wbGF0ZVwiXG4gICAgICAgIFt0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZV09XCJ0cmVlTm9kZVRlbXBsYXRlXCI+XG4gICAgICA8L1RyZWVOb2RlPlxuICAgIDwvZGl2PlxuICBgXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IFRyZWVNb2RlbCwgfSxcbnt0eXBlOiBUcmVlRHJhZ2dlZEVsZW1lbnQsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidsb2FkaW5nVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsnbG9hZGluZ1RlbXBsYXRlJywgXSB9LF0sXG4ndHJlZU5vZGVUZW1wbGF0ZSc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZCwgYXJnczogWyd0cmVlTm9kZVRlbXBsYXRlJywgXSB9LF0sXG4nbm9kZXMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nb3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidmb2N1c2VkJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uVG9nZ2xlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvblRvZ2dsZUV4cGFuZGVkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkFjdGl2ZUNoYW5nZWQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uQWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uRGVhY3RpdmF0ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Gb2N1cyc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25CbHVyJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkRvdWJsZUNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkNvbnRleHRNZW51JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvblVwZGF0ZURhdGEnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uSW5pdGlhbGl6ZWQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uTW92ZU5vZGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uRXZlbnQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19