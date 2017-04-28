import { Component, Input, Output, EventEmitter, ViewEncapsulation, ContentChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import * as _ from 'lodash';
var TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
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
    return TreeComponent;
}());
export { TreeComponent };
TreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'Tree',
                encapsulation: ViewEncapsulation.None,
                host: {
                    '(body: keydown)': "onKeydown($event)",
                    '(body: mousedown)': "onMousedown($event)"
                },
                providers: [TreeModel],
                styles: [
                    '.tree-children { padding-left: 20px }',
                    ".tree {\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
                ],
                template: "\n    <div class=\"tree\" [class.node-dragging]=\"treeDraggedElement.isDragging()\">\n      <TreeNode\n        *ngFor=\"let node of treeModel.roots; let i = index\"\n        [node]=\"node\"\n        [nodeIndex]=\"i\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [treeNodeContentTemplate]=\"treeNodeTemplate\">\n      </TreeNode>\n    </div>\n  "
            },] },
];
/** @nocollapse */
TreeComponent.ctorParameters = function () { return [
    { type: TreeModel, },
    { type: TreeDraggedElement, },
]; };
TreeComponent.propDecorators = {
    'loadingTemplate': [{ type: ContentChild, args: ['loadingTemplate',] },],
    'treeNodeTemplate': [{ type: ContentChild, args: ['treeNodeTemplate',] },],
    'nodes': [{ type: Input },],
    'options': [{ type: Input },],
    'focused': [{ type: Input },],
    'onToggle': [{ type: Output },],
    'onToggleExpanded': [{ type: Output },],
    'onActiveChanged': [{ type: Output },],
    'onActivate': [{ type: Output },],
    'onDeactivate': [{ type: Output },],
    'onFocus': [{ type: Output },],
    'onBlur': [{ type: Output },],
    'onDoubleClick': [{ type: Output },],
    'onContextMenu': [{ type: Output },],
    'onUpdateData': [{ type: Output },],
    'onInitialized': [{ type: Output },],
    'onMoveNode': [{ type: Output },],
    'onEvent': [{ type: Output },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFPLE1BQUEsRUFBaUMsWUFBQSxFQUFjLGlCQUFBLEVBQW1CLFlBQUEsRUFBMEIsTUFBTyxlQUFBLENBQWdCO0FBRTlJLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxzQkFBQSxDQUF1QjtBQUNqRCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxzQ0FBQSxDQUF1QztBQUkxRSxPQUFPLEtBQUssQ0FBQSxNQUFPLFFBQUEsQ0FBQTtBQUduQjtJQUNFLHVCQUFtQixTQUFtQixFQUFTLGtCQUFxQztRQUFwRixpQkFFQztRQUZrQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNsRixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQVNBLHNCQUFJLGdDQUFLO1FBRFYsaUNBQWlDO2FBQ2hDLFVBQVUsS0FBVyxJQUFJLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQUMzQixzQkFBSSxrQ0FBTzthQUFYLFVBQVksT0FBbUIsSUFBSSxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFckMsc0JBQUksa0NBQU87YUFBWCxVQUFZLEtBQWE7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFnQkQsaUNBQVMsR0FBVCxVQUFVLE1BQU07UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMs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QUFNLEVBQUUsRUFBRTtJQUNuQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM5QixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUM3QixlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNwQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNwQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNuQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNwQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNqQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtDQUM3QixDQUFDIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVRyZWVOb2RlVGVtcGxhdGUgfSBmcm9tICcuL3RyZWUtbm9kZS1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlzJztcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJ1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJlZU1vZGVsOlRyZWVNb2RlbCwgcHVibGljIHRyZWVEcmFnZ2VkRWxlbWVudDpUcmVlRHJhZ2dlZEVsZW1lbnQpIHtcclxuICAgIHRyZWVNb2RlbC5ldmVudE5hbWVzLmZvckVhY2goKG5hbWUpID0+IHRoaXNbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCkpO1xyXG4gIH1cclxuXHJcbiAgX25vZGVzOmFueVtdO1xyXG4gIF9vcHRpb25zOlRyZWVPcHRpb25zO1xyXG5cclxuICAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICB0cmVlTm9kZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJVHJlZU5vZGVUZW1wbGF0ZT47XHJcblxyXG4gIC8vIFdpbGwgYmUgaGFuZGxlZCBpbiBuZ09uQ2hhbmdlc1xyXG4gICBzZXQgbm9kZXMobm9kZXM6YW55W10pIHsgfTtcclxuICAgc2V0IG9wdGlvbnMob3B0aW9uczpUcmVlT3B0aW9ucykgeyB9O1xyXG5cclxuICAgc2V0IGZvY3VzZWQodmFsdWU6Ym9vbGVhbikge1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXModmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgIG9uVG9nZ2xlO1xyXG4gICBvblRvZ2dsZUV4cGFuZGVkO1xyXG4gICBvbkFjdGl2ZUNoYW5nZWQ7XHJcbiAgIG9uQWN0aXZhdGU7XHJcbiAgIG9uRGVhY3RpdmF0ZTtcclxuICAgb25Gb2N1cztcclxuICAgb25CbHVyO1xyXG4gICBvbkRvdWJsZUNsaWNrO1xyXG4gICBvbkNvbnRleHRNZW51O1xyXG4gICBvblVwZGF0ZURhdGE7XHJcbiAgIG9uSW5pdGlhbGl6ZWQ7XHJcbiAgIG9uTW92ZU5vZGU7XHJcbiAgIG9uRXZlbnQ7XHJcblxyXG4gIG9uS2V5ZG93bigkZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy50cmVlTW9kZWwuaXNGb2N1c2VkKSByZXR1cm47XHJcbiAgICBpZiAoXy5pbmNsdWRlcyhbJ2lucHV0JywgJ3RleHRhcmVhJ10sXHJcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZm9jdXNlZE5vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xyXG5cclxuICAgIHRoaXMudHJlZU1vZGVsLnBlcmZvcm1LZXlBY3Rpb24oZm9jdXNlZE5vZGUsICRldmVudCk7XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlZG93bigkZXZlbnQpIHtcclxuICAgIGxldCBpbnNpZGVDbGljayA9ICRldmVudC50YXJnZXQuY2xvc2VzdCgnVHJlZScpO1xyXG4gICAgaWYgKCFpbnNpZGVDbGljaykge1xyXG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcclxuICAgICAgb3B0aW9uczogY2hhbmdlcy5vcHRpb25zICYmIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUsXHJcbiAgICAgIG5vZGVzOiBjaGFuZ2VzLm5vZGVzICYmIGNoYW5nZXMubm9kZXMuY3VycmVudFZhbHVlLFxyXG4gICAgICBldmVudHM6IF8ucGljayh0aGlzLCB0aGlzLnRyZWVNb2RlbC5ldmVudE5hbWVzKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XHJcbiAgc2VsZWN0b3I6ICdUcmVlJyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoYm9keToga2V5ZG93biknOiBcIm9uS2V5ZG93bigkZXZlbnQpXCIsXHJcbiAgICAnKGJvZHk6IG1vdXNlZG93biknOiBcIm9uTW91c2Vkb3duKCRldmVudClcIlxyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbVHJlZU1vZGVsXSxcclxuICBzdHlsZXM6IFtcclxuICAgICcudHJlZS1jaGlsZHJlbiB7IHBhZGRpbmctbGVmdDogMjBweCB9JyxcclxuICAgIGAudHJlZSB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7IC8qIGlPUyBTYWZhcmkgKi9cclxuICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgICAvKiBDaHJvbWUvU2FmYXJpL09wZXJhICovXHJcbiAgICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgICAgLyogS29ucXVlcm9yICovXHJcbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgLyogRmlyZWZveCAqL1xyXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgIC8qIElFL0VkZ2UgKi9cclxuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgICAgICAvKiBub24tcHJlZml4ZWQgdmVyc2lvbiwgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQgYnkgYW55IGJyb3dzZXIgKi9cclxuICAgIH1gXHJcbiAgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInRyZWVcIiBbY2xhc3Mubm9kZS1kcmFnZ2luZ109XCJ0cmVlRHJhZ2dlZEVsZW1lbnQuaXNEcmFnZ2luZygpXCI+XHJcbiAgICAgIDxUcmVlTm9kZVxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHRyZWVNb2RlbC5yb290czsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgW25vZGVdPVwibm9kZVwiXHJcbiAgICAgICAgW25vZGVJbmRleF09XCJpXCJcclxuICAgICAgICBbbG9hZGluZ1RlbXBsYXRlXT1cImxvYWRpbmdUZW1wbGF0ZVwiXHJcbiAgICAgICAgW3RyZWVOb2RlQ29udGVudFRlbXBsYXRlXT1cInRyZWVOb2RlVGVtcGxhdGVcIj5cclxuICAgICAgPC9UcmVlTm9kZT5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBUcmVlTW9kZWwsIH0sXG57dHlwZTogVHJlZURyYWdnZWRFbGVtZW50LCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbG9hZGluZ1RlbXBsYXRlJzogW3sgdHlwZTogQ29udGVudENoaWxkLCBhcmdzOiBbJ2xvYWRpbmdUZW1wbGF0ZScsIF0gfSxdLFxuJ3RyZWVOb2RlVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsndHJlZU5vZGVUZW1wbGF0ZScsIF0gfSxdLFxuJ25vZGVzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nZm9jdXNlZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidvblRvZ2dsZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Ub2dnbGVFeHBhbmRlZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25BY3RpdmVDaGFuZ2VkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkFjdGl2YXRlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkRlYWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uRm9jdXMnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ29uQmx1cic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Eb3VibGVDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25Db250ZXh0TWVudSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25VcGRhdGVEYXRhJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkluaXRpYWxpemVkJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbk1vdmVOb2RlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidvbkV2ZW50JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG59XHJcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19