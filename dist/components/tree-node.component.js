import { Component, Input, ElementRef, ViewEncapsulation } from '@angular/core';
var TreeNodeComponent = (function () {
    function TreeNodeComponent(elementRef) {
        this.elementRef = elementRef;
    }
    TreeNodeComponent.prototype.onDrop = function ($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: 0 }
        });
    };
    TreeNodeComponent.prototype.allowDrop = function (element) {
        if (this.node.options.readOnly)
            return false;
        return this.node.options.allowDrop(element, { parent: this.node, index: 0 });
    };
    TreeNodeComponent.prototype.getNodePadding = function () {
        return this.node.options.levelPadding * (this.node.level - 1) + 'px';
    };
    TreeNodeComponent.prototype.ngAfterViewInit = function () {
        this.node.elementRef = this.elementRef;
    };
    return TreeNodeComponent;
}());
export { TreeNodeComponent };
TreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'TreeNode',
                encapsulation: ViewEncapsulation.None,
                styles: [
                    '.tree-children.tree-children-no-padding { padding-left: 0 }',
                    '.tree-children { padding-left: 10px }',
                    ".node-content-wrapper {\n      display: flex;\n      padding: 2px 5px;\n    }",
                    '.node-wrapper { display: block }',
                    '.node-wrapper span { vertical-align: middle; line-height: 1.5em }',
                    '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
                    '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
                    '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #e7f4f9 }',
                    '.node-content-wrapper:hover { background: #f7fbff }',
                    '.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover { box-shadow: inset 0 0 1px #999; }',
                    '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
                    '.node-content-wrapper.is-dragging-over-disabled { opacity: 0.5 }',
                    ".toggle-children {\n        display: flex;\n        margin-right: 3px;\n    }",
                    ".toggle-children-placeholder {\n        display: flex;\n        margin-right: 2px;\n    }"
                ],
                template: "\n    <div\n      *ngIf=\"!node.isHidden\"\n      class=\"tree-node tree-node-level-{{ node.level }}\"\n      [class.tree-node-expanded]=\"node.isExpanded && node.isFolder\"\n      [class.tree-node-collapsed]=\"node.isCollapsed && node.isFolder\"\n      [class.tree-node-leaf]=\"node.isLeaf\"\n      [class.tree-node-active]=\"node.isActive\"\n      [class.tree-node-focused]=\"node.isFocused\">\n\n      <TreeNodeDropSlot\n        *ngIf=\"nodeIndex === 0\"\n        [dropIndex]=\"nodeIndex\"\n        [node]=\"node.parent\"\n        ></TreeNodeDropSlot>\n\n        <div class=\"node-wrapper\" [style.padding-left]=\"getNodePadding()\">\n          \n          <div class=\"node-content-wrapper\"\n            #nodeContentWrapper\n            (click)=\"node.mouseAction('click', $event)\"\n            (dblclick)=\"node.mouseAction('dblClick', $event)\"\n            (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n            (treeDrop)=\"onDrop($event)\"\n            [treeAllowDrop]=\"allowDrop.bind(this)\"\n            [treeDrag]=\"node\"\n            [treeDragEnabled]=\"node.allowDrag()\">\n            <span\n              *ngIf=\"node.isFolder\"\n              class=\"toggle-children-wrapper\"\n              (click)=\"node.mouseAction('expanderClick', $event)\">\n              <span class=\"toggle-children\"><i class=\"material-icons\">{{ node.isExpanded ? 'folder_open' : 'folder' }}</i></span>\n            </span>\n            <span\n              *ngIf=\"!node.isFolder\"\n              class=\"toggle-children-placeholder\">\n              <i class=\"material-icons\">insert_drive_file</i>\n            </span>\n            <TreeNodeContent [node]=\"node\" [treeNodeContentTemplate]=\"treeNodeContentTemplate\"></TreeNodeContent>\n          </div>\n        </div>\n\n      <div [class.tree-children]=\"true\"\n           [class.tree-children-no-padding]=\"node.options.levelPadding\"\n           *ngIf=\"node.isExpanded\">\n        <div *ngIf=\"node.children\">\n          <TreeNode\n            *ngFor=\"let node of node.children; let i = index\"\n            [node]=\"node\"\n            [nodeIndex]=\"i\"\n            [treeNodeContentTemplate]=\"treeNodeContentTemplate\"\n            [loadingTemplate]=\"loadingTemplate\">\n          </TreeNode>\n        </div>\n        <LoadingComponent\n          [style.padding-left]=\"getNodePadding()\"\n          class=\"tree-node-loading\"\n          *ngIf=\"!node.children\"\n          [loadingTemplate]=\"loadingTemplate\"\n        ></LoadingComponent>\n      </div>\n      <TreeNodeDropSlot\n        [dropIndex]=\"nodeIndex + 1\"\n        [node]=\"node.parent\"\n        ></TreeNodeDropSlot>\n    </div>\n  "
            },] },
];
/** @nocollapse */
TreeNodeComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
TreeNodeComponent.propDecorators = {
    'node': [{ type: Input },],
    'nodeIndex': [{ type: Input },],
    'treeNodeContentTemplate': [{ type: Input },],
    'loadingTemplate': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxLQUFBLEVBQU8sVUFBQSxFQUEyQixpQkFBQSxFQUErQixNQUFPLGVBQUEsQ0FBZ0I7QUFNNUc7SUFNRSwyQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUMxQyxDQUFDO0lBRUQsa0NBQU0sR0FBTixVQUFPLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLE9BQU87UUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QyxDQUFDO0lBNkdILHdCQUFDO0FBQUQsQ0F4SUEsQUF3SUM7O0FBNUdNLDRCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUU7b0JBQ04sNkRBQTZEO29CQUM3RCx1Q0FBdUM7b0JBQ3ZDLCtFQUdFO29CQUNGLGtDQUFrQztvQkFDbEMsbUVBQW1FO29CQUNuRSxtRkFBbUY7b0JBQ25GLHFHQUFxRztvQkFDckcsb0ZBQW9GO29CQUNwRixxREFBcUQ7b0JBQ3JELHdLQUF3SztvQkFDeEssaUdBQWlHO29CQUNqRyxrRUFBa0U7b0JBQ2xFLCtFQUdFO29CQUNGLDJGQUdFO2lCQUNIO2dCQUNELFFBQVEsRUFBRSw2bkZBa0VUO2FBQ0YsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGdDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7Q0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQztBQUNLLGdDQUFjLEdBQTJDO0lBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzFCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQy9CLHlCQUF5QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDN0MsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtDQUNwQyxDQUFDIiwiZmlsZSI6InRyZWUtbm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IElUcmVlTm9kZVRlbXBsYXRlIH0gZnJvbSAnLi90cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICAgbm9kZTpUcmVlTm9kZTtcclxuICAgbm9kZUluZGV4Om51bWJlcjtcclxuICAgdHJlZU5vZGVDb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPElUcmVlTm9kZVRlbXBsYXRlPjtcclxuICAgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcclxuICB9XHJcblxyXG4gIG9uRHJvcCgkZXZlbnQpIHtcclxuICAgIHRoaXMubm9kZS5tb3VzZUFjdGlvbignZHJvcCcsICRldmVudC5ldmVudCwge1xyXG4gICAgICBmcm9tOiAkZXZlbnQuZWxlbWVudCxcclxuICAgICAgdG86IHsgcGFyZW50OiB0aGlzLm5vZGUsIGluZGV4OiAwIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcm9wKGVsZW1lbnQpIHtcclxuICAgIGlmICh0aGlzLm5vZGUub3B0aW9ucy5yZWFkT25seSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5vcHRpb25zLmFsbG93RHJvcChlbGVtZW50LCB7IHBhcmVudDogdGhpcy5ub2RlLCBpbmRleDogMCB9KTtcclxuICB9XHJcblxyXG4gIGdldE5vZGVQYWRkaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5vcHRpb25zLmxldmVsUGFkZGluZyAqICh0aGlzLm5vZGUubGV2ZWwgLSAxKSArICdweCc7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm5vZGUuZWxlbWVudFJlZiA9IHRoaXMuZWxlbWVudFJlZjtcclxuICB9XHJcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcclxuICBzZWxlY3RvcjogJ1RyZWVOb2RlJyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlczogW1xyXG4gICAgJy50cmVlLWNoaWxkcmVuLnRyZWUtY2hpbGRyZW4tbm8tcGFkZGluZyB7IHBhZGRpbmctbGVmdDogMCB9JyxcclxuICAgICcudHJlZS1jaGlsZHJlbiB7IHBhZGRpbmctbGVmdDogMTBweCB9JyxcclxuICAgIGAubm9kZS1jb250ZW50LXdyYXBwZXIge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBwYWRkaW5nOiAycHggNXB4O1xyXG4gICAgfWAsXHJcbiAgICAnLm5vZGUtd3JhcHBlciB7IGRpc3BsYXk6IGJsb2NrIH0nLFxyXG4gICAgJy5ub2RlLXdyYXBwZXIgc3BhbiB7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IGxpbmUtaGVpZ2h0OiAxLjVlbSB9JyxcclxuICAgICcudHJlZS1ub2RlLWFjdGl2ZSA+IC5ub2RlLXdyYXBwZXIgPiAubm9kZS1jb250ZW50LXdyYXBwZXIgeyBiYWNrZ3JvdW5kOiAjYmVlYmZmIH0nLFxyXG4gICAgJy50cmVlLW5vZGUtYWN0aXZlLnRyZWUtbm9kZS1mb2N1c2VkID4gLm5vZGUtd3JhcHBlciA+IC5ub2RlLWNvbnRlbnQtd3JhcHBlciB7IGJhY2tncm91bmQ6ICNiZWViZmYgfScsXHJcbiAgICAnLnRyZWUtbm9kZS1mb2N1c2VkID4gLm5vZGUtd3JhcHBlciA+IC5ub2RlLWNvbnRlbnQtd3JhcHBlciB7IGJhY2tncm91bmQ6ICNlN2Y0ZjkgfScsXHJcbiAgICAnLm5vZGUtY29udGVudC13cmFwcGVyOmhvdmVyIHsgYmFja2dyb3VuZDogI2Y3ZmJmZiB9JyxcclxuICAgICcudHJlZS1ub2RlLWFjdGl2ZSA+IC5ub2RlLXdyYXBwZXIgPiAubm9kZS1jb250ZW50LXdyYXBwZXIsIC50cmVlLW5vZGUtZm9jdXNlZCA+IC5ub2RlLWNvbnRlbnQtd3JhcHBlciwgLm5vZGUtY29udGVudC13cmFwcGVyOmhvdmVyIHsgYm94LXNoYWRvdzogaW5zZXQgMCAwIDFweCAjOTk5OyB9JyxcclxuICAgICcubm9kZS1jb250ZW50LXdyYXBwZXIuaXMtZHJhZ2dpbmctb3ZlciB7IGJhY2tncm91bmQ6ICNkZGZmZWU7IGJveC1zaGFkb3c6IGluc2V0IDAgMCAxcHggIzk5OTsgfScsXHJcbiAgICAnLm5vZGUtY29udGVudC13cmFwcGVyLmlzLWRyYWdnaW5nLW92ZXItZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjUgfScsXHJcbiAgICBgLnRvZ2dsZS1jaGlsZHJlbiB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDNweDtcclxuICAgIH1gLFxyXG4gICAgYC50b2dnbGUtY2hpbGRyZW4tcGxhY2Vob2xkZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHg7XHJcbiAgICB9YFxyXG4gIF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXZcclxuICAgICAgKm5nSWY9XCIhbm9kZS5pc0hpZGRlblwiXHJcbiAgICAgIGNsYXNzPVwidHJlZS1ub2RlIHRyZWUtbm9kZS1sZXZlbC17eyBub2RlLmxldmVsIH19XCJcclxuICAgICAgW2NsYXNzLnRyZWUtbm9kZS1leHBhbmRlZF09XCJub2RlLmlzRXhwYW5kZWQgJiYgbm9kZS5pc0ZvbGRlclwiXHJcbiAgICAgIFtjbGFzcy50cmVlLW5vZGUtY29sbGFwc2VkXT1cIm5vZGUuaXNDb2xsYXBzZWQgJiYgbm9kZS5pc0ZvbGRlclwiXHJcbiAgICAgIFtjbGFzcy50cmVlLW5vZGUtbGVhZl09XCJub2RlLmlzTGVhZlwiXHJcbiAgICAgIFtjbGFzcy50cmVlLW5vZGUtYWN0aXZlXT1cIm5vZGUuaXNBY3RpdmVcIlxyXG4gICAgICBbY2xhc3MudHJlZS1ub2RlLWZvY3VzZWRdPVwibm9kZS5pc0ZvY3VzZWRcIj5cclxuXHJcbiAgICAgIDxUcmVlTm9kZURyb3BTbG90XHJcbiAgICAgICAgKm5nSWY9XCJub2RlSW5kZXggPT09IDBcIlxyXG4gICAgICAgIFtkcm9wSW5kZXhdPVwibm9kZUluZGV4XCJcclxuICAgICAgICBbbm9kZV09XCJub2RlLnBhcmVudFwiXHJcbiAgICAgICAgPjwvVHJlZU5vZGVEcm9wU2xvdD5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vZGUtd3JhcHBlclwiIFtzdHlsZS5wYWRkaW5nLWxlZnRdPVwiZ2V0Tm9kZVBhZGRpbmcoKVwiPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm9kZS1jb250ZW50LXdyYXBwZXJcIlxyXG4gICAgICAgICAgICAjbm9kZUNvbnRlbnRXcmFwcGVyXHJcbiAgICAgICAgICAgIChjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdjbGljaycsICRldmVudClcIlxyXG4gICAgICAgICAgICAoZGJsY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignZGJsQ2xpY2snLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIm5vZGUubW91c2VBY3Rpb24oJ2NvbnRleHRNZW51JywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICh0cmVlRHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIFt0cmVlQWxsb3dEcm9wXT1cImFsbG93RHJvcC5iaW5kKHRoaXMpXCJcclxuICAgICAgICAgICAgW3RyZWVEcmFnXT1cIm5vZGVcIlxyXG4gICAgICAgICAgICBbdHJlZURyYWdFbmFibGVkXT1cIm5vZGUuYWxsb3dEcmFnKClcIj5cclxuICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAqbmdJZj1cIm5vZGUuaXNGb2xkZXJcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXJcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdleHBhbmRlckNsaWNrJywgJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnt7IG5vZGUuaXNFeHBhbmRlZCA/ICdmb2xkZXJfb3BlbicgOiAnZm9sZGVyJyB9fTwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAqbmdJZj1cIiFub2RlLmlzRm9sZGVyXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlbi1wbGFjZWhvbGRlclwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbnNlcnRfZHJpdmVfZmlsZTwvaT5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8VHJlZU5vZGVDb250ZW50IFtub2RlXT1cIm5vZGVcIiBbdHJlZU5vZGVDb250ZW50VGVtcGxhdGVdPVwidHJlZU5vZGVDb250ZW50VGVtcGxhdGVcIj48L1RyZWVOb2RlQ29udGVudD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBbY2xhc3MudHJlZS1jaGlsZHJlbl09XCJ0cnVlXCJcclxuICAgICAgICAgICBbY2xhc3MudHJlZS1jaGlsZHJlbi1uby1wYWRkaW5nXT1cIm5vZGUub3B0aW9ucy5sZXZlbFBhZGRpbmdcIlxyXG4gICAgICAgICAgICpuZ0lmPVwibm9kZS5pc0V4cGFuZGVkXCI+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIm5vZGUuY2hpbGRyZW5cIj5cclxuICAgICAgICAgIDxUcmVlTm9kZVxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiBub2RlLmNoaWxkcmVuOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgW25vZGVdPVwibm9kZVwiXHJcbiAgICAgICAgICAgIFtub2RlSW5kZXhdPVwiaVwiXHJcbiAgICAgICAgICAgIFt0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZV09XCJ0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIFtsb2FkaW5nVGVtcGxhdGVdPVwibG9hZGluZ1RlbXBsYXRlXCI+XHJcbiAgICAgICAgICA8L1RyZWVOb2RlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxMb2FkaW5nQ29tcG9uZW50XHJcbiAgICAgICAgICBbc3R5bGUucGFkZGluZy1sZWZ0XT1cImdldE5vZGVQYWRkaW5nKClcIlxyXG4gICAgICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUtbG9hZGluZ1wiXHJcbiAgICAgICAgICAqbmdJZj1cIiFub2RlLmNoaWxkcmVuXCJcclxuICAgICAgICAgIFtsb2FkaW5nVGVtcGxhdGVdPVwibG9hZGluZ1RlbXBsYXRlXCJcclxuICAgICAgICA+PC9Mb2FkaW5nQ29tcG9uZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPFRyZWVOb2RlRHJvcFNsb3RcclxuICAgICAgICBbZHJvcEluZGV4XT1cIm5vZGVJbmRleCArIDFcIlxyXG4gICAgICAgIFtub2RlXT1cIm5vZGUucGFyZW50XCJcclxuICAgICAgICA+PC9UcmVlTm9kZURyb3BTbG90PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ25vZGVJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid0cmVlTm9kZUNvbnRlbnRUZW1wbGF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidsb2FkaW5nVGVtcGxhdGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xufVxyXG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==