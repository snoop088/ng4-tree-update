import { KEYS } from '../constants/keys';
import { deprecated } from '../deprecated';
import { defaultsDeep, get } from 'lodash';
export var TREE_ACTIONS = {
    TOGGLE_SELECTED: function (tree, node, $event) { return node.toggleActivated(); },
    TOGGLE_SELECTED_MULTI: function (tree, node, $event) { return node.toggleActivated(true); },
    SELECT: function (tree, node, $event) { return node.setIsActive(true); },
    DESELECT: function (tree, node, $event) { return node.setIsActive(false); },
    FOCUS: function (tree, node, $event) { return node.focus(); },
    TOGGLE_EXPANDED: function (tree, node, $event) { return node.hasChildren && node.toggleExpanded(); },
    EXPAND: function (tree, node, $event) { return node.expand(); },
    COLLAPSE: function (tree, node, $event) { return node.collapse(); },
    DRILL_DOWN: function (tree, node, $event) { return tree.focusDrillDown(); },
    DRILL_UP: function (tree, node, $event) { return tree.focusDrillUp(); },
    NEXT_NODE: function (tree, node, $event) { return tree.focusNextNode(); },
    PREVIOUS_NODE: function (tree, node, $event) { return tree.focusPreviousNode(); },
    CONTEXT_MENU: function (tree, node, $event) { return node.toggleContext($event); },
    MOVE_NODE: function (tree, node, $event, _a) {
        var from = _a.from, to = _a.to;
        // default action assumes from = node, to = {parent, index}
        tree.moveNode(from, to);
    }
};
var defaultActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_SELECTED,
        dblClick: null,
        contextMenu: TREE_ACTIONS.CONTEXT_MENU,
        expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: (_a = {},
        _a[KEYS.RIGHT] = TREE_ACTIONS.DRILL_DOWN,
        _a[KEYS.LEFT] = TREE_ACTIONS.DRILL_UP,
        _a[KEYS.DOWN] = TREE_ACTIONS.NEXT_NODE,
        _a[KEYS.UP] = TREE_ACTIONS.PREVIOUS_NODE,
        _a[KEYS.SPACE] = TREE_ACTIONS.TOGGLE_SELECTED,
        _a[KEYS.ENTER] = TREE_ACTIONS.TOGGLE_SELECTED,
        _a)
};
var TreeOptions = (function () {
    function TreeOptions(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.actionMapping = defaultsDeep(this.options.actionMapping, defaultActionMapping);
        if (options.hasCustomContextMenu) {
            deprecated('hasCustomContextMenu', 'actionMapping: mouse: contextMenu');
        }
        if (options.context) {
            deprecated('context', 'values directly in a template in the content of the <Tree> component like this: <Tree><ng-template #treeNodeTemplate let-node>{{ outsideValue }}</ng-template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.treeNodeTemplate) {
            deprecated('treeNodeTemplate', 'a template in the content of the <Tree> component like this: <Tree><ng-template #treeNodeTemplate let-node>...</ng-template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.loadingComponent) {
            deprecated('loadingComponent', 'a template in the content of the <Tree> component like this: <Tree><ng-template #loadingTemplate>...</ng-template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (get(options, 'mouse.shift')) {
            deprecated('mouse.shift', '$event.shiftKey in click action instead');
        }
        if (get(options, 'mouse.ctrl')) {
            deprecated('mouse.ctrl', '$event.ctrlKey in click action instead');
        }
        if (get(options, 'mouse.alt')) {
            deprecated('mouse.alt', '$event.altKey in click action instead');
        }
    }
    Object.defineProperty(TreeOptions.prototype, "childrenField", {
        get: function () { return this.options.childrenField || 'children'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "displayField", {
        get: function () { return this.options.displayField || 'name'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "idField", {
        get: function () { return this.options.idField || 'id'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isExpandedField", {
        get: function () { return this.options.isExpandedField || 'isExpanded'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isHiddenField", {
        get: function () { return this.options.isHiddenField || 'isHidden'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "treeNodeTemplate", {
        get: function () { return this.options.treeNodeTemplate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "loadingComponent", {
        get: function () { return this.options.loadingComponent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "getChildren", {
        get: function () { return this.options.getChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "hasCustomContextMenu", {
        get: function () { return this.options.hasCustomContextMenu; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "context", {
        get: function () { return this.options.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "allowDrag", {
        get: function () { return this.options.allowDrag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "allowFolderFromNode", {
        get: function () { return this.options.allowFolderFromNode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "readOnly", {
        get: function () { return this.options.readOnly; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "levelPadding", {
        get: function () { return this.options.levelPadding || 0; },
        enumerable: true,
        configurable: true
    });
    TreeOptions.prototype.allowDrop = function (element, to) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    };
    return TreeOptions;
}());
export { TreeOptions };
var _a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTTNDLE1BQU0sQ0FBQyxJQUFNLFlBQVksR0FBRztJQUMxQixlQUFlLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0I7SUFDdEYscUJBQXFCLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQTFCLENBQTBCO0lBQ2hHLE1BQU0sRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0I7SUFDN0UsUUFBUSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QjtJQUNoRixLQUFLLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZO0lBQ2xFLGVBQWUsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQXpDLENBQXlDO0lBQ3pHLE1BQU0sRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLE1B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QyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDOUUsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBeERBLEFBd0RDLElBQUEiLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xyXG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2tleXMnO1xyXG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAnLi4vZGVwcmVjYXRlZCc7XHJcbmltcG9ydCB7IElUcmVlT3B0aW9ucyB9IGZyb20gJy4uL2RlZnMvYXBpJztcclxuXHJcbmltcG9ydCB7IGRlZmF1bHRzRGVlcCwgZ2V0IH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbkhhbmRsZXIge1xyXG4gICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSwgLi4ucmVzdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBUUkVFX0FDVElPTlMgPSB7XHJcbiAgVE9HR0xFX1NFTEVDVEVEOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUudG9nZ2xlQWN0aXZhdGVkKCksXHJcbiAgVE9HR0xFX1NFTEVDVEVEX01VTFRJOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUudG9nZ2xlQWN0aXZhdGVkKHRydWUpLFxyXG4gIFNFTEVDVDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnNldElzQWN0aXZlKHRydWUpLFxyXG4gIERFU0VMRUNUOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuc2V0SXNBY3RpdmUoZmFsc2UpLFxyXG4gIEZPQ1VTOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuZm9jdXMoKSxcclxuICBUT0dHTEVfRVhQQU5ERUQ6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5oYXNDaGlsZHJlbiAmJiBub2RlLnRvZ2dsZUV4cGFuZGVkKCksXHJcbiAgRVhQQU5EOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuZXhwYW5kKCksXHJcbiAgQ09MTEFQU0U6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5jb2xsYXBzZSgpLFxyXG4gIERSSUxMX0RPV046ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gdHJlZS5mb2N1c0RyaWxsRG93bigpLFxyXG4gIERSSUxMX1VQOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IHRyZWUuZm9jdXNEcmlsbFVwKCksXHJcbiAgTkVYVF9OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+ICB0cmVlLmZvY3VzTmV4dE5vZGUoKSxcclxuICBQUkVWSU9VU19OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+ICB0cmVlLmZvY3VzUHJldmlvdXNOb2RlKCksXHJcbiAgQ09OVEVYVF9NRU5VOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUudG9nZ2xlQ29udGV4dCgkZXZlbnQpLFxyXG4gIE1PVkVfTk9ERTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55LCB7ZnJvbSAsIHRvfTp7ZnJvbTphbnksIHRvOmFueX0pID0+IHtcclxuICAgIC8vIGRlZmF1bHQgYWN0aW9uIGFzc3VtZXMgZnJvbSA9IG5vZGUsIHRvID0ge3BhcmVudCwgaW5kZXh9XHJcbiAgICB0cmVlLm1vdmVOb2RlKGZyb20sIHRvKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRBY3Rpb25NYXBwaW5nOklBY3Rpb25NYXBwaW5nID0ge1xyXG4gIG1vdXNlOiB7XHJcbiAgICBjbGljazogVFJFRV9BQ1RJT05TLlRPR0dMRV9TRUxFQ1RFRCxcclxuICAgIGRibENsaWNrOiBudWxsLFxyXG4gICAgY29udGV4dE1lbnU6IFRSRUVfQUNUSU9OUy5DT05URVhUX01FTlUsXHJcbiAgICBleHBhbmRlckNsaWNrOiBUUkVFX0FDVElPTlMuVE9HR0xFX0VYUEFOREVELFxyXG4gICAgZHJvcDogVFJFRV9BQ1RJT05TLk1PVkVfTk9ERVxyXG4gIH0sXHJcbiAga2V5czoge1xyXG4gICAgW0tFWVMuUklHSFRdOiBUUkVFX0FDVElPTlMuRFJJTExfRE9XTixcclxuICAgIFtLRVlTLkxFRlRdOiBUUkVFX0FDVElPTlMuRFJJTExfVVAsXHJcbiAgICBbS0VZUy5ET1dOXTogVFJFRV9BQ1RJT05TLk5FWFRfTk9ERSxcclxuICAgIFtLRVlTLlVQXTogVFJFRV9BQ1RJT05TLlBSRVZJT1VTX05PREUsXHJcbiAgICBbS0VZUy5TUEFDRV06IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURUQsXHJcbiAgICBbS0VZUy5FTlRFUl06IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURURcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25NYXBwaW5nIHtcclxuICBtb3VzZT86IHtcclxuICAgIGNsaWNrPzogSUFjdGlvbkhhbmRsZXIsXHJcbiAgICBkYmxDbGljaz86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgY29udGV4dE1lbnU/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGV4cGFuZGVyQ2xpY2s/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyYWdTdGFydD86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZz86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZ0VuZD86IElBY3Rpb25IYW5kbGVyLFxyXG4gICAgZHJhZ092ZXI/OiBJQWN0aW9uSGFuZGxlcixcclxuICAgIGRyb3A/OiBJQWN0aW9uSGFuZGxlclxyXG4gIH0sXHJcbiAga2V5cz86IHtcclxuICAgIFtrZXk6bnVtYmVyXTogSUFjdGlvbkhhbmRsZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlT3B0aW9ucyB7XHJcbiAgZ2V0IGNoaWxkcmVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5jaGlsZHJlbkZpZWxkIHx8ICdjaGlsZHJlbid9XHJcbiAgZ2V0IGRpc3BsYXlGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmRpc3BsYXlGaWVsZCB8fCAnbmFtZSd9XHJcbiAgZ2V0IGlkRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5pZEZpZWxkIHx8ICdpZCd9XHJcbiAgZ2V0IGlzRXhwYW5kZWRGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmlzRXhwYW5kZWRGaWVsZCB8fCAnaXNFeHBhbmRlZCd9XHJcbiAgZ2V0IGlzSGlkZGVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5pc0hpZGRlbkZpZWxkIHx8ICdpc0hpZGRlbid9XHJcbiAgZ2V0IHRyZWVOb2RlVGVtcGxhdGUoKTogYW55IHsgcmV0dXJuIHRoaXMub3B0aW9ucy50cmVlTm9kZVRlbXBsYXRlIH1cclxuICBnZXQgbG9hZGluZ0NvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmxvYWRpbmdDb21wb25lbnQgfVxyXG4gIGdldCBnZXRDaGlsZHJlbigpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdldENoaWxkcmVuIH1cclxuICBnZXQgaGFzQ3VzdG9tQ29udGV4dE1lbnUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuaGFzQ3VzdG9tQ29udGV4dE1lbnUgfVxyXG4gIGdldCBjb250ZXh0KCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMuY29udGV4dCB9XHJcbiAgZ2V0IGFsbG93RHJhZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWd9XHJcbiAgZ2V0IGFsbG93Rm9sZGVyRnJvbU5vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dGb2xkZXJGcm9tTm9kZSB9XHJcbiAgZ2V0IHJlYWRPbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLnJlYWRPbmx5IH1cclxuICBnZXQgbGV2ZWxQYWRkaW5nKCk6IG51bWJlciB7IHJldHVybiB0aGlzLm9wdGlvbnMubGV2ZWxQYWRkaW5nIHx8IDAgfVxyXG4gIGFjdGlvbk1hcHBpbmc6IElBY3Rpb25NYXBwaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6SVRyZWVPcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuYWN0aW9uTWFwcGluZyA9IGRlZmF1bHRzRGVlcCh0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZywgZGVmYXVsdEFjdGlvbk1hcHBpbmcpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmhhc0N1c3RvbUNvbnRleHRNZW51KSB7XHJcbiAgICAgIGRlcHJlY2F0ZWQoJ2hhc0N1c3RvbUNvbnRleHRNZW51JywgJ2FjdGlvbk1hcHBpbmc6IG1vdXNlOiBjb250ZXh0TWVudScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmNvbnRleHQpIHtcclxuICAgICAgZGVwcmVjYXRlZCgnY29udGV4dCcsICd2YWx1ZXMgZGlyZWN0bHkgaW4gYSB0ZW1wbGF0ZSBpbiB0aGUgY29udGVudCBvZiB0aGUgPFRyZWU+IGNvbXBvbmVudCBsaWtlIHRoaXM6IDxUcmVlPjxuZy10ZW1wbGF0ZSAjdHJlZU5vZGVUZW1wbGF0ZSBsZXQtbm9kZT57eyBvdXRzaWRlVmFsdWUgfX08L25nLXRlbXBsYXRlPjwvVHJlZT4uICBJZiB5b3UgZG9uXFwndCBoYXZlIHRpbWUgdG8gdXBkYXRlIHlvdXIgY29kZSBhbmQgZG9uXFwndCBuZWVkIEFvVCBjb21waWxhdGlvbiwgdXNlIERlcHJlY2F0ZWRUcmVlTW9kdWxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMudHJlZU5vZGVUZW1wbGF0ZSkge1xyXG4gICAgICBkZXByZWNhdGVkKCd0cmVlTm9kZVRlbXBsYXRlJywgJ2EgdGVtcGxhdGUgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIDxUcmVlPiBjb21wb25lbnQgbGlrZSB0aGlzOiA8VHJlZT48bmctdGVtcGxhdGUgI3RyZWVOb2RlVGVtcGxhdGUgbGV0LW5vZGU+Li4uPC9uZy10ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmxvYWRpbmdDb21wb25lbnQpIHtcclxuICAgICAgZGVwcmVjYXRlZCgnbG9hZGluZ0NvbXBvbmVudCcsICdhIHRlbXBsYXRlIGluIHRoZSBjb250ZW50IG9mIHRoZSA8VHJlZT4gY29tcG9uZW50IGxpa2UgdGhpczogPFRyZWU+PG5nLXRlbXBsYXRlICNsb2FkaW5nVGVtcGxhdGU+Li4uPC9uZy10ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChnZXQob3B0aW9ucywgJ21vdXNlLnNoaWZ0JykpIHtcclxuICAgICAgZGVwcmVjYXRlZCgnbW91c2Uuc2hpZnQnLCAnJGV2ZW50LnNoaWZ0S2V5IGluIGNsaWNrIGFjdGlvbiBpbnN0ZWFkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdldChvcHRpb25zLCAnbW91c2UuY3RybCcpKSB7XHJcbiAgICAgIGRlcHJlY2F0ZWQoJ21vdXNlLmN0cmwnLCAnJGV2ZW50LmN0cmxLZXkgaW4gY2xpY2sgYWN0aW9uIGluc3RlYWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ2V0KG9wdGlvbnMsICdtb3VzZS5hbHQnKSkge1xyXG4gICAgICBkZXByZWNhdGVkKCdtb3VzZS5hbHQnLCAnJGV2ZW50LmFsdEtleSBpbiBjbGljayBhY3Rpb24gaW5zdGVhZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuICBhbGxvd0Ryb3AoZWxlbWVudCwgdG8pOmJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJvcChlbGVtZW50LCB0byk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=