"use strict";
var keys_1 = require('../constants/keys');
var deprecated_1 = require('../deprecated');
var lodash_1 = require('lodash');
exports.TREE_ACTIONS = {
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
        click: exports.TREE_ACTIONS.TOGGLE_SELECTED,
        dblClick: null,
        contextMenu: exports.TREE_ACTIONS.CONTEXT_MENU,
        expanderClick: exports.TREE_ACTIONS.TOGGLE_EXPANDED,
        drop: exports.TREE_ACTIONS.MOVE_NODE
    },
    keys: (_a = {},
        _a[keys_1.KEYS.RIGHT] = exports.TREE_ACTIONS.DRILL_DOWN,
        _a[keys_1.KEYS.LEFT] = exports.TREE_ACTIONS.DRILL_UP,
        _a[keys_1.KEYS.DOWN] = exports.TREE_ACTIONS.NEXT_NODE,
        _a[keys_1.KEYS.UP] = exports.TREE_ACTIONS.PREVIOUS_NODE,
        _a[keys_1.KEYS.SPACE] = exports.TREE_ACTIONS.TOGGLE_SELECTED,
        _a[keys_1.KEYS.ENTER] = exports.TREE_ACTIONS.TOGGLE_SELECTED,
        _a
    )
};
var TreeOptions = (function () {
    function TreeOptions(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.actionMapping = lodash_1.defaultsDeep(this.options.actionMapping, defaultActionMapping);
        if (options.hasCustomContextMenu) {
            deprecated_1.deprecated('hasCustomContextMenu', 'actionMapping: mouse: contextMenu');
        }
        if (options.context) {
            deprecated_1.deprecated('context', 'values directly in a template in the content of the <Tree> component like this: <Tree><template #treeNodeTemplate let-node>{{ outsideValue }}</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.treeNodeTemplate) {
            deprecated_1.deprecated('treeNodeTemplate', 'a template in the content of the <Tree> component like this: <Tree><template #treeNodeTemplate let-node>...</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (options.loadingComponent) {
            deprecated_1.deprecated('loadingComponent', 'a template in the content of the <Tree> component like this: <Tree><template #loadingTemplate>...</template></Tree>.  If you don\'t have time to update your code and don\'t need AoT compilation, use DeprecatedTreeModule');
        }
        if (lodash_1.get(options, 'mouse.shift')) {
            deprecated_1.deprecated('mouse.shift', '$event.shiftKey in click action instead');
        }
        if (lodash_1.get(options, 'mouse.ctrl')) {
            deprecated_1.deprecated('mouse.ctrl', '$event.ctrlKey in click action instead');
        }
        if (lodash_1.get(options, 'mouse.alt')) {
            deprecated_1.deprecated('mouse.alt', '$event.altKey in click action instead');
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
        get: function () { return this.options.allowDrag || true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "allowFolderFromNode", {
        get: function () { return this.options.allowFolderFromNode || false; },
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
exports.TreeOptions = TreeOptions;
var _a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHFCQUFxQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUczQyx1QkFBa0MsUUFBUSxDQUFDLENBQUE7QUFNOUIsb0JBQVksR0FBRztJQUMxQixlQUFlLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0I7SUFDdEYscUJBQXFCLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQTFCLENBQTBCO0lBQ2hHLE1BQU0sRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0I7SUFDN0UsUUFBUSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QjtJQUNoRixLQUFLLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZO0lBQ2xFLGVBQWUsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQXpDLENBQXlDO0lBQ3pHLE1BQU0sRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENB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QztRQUM3QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUM5RSxDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQXZEWSxtQkFBVyxjQXVEdkIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcbmltcG9ydCB7IEtFWVMgfSBmcm9tICcuLi9jb25zdGFudHMva2V5cyc7XG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAnLi4vZGVwcmVjYXRlZCc7XG5pbXBvcnQgeyBJVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9kZWZzL2FwaSc7XG5cbmltcG9ydCB7IGRlZmF1bHRzRGVlcCwgZ2V0IH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uSGFuZGxlciB7XG4gICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSwgLi4ucmVzdCk7XG59XG5cbmV4cG9ydCBjb25zdCBUUkVFX0FDVElPTlMgPSB7XG4gIFRPR0dMRV9TRUxFQ1RFRDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnRvZ2dsZUFjdGl2YXRlZCgpLFxuICBUT0dHTEVfU0VMRUNURURfTVVMVEk6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS50b2dnbGVBY3RpdmF0ZWQodHJ1ZSksXG4gIFNFTEVDVDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnNldElzQWN0aXZlKHRydWUpLFxuICBERVNFTEVDVDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnNldElzQWN0aXZlKGZhbHNlKSxcbiAgRk9DVVM6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5mb2N1cygpLFxuICBUT0dHTEVfRVhQQU5ERUQ6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5oYXNDaGlsZHJlbiAmJiBub2RlLnRvZ2dsZUV4cGFuZGVkKCksXG4gIEVYUEFORDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmV4cGFuZCgpLFxuICBDT0xMQVBTRTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLmNvbGxhcHNlKCksXG4gIERSSUxMX0RPV046ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gdHJlZS5mb2N1c0RyaWxsRG93bigpLFxuICBEUklMTF9VUDogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiB0cmVlLmZvY3VzRHJpbGxVcCgpLFxuICBORVhUX05PREU6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gIHRyZWUuZm9jdXNOZXh0Tm9kZSgpLFxuICBQUkVWSU9VU19OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+ICB0cmVlLmZvY3VzUHJldmlvdXNOb2RlKCksXG4gIENPTlRFWFRfTUVOVTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiBub2RlLnRvZ2dsZUNvbnRleHQoJGV2ZW50KSxcbiAgTU9WRV9OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnksIHtmcm9tICwgdG99Ontmcm9tOmFueSwgdG86YW55fSkgPT4ge1xuICAgIC8vIGRlZmF1bHQgYWN0aW9uIGFzc3VtZXMgZnJvbSA9IG5vZGUsIHRvID0ge3BhcmVudCwgaW5kZXh9XG4gICAgdHJlZS5tb3ZlTm9kZShmcm9tLCB0byk7XG4gIH1cbn1cblxuY29uc3QgZGVmYXVsdEFjdGlvbk1hcHBpbmc6SUFjdGlvbk1hcHBpbmcgPSB7XG4gIG1vdXNlOiB7XG4gICAgY2xpY2s6IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURUQsXG4gICAgZGJsQ2xpY2s6IG51bGwsXG4gICAgY29udGV4dE1lbnU6IFRSRUVfQUNUSU9OUy5DT05URVhUX01FTlUsXG4gICAgZXhwYW5kZXJDbGljazogVFJFRV9BQ1RJT05TLlRPR0dMRV9FWFBBTkRFRCxcbiAgICBkcm9wOiBUUkVFX0FDVElPTlMuTU9WRV9OT0RFXG4gIH0sXG4gIGtleXM6IHtcbiAgICBbS0VZUy5SSUdIVF06IFRSRUVfQUNUSU9OUy5EUklMTF9ET1dOLFxuICAgIFtLRVlTLkxFRlRdOiBUUkVFX0FDVElPTlMuRFJJTExfVVAsXG4gICAgW0tFWVMuRE9XTl06IFRSRUVfQUNUSU9OUy5ORVhUX05PREUsXG4gICAgW0tFWVMuVVBdOiBUUkVFX0FDVElPTlMuUFJFVklPVVNfTk9ERSxcbiAgICBbS0VZUy5TUEFDRV06IFRSRUVfQUNUSU9OUy5UT0dHTEVfU0VMRUNURUQsXG4gICAgW0tFWVMuRU5URVJdOiBUUkVFX0FDVElPTlMuVE9HR0xFX1NFTEVDVEVEXG4gIH1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbk1hcHBpbmcge1xuICBtb3VzZT86IHtcbiAgICBjbGljaz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRibENsaWNrPzogSUFjdGlvbkhhbmRsZXIsXG4gICAgY29udGV4dE1lbnU/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBleHBhbmRlckNsaWNrPzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZHJhZ1N0YXJ0PzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZHJhZz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyYWdFbmQ/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkcmFnT3Zlcj86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyb3A/OiBJQWN0aW9uSGFuZGxlclxuICB9LFxuICBrZXlzPzoge1xuICAgIFtrZXk6bnVtYmVyXTogSUFjdGlvbkhhbmRsZXJcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJlZU9wdGlvbnMge1xuICBnZXQgY2hpbGRyZW5GaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmNoaWxkcmVuRmllbGQgfHwgJ2NoaWxkcmVuJ31cbiAgZ2V0IGRpc3BsYXlGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmRpc3BsYXlGaWVsZCB8fCAnbmFtZSd9XG4gIGdldCBpZEZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaWRGaWVsZCB8fCAnaWQnfVxuICBnZXQgaXNFeHBhbmRlZEZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaXNFeHBhbmRlZEZpZWxkIHx8ICdpc0V4cGFuZGVkJ31cbiAgZ2V0IGlzSGlkZGVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5pc0hpZGRlbkZpZWxkIHx8ICdpc0hpZGRlbid9XG4gIGdldCB0cmVlTm9kZVRlbXBsYXRlKCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMudHJlZU5vZGVUZW1wbGF0ZSB9XG4gIGdldCBsb2FkaW5nQ29tcG9uZW50KCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMubG9hZGluZ0NvbXBvbmVudCB9XG4gIGdldCBnZXRDaGlsZHJlbigpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdldENoaWxkcmVuIH1cbiAgZ2V0IGhhc0N1c3RvbUNvbnRleHRNZW51KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5vcHRpb25zLmhhc0N1c3RvbUNvbnRleHRNZW51IH1cbiAgZ2V0IGNvbnRleHQoKTogYW55IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5jb250ZXh0IH1cbiAgZ2V0IGFsbG93RHJhZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWcgfHwgdHJ1ZX1cbiAgZ2V0IGFsbG93Rm9sZGVyRnJvbU5vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dGb2xkZXJGcm9tTm9kZSB8fCBmYWxzZSB9XG4gIGdldCBsZXZlbFBhZGRpbmcoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5sZXZlbFBhZGRpbmcgfHwgMCB9XG4gIGFjdGlvbk1hcHBpbmc6IElBY3Rpb25NYXBwaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczpJVHJlZU9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuYWN0aW9uTWFwcGluZyA9IGRlZmF1bHRzRGVlcCh0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZywgZGVmYXVsdEFjdGlvbk1hcHBpbmcpO1xuXG4gICAgaWYgKG9wdGlvbnMuaGFzQ3VzdG9tQ29udGV4dE1lbnUpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ2hhc0N1c3RvbUNvbnRleHRNZW51JywgJ2FjdGlvbk1hcHBpbmc6IG1vdXNlOiBjb250ZXh0TWVudScpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvbnRleHQpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ2NvbnRleHQnLCAndmFsdWVzIGRpcmVjdGx5IGluIGEgdGVtcGxhdGUgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIDxUcmVlPiBjb21wb25lbnQgbGlrZSB0aGlzOiA8VHJlZT48dGVtcGxhdGUgI3RyZWVOb2RlVGVtcGxhdGUgbGV0LW5vZGU+e3sgb3V0c2lkZVZhbHVlIH19PC90ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnRyZWVOb2RlVGVtcGxhdGUpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ3RyZWVOb2RlVGVtcGxhdGUnLCAnYSB0ZW1wbGF0ZSBpbiB0aGUgY29udGVudCBvZiB0aGUgPFRyZWU+IGNvbXBvbmVudCBsaWtlIHRoaXM6IDxUcmVlPjx0ZW1wbGF0ZSAjdHJlZU5vZGVUZW1wbGF0ZSBsZXQtbm9kZT4uLi48L3RlbXBsYXRlPjwvVHJlZT4uICBJZiB5b3UgZG9uXFwndCBoYXZlIHRpbWUgdG8gdXBkYXRlIHlvdXIgY29kZSBhbmQgZG9uXFwndCBuZWVkIEFvVCBjb21waWxhdGlvbiwgdXNlIERlcHJlY2F0ZWRUcmVlTW9kdWxlJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMubG9hZGluZ0NvbXBvbmVudCkge1xuICAgICAgZGVwcmVjYXRlZCgnbG9hZGluZ0NvbXBvbmVudCcsICdhIHRlbXBsYXRlIGluIHRoZSBjb250ZW50IG9mIHRoZSA8VHJlZT4gY29tcG9uZW50IGxpa2UgdGhpczogPFRyZWU+PHRlbXBsYXRlICNsb2FkaW5nVGVtcGxhdGU+Li4uPC90ZW1wbGF0ZT48L1RyZWU+LiAgSWYgeW91IGRvblxcJ3QgaGF2ZSB0aW1lIHRvIHVwZGF0ZSB5b3VyIGNvZGUgYW5kIGRvblxcJ3QgbmVlZCBBb1QgY29tcGlsYXRpb24sIHVzZSBEZXByZWNhdGVkVHJlZU1vZHVsZScpO1xuICAgIH1cblxuICAgIGlmIChnZXQob3B0aW9ucywgJ21vdXNlLnNoaWZ0JykpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ21vdXNlLnNoaWZ0JywgJyRldmVudC5zaGlmdEtleSBpbiBjbGljayBhY3Rpb24gaW5zdGVhZCcpO1xuICAgIH1cblxuICAgIGlmIChnZXQob3B0aW9ucywgJ21vdXNlLmN0cmwnKSkge1xuICAgICAgZGVwcmVjYXRlZCgnbW91c2UuY3RybCcsICckZXZlbnQuY3RybEtleSBpbiBjbGljayBhY3Rpb24gaW5zdGVhZCcpO1xuICAgIH1cblxuICAgIGlmIChnZXQob3B0aW9ucywgJ21vdXNlLmFsdCcpKSB7XG4gICAgICBkZXByZWNhdGVkKCdtb3VzZS5hbHQnLCAnJGV2ZW50LmFsdEtleSBpbiBjbGljayBhY3Rpb24gaW5zdGVhZCcpO1xuICAgIH1cbiAgfVxuICBhbGxvd0Ryb3AoZWxlbWVudCwgdG8pOmJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dEcm9wIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHRvKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJvcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHRoaXMub3B0aW9ucy5hbGxvd0Ryb3A7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==