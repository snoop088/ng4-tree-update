"use strict";
var core_1 = require('@angular/core');
var tree_node_model_1 = require('./tree-node.model');
var tree_options_model_1 = require('./tree-options.model');
var events_1 = require('../constants/events');
var deprecated_1 = require('../deprecated');
var lodash_1 = require('lodash');
var TreeModel = (function () {
    function TreeModel() {
        this.options = new tree_options_model_1.TreeOptions();
        this.expandedNodeIds = {};
        this.activeNodeIds = {};
        this._focusedNode = null;
        this.focusedNodeId = null;
        this.firstUpdate = true;
        this.eventNames = Object.keys(events_1.TREE_EVENTS);
        // CONTEXT MENU NODE
        this._contextMenuNode = null;
    }
    TreeModel.prototype.setData = function (_a) {
        var nodes = _a.nodes, _b = _a.options, options = _b === void 0 ? null : _b, _c = _a.events, events = _c === void 0 ? null : _c;
        if (options) {
            this.options = new tree_options_model_1.TreeOptions(options);
        }
        if (events) {
            this.events = events;
        }
        if (nodes) {
            this.nodes = nodes;
        }
        this.update();
    };
    TreeModel.prototype.update = function () {
        // Rebuild tree:
        var virtualRootConfig = (_a = {
                virtual: true
            },
            _a[this.options.childrenField] = this.nodes,
            _a
        );
        this.virtualRoot = this.getTreeNode(virtualRootConfig, null);
        this.roots = this.virtualRoot.children;
        this._initTreeNodeContentComponent();
        this._initLoadingComponent();
        this._loadState();
        // Fire event:
        if (this.firstUpdate) {
            if (this.roots) {
                this.fireEvent({ eventName: events_1.TREE_EVENTS.onInitialized });
                this.firstUpdate = false;
                this._calculateExpandedNodes();
            }
        }
        else {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onUpdateData });
        }
        var _a;
    };
    TreeModel.prototype._calculateExpandedNodes = function (startNode) {
        var _this = this;
        if (startNode === void 0) { startNode = null; }
        startNode = startNode || this.virtualRoot;
        if (startNode.data[this.options.isExpandedField]) {
            this.expandedNodeIds[startNode.id] = true;
        }
        if (startNode.children) {
            startNode.children.forEach(function (child) { return _this._calculateExpandedNodes(child); });
        }
    };
    TreeModel.prototype.fireEvent = function (event) {
        this.events[event.eventName].emit(event);
        this.events.onEvent.emit(event);
    };
    Object.defineProperty(TreeModel.prototype, "contextMenuNode", {
        get: function () {
            return this._contextMenuNode;
        },
        set: function (node) {
            this._contextMenuNode = node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeModel.prototype, "focusedNode", {
        get: function () { deprecated_1.deprecated('focusedNode attribute', 'getFocusedNode'); return this.getFocusedNode(); },
        set: function (value) { deprecated_1.deprecated('focusedNode = ', 'setFocusedNode'); this.setFocusedNode(value); },
        enumerable: true,
        configurable: true
    });
    ;
    TreeModel.prototype.getFocusedNode = function () {
        return this._focusedNode;
    };
    TreeModel.prototype.setFocusedNode = function (node) {
        this._focusedNode = node;
        this.focusedNodeId = node ? node.id : null;
    };
    TreeModel.prototype.getActiveNode = function () {
        return this.activeNodes[0];
    };
    TreeModel.prototype.getActiveNodes = function () {
        return this.activeNodes;
    };
    TreeModel.prototype.getTreeNode = function (node, parent) {
        return new tree_node_model_1.TreeNode(node, parent, this);
    };
    TreeModel.prototype.getVisibleRoots = function () {
        return this.virtualRoot.getVisibleChildren();
    };
    TreeModel.prototype.getFirstRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return lodash_1.first(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    TreeModel.prototype.getLastRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return lodash_1.last(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    Object.defineProperty(TreeModel.prototype, "isFocused", {
        get: function () {
            return TreeModel.focusedTree === this;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.isNodeFocused = function (node) {
        return this._focusedNode === node;
    };
    TreeModel.prototype.setFocus = function (value) {
        TreeModel.focusedTree = value ? this : null;
    };
    Object.defineProperty(TreeModel.prototype, "treeNodeContentComponent", {
        get: function () { return this._treeNodeContentComponent; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeModel.prototype, "loadingComponent", {
        get: function () { return this._loadingComponent; },
        enumerable: true,
        configurable: true
    });
    ;
    // if treeNodeTemplate is a component - use it,
    // otherwise - it's a template, so wrap it with an AdHoc component
    TreeModel.prototype._initTreeNodeContentComponent = function () {
        this._treeNodeContentComponent = this.options.treeNodeTemplate;
        if (typeof this._treeNodeContentComponent === 'string') {
            this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
        }
    };
    // same for loading component
    TreeModel.prototype._initLoadingComponent = function () {
        this._loadingComponent = this.options.loadingComponent;
        if (typeof this._loadingComponent === 'string') {
            this._loadingComponent = this._createAdHocComponent(this._loadingComponent);
        }
    };
    TreeModel.prototype._loadState = function () {
        var _this = this;
        if (this.focusedNodeId) {
            this._focusedNode = this.getNodeById(this.focusedNodeId);
        }
        this.expandedNodes = Object.keys(this.expandedNodeIds)
            .filter(function (id) { return _this.expandedNodeIds[id]; })
            .map(function (id) { return _this.getNodeById(id); });
        this.expandedNodes = lodash_1.compact(this.expandedNodes);
        this.activeNodes = Object.keys(this.activeNodeIds)
            .filter(function (id) { return _this.expandedNodeIds[id]; })
            .map(function (id) { return _this.getNodeById(id); });
        this.activeNodes = lodash_1.compact(this.activeNodes);
    };
    TreeModel.prototype.getNodeByPath = function (path, startNode) {
        if (startNode === void 0) { startNode = null; }
        if (!path)
            return null;
        startNode = startNode || this.virtualRoot;
        if (path.length === 0)
            return startNode;
        if (!startNode.children)
            return null;
        var childId = path.shift();
        var childNode = lodash_1.find(startNode.children, (_a = {}, _a[this.options.idField] = childId, _a));
        if (!childNode)
            return null;
        return this.getNodeByPath(path, childNode);
        var _a;
    };
    TreeModel.prototype.getNodeById = function (id) {
        return this.getNodeBy({ id: id });
    };
    TreeModel.prototype.getNodeBy = function (predicate, startNode) {
        if (startNode === void 0) { startNode = null; }
        startNode = startNode || this.virtualRoot;
        if (!startNode.children)
            return null;
        var found = lodash_1.find(startNode.children, predicate);
        if (found) {
            return found;
        }
        else {
            for (var _i = 0, _a = startNode.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found_1 = this.getNodeBy(predicate, child);
                if (found_1)
                    return found_1;
            }
        }
    };
    TreeModel.prototype._createAdHocComponent = function (templateStr) {
        var AdHocTreeNodeTemplateComponent = (function () {
            function AdHocTreeNodeTemplateComponent() {
            }
            AdHocTreeNodeTemplateComponent.decorators = [
                { type: core_1.Component, args: [{
                            selector: 'TreeNodeTemplate',
                            template: templateStr
                        },] },
            ];
            /** @nocollapse */
            AdHocTreeNodeTemplateComponent.ctorParameters = [];
            AdHocTreeNodeTemplateComponent.propDecorators = {
                'node': [{ type: core_1.Input },],
            };
            return AdHocTreeNodeTemplateComponent;
        }());
        return AdHocTreeNodeTemplateComponent;
    };
    TreeModel.prototype.focusNextNode = function () {
        var previousNode = this.getFocusedNode();
        var nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
        nextNode && nextNode.focus();
    };
    TreeModel.prototype.focusPreviousNode = function () {
        var previousNode = this.getFocusedNode();
        var nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
        nextNode && nextNode.focus();
    };
    TreeModel.prototype.focusDrillDown = function () {
        var previousNode = this.getFocusedNode();
        if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
            previousNode.toggleExpanded();
        }
        else {
            var nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
            nextNode && nextNode.focus();
        }
    };
    TreeModel.prototype.focusDrillUp = function () {
        var previousNode = this.getFocusedNode();
        if (!previousNode)
            return;
        if (previousNode.isExpanded) {
            previousNode.toggleExpanded();
        }
        else {
            var nextNode = previousNode.realParent;
            nextNode && nextNode.focus();
        }
    };
    TreeModel.prototype.isActive = function (node) {
        return this.activeNodeIds[node.id];
    };
    TreeModel.prototype.setActiveNode = function (node, value, multi) {
        if (multi === void 0) { multi = false; }
        if (value) {
            node.focus();
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onActivate, node: node });
        }
        else {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onDeactivate, node: node });
        }
        if (multi) {
            this._setActiveNodeMulti(node, value);
        }
        else {
            this._setActiveNodeSingle(node, value);
        }
    };
    TreeModel.prototype._setActiveNodeSingle = function (node, value) {
        var _this = this;
        // Deactivate all other nodes:
        this.activeNodes
            .filter(function (activeNode) { return activeNode != node; })
            .forEach(function (activeNode) {
            _this.fireEvent({ eventName: events_1.TREE_EVENTS.onDeactivate, node: activeNode });
        });
        this.activeNodeIds = {};
        this.activeNodes = [];
        if (value) {
            this.activeNodes.push(node);
            this.activeNodeIds[node.id] = true;
        }
    };
    TreeModel.prototype._setActiveNodeMulti = function (node, value) {
        this.activeNodeIds[node.id] = value;
        if (value) {
            if (!lodash_1.includes(this.activeNodes, node)) {
                this.activeNodes.push(node);
            }
        }
        else {
            if (lodash_1.includes(this.activeNodes, node)) {
                lodash_1.remove(this.activeNodes, node);
            }
        }
    };
    TreeModel.prototype.isExpanded = function (node) {
        return this.expandedNodeIds[node.id];
    };
    TreeModel.prototype.setExpandedNode = function (node, value) {
        var index = lodash_1.indexOf(this.expandedNodes, node);
        if (value && !index)
            this.expandedNodes.push(node);
        else if (index)
            lodash_1.pullAt(this.expandedNodes, index);
        this.expandedNodeIds[node.id] = value;
    };
    TreeModel.prototype.performKeyAction = function (node, $event) {
        var action = this.options.actionMapping.keys[$event.keyCode];
        if (action) {
            $event.preventDefault();
            action(this, node, $event);
            return true;
        }
        else {
            return false;
        }
    };
    TreeModel.prototype.filterNodes = function (filter, autoShow) {
        if (autoShow === void 0) { autoShow = false; }
        var filterFn;
        if (!filter) {
            return this.clearFilter();
        }
        if (lodash_1.isString(filter)) {
            filterFn = function (node) { return node.displayField.toLowerCase().indexOf(filter.toLowerCase()) != -1; };
        }
        else if (lodash_1.isFunction(filter)) {
            filterFn = filter;
        }
        else {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function', filter);
        }
        this.roots.forEach(function (node) { return node.filter(filterFn, autoShow); });
    };
    TreeModel.prototype.clearFilter = function () {
        this.roots.forEach(function (node) { return node.clearFilter(); });
    };
    TreeModel.prototype._canMoveNode = function (node, fromIndex, to) {
        // same node:
        if (node.parent === to.parent && fromIndex === to.index) {
            return false;
        }
        if (!(this.options.allowFolderFromNode || to.parent.isFolder)) {
            return false;
        }
        return !to.parent.isDescendantOf(node);
    };
    TreeModel.prototype.addNode = function (name, inParent) {
    };
    TreeModel.prototype.addFolder = function (name, node) {
        var parentNode = this.virtualRoot;
        if (node && node.isFolder) {
            parentNode = node;
        }
        else if (node && node.parent) {
            parentNode = node.parent;
        }
        if (!parentNode.data.children) {
            parentNode.data.children = [];
        }
        parentNode.data.children.push({
            'name': name,
            'folder': true
        });
        this.update();
    };
    TreeModel.prototype.moveNode = function (node, to) {
        var fromIndex = node.getIndexInParent();
        var fromParent = node.parent;
        if (!this._canMoveNode(node, fromIndex, to))
            return;
        var fromChildren = fromParent.getField('children');
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        var toChildren = to.parent.getField('children');
        var originalNode = fromChildren.splice(fromIndex, 1)[0];
        // Compensate for index if already removed from parent:
        var toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
        toChildren.splice(toIndex, 0, originalNode);
        fromParent.treeModel.update();
        if (to.parent.treeModel !== fromParent.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onMoveNode, node: originalNode, to: { parent: to.parent.data, index: toIndex } });
    };
    TreeModel.focusedTree = null;
    TreeModel.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TreeModel.ctorParameters = [];
    return TreeModel;
}());
exports.TreeModel = TreeModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXdFLGVBQWUsQ0FBQyxDQUFBO0FBRXhGLGdDQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBQzdDLG1DQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBRW5ELHVCQUE0QixxQkFBcUIsQ0FBQyxDQUFBO0FBRWxELDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQyx1QkFBb0csUUFBUSxDQUFDLENBQUE7QUFHN0c7SUFBQTtRQUVFLFlBQU8sR0FBZ0IsSUFBSSxnQ0FBVyxFQUFFLENBQUM7UUFFekMsb0JBQWUsR0FBNkIsRUFBRSxDQUFDO1FBRS9DLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQztRQUU3QyxpQkFBWSxHQUFhLElBQUksQ0FBQztRQUM5QixrQkFBYSxHQUFXLElBQUksQ0FBQztRQUk3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBVyxDQUFDLENBQUM7UUEyRHRDLG9CQUFvQjtRQUNaLHFCQUFnQixHQUFhLElBQUksQ0FBQztJQTZWNUMsQ0FBQztJQXZaQywyQkFBTyxHQUFQLFVBQVEsRUFBMkU7WUFBekUsZ0JBQUssRUFBRSxlQUFjLEVBQWQsbUNBQWMsRUFBRSxjQUFhLEVBQWIsa0NBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQ0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7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QVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVILENBQUM7SUF2Wk0scUJBQVcsR0FBRyxJQUFJLENBQUM7SUF3WnJCLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHdCQUFjLEdBQTZELEVBQ2pGLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUF4YUQsSUF3YUM7QUF4YVksaUJBQVMsWUF3YXJCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJVHJlZU5vZGVUZW1wbGF0ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBJVHJlZU1vZGVsIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcblxuaW1wb3J0IHsgZGVwcmVjYXRlZCB9IGZyb20gJy4uL2RlcHJlY2F0ZWQnO1xuXG5pbXBvcnQgeyBmaXJzdCwgbGFzdCwgY29tcGFjdCwgZmluZCwgaW5jbHVkZXMsIHJlbW92ZSwgaW5kZXhPZiwgcHVsbEF0LCBpc1N0cmluZywgaXNGdW5jdGlvbiB9IGZyb20gJ2xvZGFzaCc7XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVNb2RlbCBpbXBsZW1lbnRzIElUcmVlTW9kZWwge1xuICByb290czogVHJlZU5vZGVbXTtcbiAgb3B0aW9uczogVHJlZU9wdGlvbnMgPSBuZXcgVHJlZU9wdGlvbnMoKTtcbiAgbm9kZXM6IGFueVtdO1xuICBleHBhbmRlZE5vZGVJZHM6IHsgW2lkOnN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICBleHBhbmRlZE5vZGVzOiBUcmVlTm9kZVtdO1xuICBhY3RpdmVOb2RlSWRzOiB7IFtpZDpzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgYWN0aXZlTm9kZXM6IFRyZWVOb2RlW107XG4gIF9mb2N1c2VkTm9kZTogVHJlZU5vZGUgPSBudWxsO1xuICBmb2N1c2VkTm9kZUlkOiBzdHJpbmcgPSBudWxsO1xuICBzdGF0aWMgZm9jdXNlZFRyZWUgPSBudWxsO1xuICBwcml2YXRlIGV2ZW50czogYW55O1xuICB2aXJ0dWFsUm9vdDogVHJlZU5vZGU7XG4gIGZpcnN0VXBkYXRlID0gdHJ1ZTtcblxuICBldmVudE5hbWVzID0gT2JqZWN0LmtleXMoVFJFRV9FVkVOVFMpO1xuXG4gIHNldERhdGEoeyBub2Rlcywgb3B0aW9ucyA9IG51bGwsIGV2ZW50cyA9IG51bGwgfTp7bm9kZXM6YW55LG9wdGlvbnM6YW55LGV2ZW50czphbnl9KSB7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBUcmVlT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgfVxuICAgIGlmIChub2Rlcykge1xuICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgLy8gUmVidWlsZCB0cmVlOlxuICAgIGxldCB2aXJ0dWFsUm9vdENvbmZpZyA9IHtcbiAgICAgIHZpcnR1YWw6IHRydWUsXG4gICAgICBbdGhpcy5vcHRpb25zLmNoaWxkcmVuRmllbGRdOiB0aGlzLm5vZGVzXG4gICAgfTtcblxuICAgIHRoaXMudmlydHVhbFJvb3QgPSB0aGlzLmdldFRyZWVOb2RlKHZpcnR1YWxSb290Q29uZmlnLCBudWxsKTtcblxuICAgIHRoaXMucm9vdHMgPSB0aGlzLnZpcnR1YWxSb290LmNoaWxkcmVuO1xuXG4gICAgdGhpcy5faW5pdFRyZWVOb2RlQ29udGVudENvbXBvbmVudCgpO1xuICAgIHRoaXMuX2luaXRMb2FkaW5nQ29tcG9uZW50KCk7XG5cbiAgICB0aGlzLl9sb2FkU3RhdGUoKTtcblxuICAgIC8vIEZpcmUgZXZlbnQ6XG4gICAgaWYgKHRoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgIGlmICh0aGlzLnJvb3RzKSB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkluaXRpYWxpemVkIH0pO1xuICAgICAgICB0aGlzLmZpcnN0VXBkYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uVXBkYXRlRGF0YSB9KTtcbiAgICB9XG4gIH1cblxuICBfY2FsY3VsYXRlRXhwYW5kZWROb2RlcyhzdGFydE5vZGUgPSBudWxsKSB7XG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XG5cbiAgICBpZiAoc3RhcnROb2RlLmRhdGFbdGhpcy5vcHRpb25zLmlzRXhwYW5kZWRGaWVsZF0pIHtcbiAgICAgIHRoaXMuZXhwYW5kZWROb2RlSWRzW3N0YXJ0Tm9kZS5pZF0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoc3RhcnROb2RlLmNoaWxkcmVuKSB7XG4gICAgICBzdGFydE5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoY2hpbGQpKTtcbiAgICB9XG4gIH1cblxuICBmaXJlRXZlbnQoZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50c1tldmVudC5ldmVudE5hbWVdLmVtaXQoZXZlbnQpO1xuICAgIHRoaXMuZXZlbnRzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gIH1cbiAgLy8gQ09OVEVYVCBNRU5VIE5PREVcbiAgcHJpdmF0ZSBfY29udGV4dE1lbnVOb2RlOiBUcmVlTm9kZSA9IG51bGw7XG4gIGdldCBjb250ZXh0TWVudU5vZGUoKTogVHJlZU5vZGUge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0TWVudU5vZGVcbiAgfVxuICBzZXQgY29udGV4dE1lbnVOb2RlKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgdGhpcy5fY29udGV4dE1lbnVOb2RlID0gbm9kZTtcbiAgfVxuXG4gIGdldCBmb2N1c2VkTm9kZSgpIHsgZGVwcmVjYXRlZCgnZm9jdXNlZE5vZGUgYXR0cmlidXRlJywgJ2dldEZvY3VzZWROb2RlJyk7IHJldHVybiB0aGlzLmdldEZvY3VzZWROb2RlKCk7IH1cbiAgc2V0IGZvY3VzZWROb2RlKHZhbHVlKSB7IGRlcHJlY2F0ZWQoJ2ZvY3VzZWROb2RlID0gJywgJ3NldEZvY3VzZWROb2RlJyk7IHRoaXMuc2V0Rm9jdXNlZE5vZGUodmFsdWUpIH07XG5cbiAgZ2V0Rm9jdXNlZE5vZGUoKTpUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWROb2RlO1xuICB9XG5cbiAgc2V0Rm9jdXNlZE5vZGUobm9kZSkge1xuICAgIHRoaXMuX2ZvY3VzZWROb2RlID0gbm9kZTtcbiAgICB0aGlzLmZvY3VzZWROb2RlSWQgPSBub2RlID8gbm9kZS5pZCA6IG51bGw7XG4gIH1cblxuICBnZXRBY3RpdmVOb2RlKCk6VHJlZU5vZGUge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVzWzBdO1xuICB9XG5cbiAgZ2V0QWN0aXZlTm9kZXMoKTpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2RlcztcbiAgfVxuXG4gIGdldFRyZWVOb2RlKG5vZGU6YW55LCBwYXJlbnQ6VHJlZU5vZGUpOlRyZWVOb2RlIHtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlKG5vZGUsIHBhcmVudCwgdGhpcyk7XG4gIH1cblxuICBnZXRWaXNpYmxlUm9vdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlydHVhbFJvb3QuZ2V0VmlzaWJsZUNoaWxkcmVuKCk7XG4gIH1cblxuICBnZXRGaXJzdFJvb3Qoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZpcnN0KHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVSb290cygpIDogdGhpcy5yb290cyk7XG4gIH1cblxuICBnZXRMYXN0Um9vdChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gbGFzdChza2lwSGlkZGVuID8gdGhpcy5nZXRWaXNpYmxlUm9vdHMoKSA6IHRoaXMucm9vdHMpO1xuICB9XG5cbiAgZ2V0IGlzRm9jdXNlZCgpIHtcbiAgICByZXR1cm4gVHJlZU1vZGVsLmZvY3VzZWRUcmVlID09PSB0aGlzO1xuICB9XG5cbiAgaXNOb2RlRm9jdXNlZChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWROb2RlID09PSBub2RlO1xuICB9XG5cbiAgc2V0Rm9jdXModmFsdWUpIHtcbiAgICBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPSB2YWx1ZSA/IHRoaXMgOiBudWxsO1xuICB9XG5cblxuICBwcml2YXRlIF90cmVlTm9kZUNvbnRlbnRDb21wb25lbnQ6YW55O1xuICBnZXQgdHJlZU5vZGVDb250ZW50Q29tcG9uZW50KCkgeyByZXR1cm4gdGhpcy5fdHJlZU5vZGVDb250ZW50Q29tcG9uZW50IH07XG5cbiAgcHJpdmF0ZSBfbG9hZGluZ0NvbXBvbmVudDphbnk7XG4gIGdldCBsb2FkaW5nQ29tcG9uZW50KCkgeyByZXR1cm4gdGhpcy5fbG9hZGluZ0NvbXBvbmVudCB9O1xuXG4gIC8vIGlmIHRyZWVOb2RlVGVtcGxhdGUgaXMgYSBjb21wb25lbnQgLSB1c2UgaXQsXG4gIC8vIG90aGVyd2lzZSAtIGl0J3MgYSB0ZW1wbGF0ZSwgc28gd3JhcCBpdCB3aXRoIGFuIEFkSG9jIGNvbXBvbmVudFxuICBfaW5pdFRyZWVOb2RlQ29udGVudENvbXBvbmVudCgpIHtcbiAgICB0aGlzLl90cmVlTm9kZUNvbnRlbnRDb21wb25lbnQgPSB0aGlzLm9wdGlvbnMudHJlZU5vZGVUZW1wbGF0ZTtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3RyZWVOb2RlQ29udGVudENvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3RyZWVOb2RlQ29udGVudENvbXBvbmVudCA9IHRoaXMuX2NyZWF0ZUFkSG9jQ29tcG9uZW50KHRoaXMuX3RyZWVOb2RlQ29udGVudENvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgLy8gc2FtZSBmb3IgbG9hZGluZyBjb21wb25lbnRcbiAgX2luaXRMb2FkaW5nQ29tcG9uZW50KCkge1xuICAgIHRoaXMuX2xvYWRpbmdDb21wb25lbnQgPSB0aGlzLm9wdGlvbnMubG9hZGluZ0NvbXBvbmVudDtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2xvYWRpbmdDb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9sb2FkaW5nQ29tcG9uZW50ID0gdGhpcy5fY3JlYXRlQWRIb2NDb21wb25lbnQodGhpcy5fbG9hZGluZ0NvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgX2xvYWRTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5mb2N1c2VkTm9kZUlkKSB7XG4gICAgICB0aGlzLl9mb2N1c2VkTm9kZSA9IHRoaXMuZ2V0Tm9kZUJ5SWQodGhpcy5mb2N1c2VkTm9kZUlkKTtcbiAgICB9XG5cbiAgICB0aGlzLmV4cGFuZGVkTm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLmV4cGFuZGVkTm9kZUlkcylcbiAgICAgIC5maWx0ZXIoKGlkKSA9PiB0aGlzLmV4cGFuZGVkTm9kZUlkc1tpZF0pXG4gICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpXG4gICAgdGhpcy5leHBhbmRlZE5vZGVzID0gY29tcGFjdCh0aGlzLmV4cGFuZGVkTm9kZXMpO1xuXG4gICAgdGhpcy5hY3RpdmVOb2RlcyA9IE9iamVjdC5rZXlzKHRoaXMuYWN0aXZlTm9kZUlkcylcbiAgICAgIC5maWx0ZXIoKGlkKSA9PiB0aGlzLmV4cGFuZGVkTm9kZUlkc1tpZF0pXG4gICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpXG4gICAgdGhpcy5hY3RpdmVOb2RlcyA9IGNvbXBhY3QodGhpcy5hY3RpdmVOb2Rlcyk7XG4gIH1cblxuICBnZXROb2RlQnlQYXRoKHBhdGgsIHN0YXJ0Tm9kZT1udWxsKTpUcmVlTm9kZSB7XG4gICAgaWYgKCFwYXRoKSByZXR1cm4gbnVsbDtcblxuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHN0YXJ0Tm9kZTtcblxuICAgIGlmICghc3RhcnROb2RlLmNoaWxkcmVuKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGNoaWxkSWQgPSBwYXRoLnNoaWZ0KCk7XG4gICAgY29uc3QgY2hpbGROb2RlID0gZmluZChzdGFydE5vZGUuY2hpbGRyZW4sIHsgW3RoaXMub3B0aW9ucy5pZEZpZWxkXTogY2hpbGRJZCB9KTtcblxuICAgIGlmICghY2hpbGROb2RlKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLmdldE5vZGVCeVBhdGgocGF0aCwgY2hpbGROb2RlKVxuICB9XG5cbiAgZ2V0Tm9kZUJ5SWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2RlQnkoeyBpZCB9KTtcbiAgfVxuXG4gIGdldE5vZGVCeShwcmVkaWNhdGUsIHN0YXJ0Tm9kZSA9IG51bGwpIHtcbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcblxuICAgIGlmICghc3RhcnROb2RlLmNoaWxkcmVuKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGZvdW5kID0gZmluZChzdGFydE5vZGUuY2hpbGRyZW4sIHByZWRpY2F0ZSk7XG5cbiAgICBpZiAoZm91bmQpIHsgLy8gZm91bmQgaW4gY2hpbGRyZW5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9IGVsc2UgeyAvLyBsb29rIGluIGNoaWxkcmVuJ3MgY2hpbGRyZW5cbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuZ2V0Tm9kZUJ5KHByZWRpY2F0ZSwgY2hpbGQpO1xuICAgICAgICBpZiAoZm91bmQpIHJldHVybiBmb3VuZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfY3JlYXRlQWRIb2NDb21wb25lbnQodGVtcGxhdGVTdHIpOiBhbnkge1xuICAgIFxuICAgIGNsYXNzIEFkSG9jVHJlZU5vZGVUZW1wbGF0ZUNvbXBvbmVudCB7XG4gICAgICAgICBub2RlOiBUcmVlTm9kZTtcbiAgICBzdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gICAgICAgIHNlbGVjdG9yOiAnVHJlZU5vZGVUZW1wbGF0ZScsXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVN0clxuICAgIH0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidub2RlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxufTtcbn1cbiAgICByZXR1cm4gQWRIb2NUcmVlTm9kZVRlbXBsYXRlQ29tcG9uZW50O1xuICB9XG5cbiAgZm9jdXNOZXh0Tm9kZSgpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZSA/IHByZXZpb3VzTm9kZS5maW5kTmV4dE5vZGUodHJ1ZSwgdHJ1ZSkgOiB0aGlzLmdldEZpcnN0Um9vdCh0cnVlKTtcbiAgICBuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5mb2N1cygpO1xuICB9XG5cbiAgZm9jdXNQcmV2aW91c05vZGUoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZmluZFByZXZpb3VzTm9kZSh0cnVlKSA6IHRoaXMuZ2V0TGFzdFJvb3QodHJ1ZSk7XG4gICAgbmV4dE5vZGUgJiYgbmV4dE5vZGUuZm9jdXMoKTtcbiAgfVxuXG4gIGZvY3VzRHJpbGxEb3duKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgaWYgKHByZXZpb3VzTm9kZSAmJiBwcmV2aW91c05vZGUuaXNDb2xsYXBzZWQgJiYgcHJldmlvdXNOb2RlLmhhc0NoaWxkcmVuKSB7XG4gICAgICBwcmV2aW91c05vZGUudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZ2V0Rmlyc3RDaGlsZCh0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xuICAgICAgbmV4dE5vZGUgJiYgbmV4dE5vZGUuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBmb2N1c0RyaWxsVXAoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBpZiAoIXByZXZpb3VzTm9kZSkgcmV0dXJuO1xuICAgIGlmIChwcmV2aW91c05vZGUuaXNFeHBhbmRlZCkge1xuICAgICAgcHJldmlvdXNOb2RlLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlLnJlYWxQYXJlbnQ7XG4gICAgICBuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzQWN0aXZlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgc2V0QWN0aXZlTm9kZShub2RlLCB2YWx1ZSwgbXVsdGkgPSBmYWxzZSkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgbm9kZS5mb2N1cygpO1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uQWN0aXZhdGUsIG5vZGUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkRlYWN0aXZhdGUsIG5vZGUgfSk7XG4gICAgfVxuXG4gICAgaWYgKG11bHRpKSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVOb2RlTXVsdGkobm9kZSwgdmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRBY3RpdmVOb2RlU2luZ2xlKG5vZGUsIHZhbHVlKSB7XG4gICAgLy8gRGVhY3RpdmF0ZSBhbGwgb3RoZXIgbm9kZXM6XG4gICAgdGhpcy5hY3RpdmVOb2Rlc1xuICAgICAgLmZpbHRlcigoYWN0aXZlTm9kZSkgPT4gYWN0aXZlTm9kZSAhPSBub2RlKVxuICAgICAgLmZvckVhY2goKGFjdGl2ZU5vZGUpID0+IHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uRGVhY3RpdmF0ZSwgbm9kZTogYWN0aXZlTm9kZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVOb2RlSWRzID0ge307XG4gICAgdGhpcy5hY3RpdmVOb2RlcyA9IFtdO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5hY3RpdmVOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdGhpcy5hY3RpdmVOb2RlSWRzW25vZGUuaWRdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBfc2V0QWN0aXZlTm9kZU11bHRpKG5vZGUsIHZhbHVlKSB7XG4gICAgdGhpcy5hY3RpdmVOb2RlSWRzW25vZGUuaWRdID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBpZiAoIWluY2x1ZGVzKHRoaXMuYWN0aXZlTm9kZXMsIG5vZGUpKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlTm9kZXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGluY2x1ZGVzKHRoaXMuYWN0aXZlTm9kZXMsIG5vZGUpKSB7XG4gICAgICAgIHJlbW92ZSh0aGlzLmFjdGl2ZU5vZGVzLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0V4cGFuZGVkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZE5vZGVJZHNbbm9kZS5pZF07XG4gIH1cblxuICBzZXRFeHBhbmRlZE5vZGUobm9kZSwgdmFsdWUpIHtcbiAgICBjb25zdCBpbmRleCA9IGluZGV4T2YodGhpcy5leHBhbmRlZE5vZGVzLCBub2RlKTtcblxuICAgIGlmICh2YWx1ZSAmJiAhaW5kZXgpIHRoaXMuZXhwYW5kZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgIGVsc2UgaWYgKGluZGV4KSBwdWxsQXQodGhpcy5leHBhbmRlZE5vZGVzLCBpbmRleCk7XG5cbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkc1tub2RlLmlkXSA9IHZhbHVlO1xuICB9XG5cbiAgcGVyZm9ybUtleUFjdGlvbihub2RlLCAkZXZlbnQpIHtcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5rZXlzWyRldmVudC5rZXlDb2RlXVxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgYWN0aW9uKHRoaXMsIG5vZGUsICRldmVudCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlck5vZGVzKGZpbHRlciwgYXV0b1Nob3cgPSBmYWxzZSkge1xuICAgIGxldCBmaWx0ZXJGbjtcblxuICAgIGlmICghZmlsdGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jbGVhckZpbHRlcigpO1xuICAgIH1cblxuICAgIGlmIChpc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgICBmaWx0ZXJGbiA9IChub2RlKSA9PiBub2RlLmRpc3BsYXlGaWVsZC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnRvTG93ZXJDYXNlKCkpICE9IC0xXG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgICAgIGZpbHRlckZuID0gZmlsdGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RvblxcJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggZmlsdGVyJywgZmlsdGVyKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1Nob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgZnVuY3Rpb24nLCBmaWx0ZXIpO1xuICAgIH1cbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKG5vZGUpID0+IG5vZGUuZmlsdGVyKGZpbHRlckZuLCBhdXRvU2hvdykpO1xuICB9XG5cbiAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChub2RlKSA9PiBub2RlLmNsZWFyRmlsdGVyKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FuTW92ZU5vZGUobm9kZSwgZnJvbUluZGV4LCB0bykge1xuICAgIC8vIHNhbWUgbm9kZTpcbiAgICBpZiAobm9kZS5wYXJlbnQgPT09IHRvLnBhcmVudCAmJiBmcm9tSW5kZXggPT09IHRvLmluZGV4KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghKHRoaXMub3B0aW9ucy5hbGxvd0ZvbGRlckZyb21Ob2RlIHx8IHRvLnBhcmVudC5pc0ZvbGRlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gIXRvLnBhcmVudC5pc0Rlc2NlbmRhbnRPZihub2RlKTtcbiAgfVxuICBhZGROb2RlIChuYW1lOiBzdHJpbmcsIGluUGFyZW50OiBUcmVlTm9kZSkge1xuXG4gIH1cbiAgYWRkRm9sZGVyIChuYW1lOiBzdHJpbmcsIG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLnZpcnR1YWxSb290O1xuICAgIGlmIChub2RlICYmIG5vZGUuaXNGb2xkZXIpIHtcbiAgICAgIHBhcmVudE5vZGUgPSBub2RlO1xuICAgIH0gZWxzZSBpZiAobm9kZSAmJiBub2RlLnBhcmVudCkge1xuICAgICAgcGFyZW50Tm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICBpZiAoIXBhcmVudE5vZGUuZGF0YS5jaGlsZHJlbikge1xuICAgICAgcGFyZW50Tm9kZS5kYXRhLmNoaWxkcmVuID0gW107XG4gICAgfVxuICAgIHBhcmVudE5vZGUuZGF0YS5jaGlsZHJlbi5wdXNoKHtcbiAgICAgICduYW1lJyA6IG5hbWUsXG4gICAgICAnZm9sZGVyJyA6IHRydWVcbiAgICB9KVxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbiAgbW92ZU5vZGUobm9kZSwgdG8pIHtcbiAgICBjb25zdCBmcm9tSW5kZXggPSBub2RlLmdldEluZGV4SW5QYXJlbnQoKTtcbiAgICBjb25zdCBmcm9tUGFyZW50ID0gbm9kZS5wYXJlbnQ7XG5cbiAgICBpZiAoIXRoaXMuX2Nhbk1vdmVOb2RlKG5vZGUsIGZyb21JbmRleCAsIHRvKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZnJvbUNoaWxkcmVuID0gZnJvbVBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIC8vIElmIG5vZGUgZG9lc24ndCBoYXZlIGNoaWxkcmVuIC0gY3JlYXRlIGNoaWxkcmVuIGFycmF5XG4gICAgaWYgKCF0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJykpIHtcbiAgICAgIHRvLnBhcmVudC5zZXRGaWVsZCgnY2hpbGRyZW4nLCBbXSk7XG4gICAgfVxuICAgIGNvbnN0IHRvQ2hpbGRyZW4gPSB0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJyk7XG5cbiAgICBjb25zdCBvcmlnaW5hbE5vZGUgPSBmcm9tQ2hpbGRyZW4uc3BsaWNlKGZyb21JbmRleCwgMSlbMF07XG5cbiAgICAvLyBDb21wZW5zYXRlIGZvciBpbmRleCBpZiBhbHJlYWR5IHJlbW92ZWQgZnJvbSBwYXJlbnQ6XG4gICAgbGV0IHRvSW5kZXggPSAoZnJvbVBhcmVudCA9PT0gdG8ucGFyZW50ICYmIHRvLmluZGV4ID4gZnJvbUluZGV4KSA/IHRvLmluZGV4IC0gMSA6IHRvLmluZGV4O1xuXG4gICAgdG9DaGlsZHJlbi5zcGxpY2UodG9JbmRleCwgMCwgb3JpZ2luYWxOb2RlKTtcblxuICAgIGZyb21QYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xuICAgIGlmICh0by5wYXJlbnQudHJlZU1vZGVsICE9PSBmcm9tUGFyZW50LnRyZWVNb2RlbCkge1xuICAgICAgdG8ucGFyZW50LnRyZWVNb2RlbC51cGRhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Nb3ZlTm9kZSwgbm9kZTogb3JpZ2luYWxOb2RlLCB0bzogeyBwYXJlbnQ6IHRvLnBhcmVudC5kYXRhLCBpbmRleDogdG9JbmRleCB9IH0pO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xuXTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19