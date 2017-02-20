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
        get: function () { return this.options.allowDrag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "allowFolderFromNode", {
        get: function () { return this.options.allowFolderFromNode; },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb25zLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW9wdGlvbnMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHFCQUFxQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUczQyx1QkFBa0MsUUFBUSxDQUFDLENBQUE7QUFNOUIsb0JBQVksR0FBRztJQUMxQixlQUFlLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0I7SUFDdEYscUJBQXFCLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQTFCLENBQTBCO0lBQ2hHLE1BQU0sRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0I7SUFDN0UsUUFBUSxFQUFFLFVBQUMsSUFBYyxFQUFFLElBQWEsRUFBRSxNQUFVLElBQUssT0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QjtJQUNoRixLQUFLLEVBQUUsVUFBQyxJQUFjLEVBQUUsSUFBYSxFQUFFLE1BQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZO0lBQ2xFLGVBQWUsRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQXpDLENBQXlDO0lBQ3pHLE1BQU0sRUFBRSxVQUFDLElBQWMsRUFBRSxJQUFhLEVBQUUsTUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENB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QUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDOUUsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF2REQsSUF1REM7QUF2RFksbUJBQVcsY0F1RHZCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2tleXMnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZCB9IGZyb20gJy4uL2RlcHJlY2F0ZWQnO1xuaW1wb3J0IHsgSVRyZWVPcHRpb25zIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xuXG5pbXBvcnQgeyBkZWZhdWx0c0RlZXAsIGdldCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbkhhbmRsZXIge1xuICAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnksIC4uLnJlc3QpO1xufVxuXG5leHBvcnQgY29uc3QgVFJFRV9BQ1RJT05TID0ge1xuICBUT0dHTEVfU0VMRUNURUQ6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS50b2dnbGVBY3RpdmF0ZWQoKSxcbiAgVE9HR0xFX1NFTEVDVEVEX01VTFRJOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUudG9nZ2xlQWN0aXZhdGVkKHRydWUpLFxuICBTRUxFQ1Q6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5zZXRJc0FjdGl2ZSh0cnVlKSxcbiAgREVTRUxFQ1Q6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5zZXRJc0FjdGl2ZShmYWxzZSksXG4gIEZPQ1VTOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuZm9jdXMoKSxcbiAgVE9HR0xFX0VYUEFOREVEOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IG5vZGUuaGFzQ2hpbGRyZW4gJiYgbm9kZS50b2dnbGVFeHBhbmRlZCgpLFxuICBFWFBBTkQ6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5leHBhbmQoKSxcbiAgQ09MTEFQU0U6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS5jb2xsYXBzZSgpLFxuICBEUklMTF9ET1dOOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+IHRyZWUuZm9jdXNEcmlsbERvd24oKSxcbiAgRFJJTExfVVA6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gdHJlZS5mb2N1c0RyaWxsVXAoKSxcbiAgTkVYVF9OT0RFOiAodHJlZTpUcmVlTW9kZWwsIG5vZGU6VHJlZU5vZGUsICRldmVudDphbnkpID0+ICB0cmVlLmZvY3VzTmV4dE5vZGUoKSxcbiAgUFJFVklPVVNfTk9ERTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55KSA9PiAgdHJlZS5mb2N1c1ByZXZpb3VzTm9kZSgpLFxuICBDT05URVhUX01FTlU6ICh0cmVlOlRyZWVNb2RlbCwgbm9kZTpUcmVlTm9kZSwgJGV2ZW50OmFueSkgPT4gbm9kZS50b2dnbGVDb250ZXh0KCRldmVudCksXG4gIE1PVkVfTk9ERTogKHRyZWU6VHJlZU1vZGVsLCBub2RlOlRyZWVOb2RlLCAkZXZlbnQ6YW55LCB7ZnJvbSAsIHRvfTp7ZnJvbTphbnksIHRvOmFueX0pID0+IHtcbiAgICAvLyBkZWZhdWx0IGFjdGlvbiBhc3N1bWVzIGZyb20gPSBub2RlLCB0byA9IHtwYXJlbnQsIGluZGV4fVxuICAgIHRyZWUubW92ZU5vZGUoZnJvbSwgdG8pO1xuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRBY3Rpb25NYXBwaW5nOklBY3Rpb25NYXBwaW5nID0ge1xuICBtb3VzZToge1xuICAgIGNsaWNrOiBUUkVFX0FDVElPTlMuVE9HR0xFX1NFTEVDVEVELFxuICAgIGRibENsaWNrOiBudWxsLFxuICAgIGNvbnRleHRNZW51OiBUUkVFX0FDVElPTlMuQ09OVEVYVF9NRU5VLFxuICAgIGV4cGFuZGVyQ2xpY2s6IFRSRUVfQUNUSU9OUy5UT0dHTEVfRVhQQU5ERUQsXG4gICAgZHJvcDogVFJFRV9BQ1RJT05TLk1PVkVfTk9ERVxuICB9LFxuICBrZXlzOiB7XG4gICAgW0tFWVMuUklHSFRdOiBUUkVFX0FDVElPTlMuRFJJTExfRE9XTixcbiAgICBbS0VZUy5MRUZUXTogVFJFRV9BQ1RJT05TLkRSSUxMX1VQLFxuICAgIFtLRVlTLkRPV05dOiBUUkVFX0FDVElPTlMuTkVYVF9OT0RFLFxuICAgIFtLRVlTLlVQXTogVFJFRV9BQ1RJT05TLlBSRVZJT1VTX05PREUsXG4gICAgW0tFWVMuU1BBQ0VdOiBUUkVFX0FDVElPTlMuVE9HR0xFX1NFTEVDVEVELFxuICAgIFtLRVlTLkVOVEVSXTogVFJFRV9BQ1RJT05TLlRPR0dMRV9TRUxFQ1RFRFxuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25NYXBwaW5nIHtcbiAgbW91c2U/OiB7XG4gICAgY2xpY2s/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkYmxDbGljaz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGNvbnRleHRNZW51PzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZXhwYW5kZXJDbGljaz86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyYWdTdGFydD86IElBY3Rpb25IYW5kbGVyLFxuICAgIGRyYWc/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkcmFnRW5kPzogSUFjdGlvbkhhbmRsZXIsXG4gICAgZHJhZ092ZXI/OiBJQWN0aW9uSGFuZGxlcixcbiAgICBkcm9wPzogSUFjdGlvbkhhbmRsZXJcbiAgfSxcbiAga2V5cz86IHtcbiAgICBba2V5Om51bWJlcl06IElBY3Rpb25IYW5kbGVyXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyZWVPcHRpb25zIHtcbiAgZ2V0IGNoaWxkcmVuRmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5jaGlsZHJlbkZpZWxkIHx8ICdjaGlsZHJlbid9XG4gIGdldCBkaXNwbGF5RmllbGQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXNwbGF5RmllbGQgfHwgJ25hbWUnfVxuICBnZXQgaWRGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmlkRmllbGQgfHwgJ2lkJ31cbiAgZ2V0IGlzRXhwYW5kZWRGaWVsZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmlzRXhwYW5kZWRGaWVsZCB8fCAnaXNFeHBhbmRlZCd9XG4gIGdldCBpc0hpZGRlbkZpZWxkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaXNIaWRkZW5GaWVsZCB8fCAnaXNIaWRkZW4nfVxuICBnZXQgdHJlZU5vZGVUZW1wbGF0ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLnRyZWVOb2RlVGVtcGxhdGUgfVxuICBnZXQgbG9hZGluZ0NvbXBvbmVudCgpOiBhbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmxvYWRpbmdDb21wb25lbnQgfVxuICBnZXQgZ2V0Q2hpbGRyZW4oKTogYW55IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbiB9XG4gIGdldCBoYXNDdXN0b21Db250ZXh0TWVudSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5oYXNDdXN0b21Db250ZXh0TWVudSB9XG4gIGdldCBjb250ZXh0KCk6IGFueSB7IHJldHVybiB0aGlzLm9wdGlvbnMuY29udGV4dCB9XG4gIGdldCBhbGxvd0RyYWcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcmFnfVxuICBnZXQgYWxsb3dGb2xkZXJGcm9tTm9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0ZvbGRlckZyb21Ob2RlIH1cbiAgZ2V0IGxldmVsUGFkZGluZygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLmxldmVsUGFkZGluZyB8fCAwIH1cbiAgYWN0aW9uTWFwcGluZzogSUFjdGlvbk1hcHBpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOklUcmVlT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5hY3Rpb25NYXBwaW5nID0gZGVmYXVsdHNEZWVwKHRoaXMub3B0aW9ucy5hY3Rpb25NYXBwaW5nLCBkZWZhdWx0QWN0aW9uTWFwcGluZyk7XG5cbiAgICBpZiAob3B0aW9ucy5oYXNDdXN0b21Db250ZXh0TWVudSkge1xuICAgICAgZGVwcmVjYXRlZCgnaGFzQ3VzdG9tQ29udGV4dE1lbnUnLCAnYWN0aW9uTWFwcGluZzogbW91c2U6IGNvbnRleHRNZW51Jyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY29udGV4dCkge1xuICAgICAgZGVwcmVjYXRlZCgnY29udGV4dCcsICd2YWx1ZXMgZGlyZWN0bHkgaW4gYSB0ZW1wbGF0ZSBpbiB0aGUgY29udGVudCBvZiB0aGUgPFRyZWU+IGNvbXBvbmVudCBsaWtlIHRoaXM6IDxUcmVlPjx0ZW1wbGF0ZSAjdHJlZU5vZGVUZW1wbGF0ZSBsZXQtbm9kZT57eyBvdXRzaWRlVmFsdWUgfX08L3RlbXBsYXRlPjwvVHJlZT4uICBJZiB5b3UgZG9uXFwndCBoYXZlIHRpbWUgdG8gdXBkYXRlIHlvdXIgY29kZSBhbmQgZG9uXFwndCBuZWVkIEFvVCBjb21waWxhdGlvbiwgdXNlIERlcHJlY2F0ZWRUcmVlTW9kdWxlJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudHJlZU5vZGVUZW1wbGF0ZSkge1xuICAgICAgZGVwcmVjYXRlZCgndHJlZU5vZGVUZW1wbGF0ZScsICdhIHRlbXBsYXRlIGluIHRoZSBjb250ZW50IG9mIHRoZSA8VHJlZT4gY29tcG9uZW50IGxpa2UgdGhpczogPFRyZWU+PHRlbXBsYXRlICN0cmVlTm9kZVRlbXBsYXRlIGxldC1ub2RlPi4uLjwvdGVtcGxhdGU+PC9UcmVlPi4gIElmIHlvdSBkb25cXCd0IGhhdmUgdGltZSB0byB1cGRhdGUgeW91ciBjb2RlIGFuZCBkb25cXCd0IG5lZWQgQW9UIGNvbXBpbGF0aW9uLCB1c2UgRGVwcmVjYXRlZFRyZWVNb2R1bGUnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5sb2FkaW5nQ29tcG9uZW50KSB7XG4gICAgICBkZXByZWNhdGVkKCdsb2FkaW5nQ29tcG9uZW50JywgJ2EgdGVtcGxhdGUgaW4gdGhlIGNvbnRlbnQgb2YgdGhlIDxUcmVlPiBjb21wb25lbnQgbGlrZSB0aGlzOiA8VHJlZT48dGVtcGxhdGUgI2xvYWRpbmdUZW1wbGF0ZT4uLi48L3RlbXBsYXRlPjwvVHJlZT4uICBJZiB5b3UgZG9uXFwndCBoYXZlIHRpbWUgdG8gdXBkYXRlIHlvdXIgY29kZSBhbmQgZG9uXFwndCBuZWVkIEFvVCBjb21waWxhdGlvbiwgdXNlIERlcHJlY2F0ZWRUcmVlTW9kdWxlJyk7XG4gICAgfVxuXG4gICAgaWYgKGdldChvcHRpb25zLCAnbW91c2Uuc2hpZnQnKSkge1xuICAgICAgZGVwcmVjYXRlZCgnbW91c2Uuc2hpZnQnLCAnJGV2ZW50LnNoaWZ0S2V5IGluIGNsaWNrIGFjdGlvbiBpbnN0ZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKGdldChvcHRpb25zLCAnbW91c2UuY3RybCcpKSB7XG4gICAgICBkZXByZWNhdGVkKCdtb3VzZS5jdHJsJywgJyRldmVudC5jdHJsS2V5IGluIGNsaWNrIGFjdGlvbiBpbnN0ZWFkJyk7XG4gICAgfVxuXG4gICAgaWYgKGdldChvcHRpb25zLCAnbW91c2UuYWx0JykpIHtcbiAgICAgIGRlcHJlY2F0ZWQoJ21vdXNlLmFsdCcsICckZXZlbnQuYWx0S2V5IGluIGNsaWNrIGFjdGlvbiBpbnN0ZWFkJyk7XG4gICAgfVxuICB9XG4gIGFsbG93RHJvcChlbGVtZW50LCB0byk6Ym9vbGVhbiB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0Ryb3AoZWxlbWVudCwgdG8pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wID09PSB1bmRlZmluZWQgPyB0cnVlIDogdGhpcy5vcHRpb25zLmFsbG93RHJvcDtcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19