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
            AdHocTreeNodeTemplateComponent.ctorParameters = function () { return []; };
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
        if (this.options.readOnly) {
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
    TreeModel.ctorParameters = function () { return []; };
    return TreeModel;
}());
exports.TreeModel = TreeModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXdFLGVBQWUsQ0FBQyxDQUFBO0FBRXhGLGdDQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBQzdDLG1DQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBRW5ELHVCQUE0QixxQkFBcUIsQ0FBQyxDQUFBO0FBRWxELDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQyx1QkFBb0csUUFBUSxDQUFDLENBQUE7QUFHN0c7SUFBQTtRQUVFLFlBQU8sR0FBZ0IsSUFBSSxnQ0FBVyxFQUFFLENBQUM7UUFFekMsb0JBQWUsR0FBNkIsRUFBRSxDQUFDO1FBRS9DLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQztRQUU3QyxpQkFBWSxHQUFhLElBQUksQ0FBQztRQUM5QixrQkFBYSxHQUFXLElBQUksQ0FBQztRQUk3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBVyxDQUFDLENBQUM7UUEyRHRDLG9CQUFvQjtRQUNaLHFCQUFnQixHQUFhLElBQUksQ0FBQztJQWdXNUMsQ0FBQztJQTFaQywyQkFBTyxHQUFQLFVBQVEsRUFBMkU7WUFBekUsZ0JBQUssRUFBRSxlQUFjLEVBQWQsbUNBQWMsRUFBRSxjQUFhLEVBQWIsa0NBQWE7UUFDNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQ0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7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QUFJLEVBQUUsRUFBRTtRQUNmLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUcsRUFBRSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFckQsSUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRCx3REFBd0Q7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsRCxJQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRCx1REFBdUQ7UUFDdkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFFM0YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRTVDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBMVpNLHFCQUFXLEdBQUcsSUFBSSxDQUFDO0lBMlpyQixvQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQTNhRCxJQTJhQztBQTNhWSxpQkFBUyxZQTJhckIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIENvbXBvbmVudCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElUcmVlTm9kZVRlbXBsYXRlIH0gZnJvbSAnLi4vY29tcG9uZW50cy90cmVlLW5vZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlT3B0aW9ucyB9IGZyb20gJy4vdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IElUcmVlTW9kZWwgfSBmcm9tICcuLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuXG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAnLi4vZGVwcmVjYXRlZCc7XG5cbmltcG9ydCB7IGZpcnN0LCBsYXN0LCBjb21wYWN0LCBmaW5kLCBpbmNsdWRlcywgcmVtb3ZlLCBpbmRleE9mLCBwdWxsQXQsIGlzU3RyaW5nLCBpc0Z1bmN0aW9uIH0gZnJvbSAnbG9kYXNoJztcblxuXG5leHBvcnQgY2xhc3MgVHJlZU1vZGVsIGltcGxlbWVudHMgSVRyZWVNb2RlbCB7XG4gIHJvb3RzOiBUcmVlTm9kZVtdO1xuICBvcHRpb25zOiBUcmVlT3B0aW9ucyA9IG5ldyBUcmVlT3B0aW9ucygpO1xuICBub2RlczogYW55W107XG4gIGV4cGFuZGVkTm9kZUlkczogeyBbaWQ6c3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gIGV4cGFuZGVkTm9kZXM6IFRyZWVOb2RlW107XG4gIGFjdGl2ZU5vZGVJZHM6IHsgW2lkOnN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICBhY3RpdmVOb2RlczogVHJlZU5vZGVbXTtcbiAgX2ZvY3VzZWROb2RlOiBUcmVlTm9kZSA9IG51bGw7XG4gIGZvY3VzZWROb2RlSWQ6IHN0cmluZyA9IG51bGw7XG4gIHN0YXRpYyBmb2N1c2VkVHJlZSA9IG51bGw7XG4gIHByaXZhdGUgZXZlbnRzOiBhbnk7XG4gIHZpcnR1YWxSb290OiBUcmVlTm9kZTtcbiAgZmlyc3RVcGRhdGUgPSB0cnVlO1xuXG4gIGV2ZW50TmFtZXMgPSBPYmplY3Qua2V5cyhUUkVFX0VWRU5UUyk7XG5cbiAgc2V0RGF0YSh7IG5vZGVzLCBvcHRpb25zID0gbnVsbCwgZXZlbnRzID0gbnVsbCB9Ontub2Rlczphbnksb3B0aW9uczphbnksZXZlbnRzOmFueX0pIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5vcHRpb25zID0gbmV3IFRyZWVPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICB9XG4gICAgaWYgKG5vZGVzKSB7XG4gICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICAvLyBSZWJ1aWxkIHRyZWU6XG4gICAgbGV0IHZpcnR1YWxSb290Q29uZmlnID0ge1xuICAgICAgdmlydHVhbDogdHJ1ZSxcbiAgICAgIFt0aGlzLm9wdGlvbnMuY2hpbGRyZW5GaWVsZF06IHRoaXMubm9kZXNcbiAgICB9O1xuXG4gICAgdGhpcy52aXJ0dWFsUm9vdCA9IHRoaXMuZ2V0VHJlZU5vZGUodmlydHVhbFJvb3RDb25maWcsIG51bGwpO1xuXG4gICAgdGhpcy5yb290cyA9IHRoaXMudmlydHVhbFJvb3QuY2hpbGRyZW47XG5cbiAgICB0aGlzLl9pbml0VHJlZU5vZGVDb250ZW50Q29tcG9uZW50KCk7XG4gICAgdGhpcy5faW5pdExvYWRpbmdDb21wb25lbnQoKTtcblxuICAgIHRoaXMuX2xvYWRTdGF0ZSgpO1xuXG4gICAgLy8gRmlyZSBldmVudDpcbiAgICBpZiAodGhpcy5maXJzdFVwZGF0ZSkge1xuICAgICAgaWYgKHRoaXMucm9vdHMpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uSW5pdGlhbGl6ZWQgfSk7XG4gICAgICAgIHRoaXMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25VcGRhdGVEYXRhIH0pO1xuICAgIH1cbiAgfVxuXG4gIF9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKHN0YXJ0Tm9kZSA9IG51bGwpIHtcbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcblxuICAgIGlmIChzdGFydE5vZGUuZGF0YVt0aGlzLm9wdGlvbnMuaXNFeHBhbmRlZEZpZWxkXSkge1xuICAgICAgdGhpcy5leHBhbmRlZE5vZGVJZHNbc3RhcnROb2RlLmlkXSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChzdGFydE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIHN0YXJ0Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gdGhpcy5fY2FsY3VsYXRlRXhwYW5kZWROb2RlcyhjaGlsZCkpO1xuICAgIH1cbiAgfVxuXG4gIGZpcmVFdmVudChldmVudCkge1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50LmV2ZW50TmFtZV0uZW1pdChldmVudCk7XG4gICAgdGhpcy5ldmVudHMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuICAvLyBDT05URVhUIE1FTlUgTk9ERVxuICBwcml2YXRlIF9jb250ZXh0TWVudU5vZGU6IFRyZWVOb2RlID0gbnVsbDtcbiAgZ2V0IGNvbnRleHRNZW51Tm9kZSgpOiBUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHRNZW51Tm9kZVxuICB9XG4gIHNldCBjb250ZXh0TWVudU5vZGUobm9kZTogVHJlZU5vZGUpIHtcbiAgICB0aGlzLl9jb250ZXh0TWVudU5vZGUgPSBub2RlO1xuICB9XG5cbiAgZ2V0IGZvY3VzZWROb2RlKCkgeyBkZXByZWNhdGVkKCdmb2N1c2VkTm9kZSBhdHRyaWJ1dGUnLCAnZ2V0Rm9jdXNlZE5vZGUnKTsgcmV0dXJuIHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTsgfVxuICBzZXQgZm9jdXNlZE5vZGUodmFsdWUpIHsgZGVwcmVjYXRlZCgnZm9jdXNlZE5vZGUgPSAnLCAnc2V0Rm9jdXNlZE5vZGUnKTsgdGhpcy5zZXRGb2N1c2VkTm9kZSh2YWx1ZSkgfTtcblxuICBnZXRGb2N1c2VkTm9kZSgpOlRyZWVOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZE5vZGU7XG4gIH1cblxuICBzZXRGb2N1c2VkTm9kZShub2RlKSB7XG4gICAgdGhpcy5fZm9jdXNlZE5vZGUgPSBub2RlO1xuICAgIHRoaXMuZm9jdXNlZE5vZGVJZCA9IG5vZGUgPyBub2RlLmlkIDogbnVsbDtcbiAgfVxuXG4gIGdldEFjdGl2ZU5vZGUoKTpUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZXNbMF07XG4gIH1cblxuICBnZXRBY3RpdmVOb2RlcygpOlRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVzO1xuICB9XG5cbiAgZ2V0VHJlZU5vZGUobm9kZTphbnksIHBhcmVudDpUcmVlTm9kZSk6VHJlZU5vZGUge1xuICAgIHJldHVybiBuZXcgVHJlZU5vZGUobm9kZSwgcGFyZW50LCB0aGlzKTtcbiAgfVxuXG4gIGdldFZpc2libGVSb290cygpIHtcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsUm9vdC5nZXRWaXNpYmxlQ2hpbGRyZW4oKTtcbiAgfVxuXG4gIGdldEZpcnN0Um9vdChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmlyc3Qoc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzKTtcbiAgfVxuXG4gIGdldExhc3RSb290KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBsYXN0KHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVSb290cygpIDogdGhpcy5yb290cyk7XG4gIH1cblxuICBnZXQgaXNGb2N1c2VkKCkge1xuICAgIHJldHVybiBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPT09IHRoaXM7XG4gIH1cblxuICBpc05vZGVGb2N1c2VkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZE5vZGUgPT09IG5vZGU7XG4gIH1cblxuICBzZXRGb2N1cyh2YWx1ZSkge1xuICAgIFRyZWVNb2RlbC5mb2N1c2VkVHJlZSA9IHZhbHVlID8gdGhpcyA6IG51bGw7XG4gIH1cblxuXG4gIHByaXZhdGUgX3RyZWVOb2RlQ29udGVudENvbXBvbmVudDphbnk7XG4gIGdldCB0cmVlTm9kZUNvbnRlbnRDb21wb25lbnQoKSB7IHJldHVybiB0aGlzLl90cmVlTm9kZUNvbnRlbnRDb21wb25lbnQgfTtcblxuICBwcml2YXRlIF9sb2FkaW5nQ29tcG9uZW50OmFueTtcbiAgZ2V0IGxvYWRpbmdDb21wb25lbnQoKSB7IHJldHVybiB0aGlzLl9sb2FkaW5nQ29tcG9uZW50IH07XG5cbiAgLy8gaWYgdHJlZU5vZGVUZW1wbGF0ZSBpcyBhIGNvbXBvbmVudCAtIHVzZSBpdCxcbiAgLy8gb3RoZXJ3aXNlIC0gaXQncyBhIHRlbXBsYXRlLCBzbyB3cmFwIGl0IHdpdGggYW4gQWRIb2MgY29tcG9uZW50XG4gIF9pbml0VHJlZU5vZGVDb250ZW50Q29tcG9uZW50KCkge1xuICAgIHRoaXMuX3RyZWVOb2RlQ29udGVudENvbXBvbmVudCA9IHRoaXMub3B0aW9ucy50cmVlTm9kZVRlbXBsYXRlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5fdHJlZU5vZGVDb250ZW50Q29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fdHJlZU5vZGVDb250ZW50Q29tcG9uZW50ID0gdGhpcy5fY3JlYXRlQWRIb2NDb21wb25lbnQodGhpcy5fdHJlZU5vZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICAvLyBzYW1lIGZvciBsb2FkaW5nIGNvbXBvbmVudFxuICBfaW5pdExvYWRpbmdDb21wb25lbnQoKSB7XG4gICAgdGhpcy5fbG9hZGluZ0NvbXBvbmVudCA9IHRoaXMub3B0aW9ucy5sb2FkaW5nQ29tcG9uZW50O1xuICAgIGlmICh0eXBlb2YgdGhpcy5fbG9hZGluZ0NvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2xvYWRpbmdDb21wb25lbnQgPSB0aGlzLl9jcmVhdGVBZEhvY0NvbXBvbmVudCh0aGlzLl9sb2FkaW5nQ29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBfbG9hZFN0YXRlKCkge1xuICAgIGlmICh0aGlzLmZvY3VzZWROb2RlSWQpIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWROb2RlID0gdGhpcy5nZXROb2RlQnlJZCh0aGlzLmZvY3VzZWROb2RlSWQpO1xuICAgIH1cblxuICAgIHRoaXMuZXhwYW5kZWROb2RlcyA9IE9iamVjdC5rZXlzKHRoaXMuZXhwYW5kZWROb2RlSWRzKVxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuZXhwYW5kZWROb2RlSWRzW2lkXSlcbiAgICAgIC5tYXAoKGlkKSA9PiB0aGlzLmdldE5vZGVCeUlkKGlkKSlcbiAgICB0aGlzLmV4cGFuZGVkTm9kZXMgPSBjb21wYWN0KHRoaXMuZXhwYW5kZWROb2Rlcyk7XG5cbiAgICB0aGlzLmFjdGl2ZU5vZGVzID0gT2JqZWN0LmtleXModGhpcy5hY3RpdmVOb2RlSWRzKVxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuZXhwYW5kZWROb2RlSWRzW2lkXSlcbiAgICAgIC5tYXAoKGlkKSA9PiB0aGlzLmdldE5vZGVCeUlkKGlkKSlcbiAgICB0aGlzLmFjdGl2ZU5vZGVzID0gY29tcGFjdCh0aGlzLmFjdGl2ZU5vZGVzKTtcbiAgfVxuXG4gIGdldE5vZGVCeVBhdGgocGF0aCwgc3RhcnROb2RlPW51bGwpOlRyZWVOb2RlIHtcbiAgICBpZiAoIXBhdGgpIHJldHVybiBudWxsO1xuXG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gc3RhcnROb2RlO1xuXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgY2hpbGRJZCA9IHBhdGguc2hpZnQoKTtcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBmaW5kKHN0YXJ0Tm9kZS5jaGlsZHJlbiwgeyBbdGhpcy5vcHRpb25zLmlkRmllbGRdOiBjaGlsZElkIH0pO1xuXG4gICAgaWYgKCFjaGlsZE5vZGUpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5UGF0aChwYXRoLCBjaGlsZE5vZGUpXG4gIH1cblxuICBnZXROb2RlQnlJZChpZCkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVCeSh7IGlkIH0pO1xuICB9XG5cbiAgZ2V0Tm9kZUJ5KHByZWRpY2F0ZSwgc3RhcnROb2RlID0gbnVsbCkge1xuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgZm91bmQgPSBmaW5kKHN0YXJ0Tm9kZS5jaGlsZHJlbiwgcHJlZGljYXRlKTtcblxuICAgIGlmIChmb3VuZCkgeyAvLyBmb3VuZCBpbiBjaGlsZHJlblxuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH0gZWxzZSB7IC8vIGxvb2sgaW4gY2hpbGRyZW4ncyBjaGlsZHJlblxuICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc3RhcnROb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5nZXROb2RlQnkocHJlZGljYXRlLCBjaGlsZCk7XG4gICAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGZvdW5kO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVBZEhvY0NvbXBvbmVudCh0ZW1wbGF0ZVN0cik6IGFueSB7XG4gICAgXG4gICAgY2xhc3MgQWRIb2NUcmVlTm9kZVRlbXBsYXRlQ29tcG9uZW50IHtcbiAgICAgICAgIG5vZGU6IFRyZWVOb2RlO1xuICAgIHN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICAgICAgc2VsZWN0b3I6ICdUcmVlTm9kZVRlbXBsYXRlJyxcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlU3RyXG4gICAgfSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ25vZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xufVxuICAgIHJldHVybiBBZEhvY1RyZWVOb2RlVGVtcGxhdGVDb21wb25lbnQ7XG4gIH1cblxuICBmb2N1c05leHROb2RlKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmZpbmROZXh0Tm9kZSh0cnVlLCB0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xuICAgIG5leHROb2RlICYmIG5leHROb2RlLmZvY3VzKCk7XG4gIH1cblxuICBmb2N1c1ByZXZpb3VzTm9kZSgpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZSA/IHByZXZpb3VzTm9kZS5maW5kUHJldmlvdXNOb2RlKHRydWUpIDogdGhpcy5nZXRMYXN0Um9vdCh0cnVlKTtcbiAgICBuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5mb2N1cygpO1xuICB9XG5cbiAgZm9jdXNEcmlsbERvd24oKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBpZiAocHJldmlvdXNOb2RlICYmIHByZXZpb3VzTm9kZS5pc0NvbGxhcHNlZCAmJiBwcmV2aW91c05vZGUuaGFzQ2hpbGRyZW4pIHtcbiAgICAgIHByZXZpb3VzTm9kZS50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZSA/IHByZXZpb3VzTm9kZS5nZXRGaXJzdENoaWxkKHRydWUpIDogdGhpcy5nZXRGaXJzdFJvb3QodHJ1ZSk7XG4gICAgICBuZXh0Tm9kZSAmJiBuZXh0Tm9kZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzRHJpbGxVcCgpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGlmICghcHJldmlvdXNOb2RlKSByZXR1cm47XG4gICAgaWYgKHByZXZpb3VzTm9kZS5pc0V4cGFuZGVkKSB7XG4gICAgICBwcmV2aW91c05vZGUudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUucmVhbFBhcmVudDtcbiAgICAgIG5leHROb2RlICYmIG5leHROb2RlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaXNBY3RpdmUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVJZHNbbm9kZS5pZF07XG4gIH1cblxuICBzZXRBY3RpdmVOb2RlKG5vZGUsIHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBub2RlLmZvY3VzKCk7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25BY3RpdmF0ZSwgbm9kZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uRGVhY3RpdmF0ZSwgbm9kZSB9KTtcbiAgICB9XG5cbiAgICBpZiAobXVsdGkpIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5fc2V0QWN0aXZlTm9kZVNpbmdsZShub2RlLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpIHtcbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBvdGhlciBub2RlczpcbiAgICB0aGlzLmFjdGl2ZU5vZGVzXG4gICAgICAuZmlsdGVyKChhY3RpdmVOb2RlKSA9PiBhY3RpdmVOb2RlICE9IG5vZGUpXG4gICAgICAuZm9yRWFjaCgoYWN0aXZlTm9kZSkgPT4ge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25EZWFjdGl2YXRlLCBub2RlOiBhY3RpdmVOb2RlIH0pO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7fTtcbiAgICB0aGlzLmFjdGl2ZU5vZGVzID0gW107XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmFjdGl2ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHNbbm9kZS5pZF0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRBY3RpdmVOb2RlTXVsdGkobm9kZSwgdmFsdWUpIHtcbiAgICB0aGlzLmFjdGl2ZU5vZGVJZHNbbm9kZS5pZF0gPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmICghaW5jbHVkZXModGhpcy5hY3RpdmVOb2Rlcywgbm9kZSkpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaW5jbHVkZXModGhpcy5hY3RpdmVOb2Rlcywgbm9kZSkpIHtcbiAgICAgICAgcmVtb3ZlKHRoaXMuYWN0aXZlTm9kZXMsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzRXhwYW5kZWQobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmV4cGFuZGVkTm9kZUlkc1tub2RlLmlkXTtcbiAgfVxuXG4gIHNldEV4cGFuZGVkTm9kZShub2RlLCB2YWx1ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gaW5kZXhPZih0aGlzLmV4cGFuZGVkTm9kZXMsIG5vZGUpO1xuXG4gICAgaWYgKHZhbHVlICYmICFpbmRleCkgdGhpcy5leHBhbmRlZE5vZGVzLnB1c2gobm9kZSk7XG4gICAgZWxzZSBpZiAoaW5kZXgpIHB1bGxBdCh0aGlzLmV4cGFuZGVkTm9kZXMsIGluZGV4KTtcblxuICAgIHRoaXMuZXhwYW5kZWROb2RlSWRzW25vZGUuaWRdID0gdmFsdWU7XG4gIH1cblxuICBwZXJmb3JtS2V5QWN0aW9uKG5vZGUsICRldmVudCkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMub3B0aW9ucy5hY3Rpb25NYXBwaW5nLmtleXNbJGV2ZW50LmtleUNvZGVdXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBhY3Rpb24odGhpcywgbm9kZSwgJGV2ZW50KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyTm9kZXMoZmlsdGVyLCBhdXRvU2hvdyA9IGZhbHNlKSB7XG4gICAgbGV0IGZpbHRlckZuO1xuXG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNsZWFyRmlsdGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICAgIGZpbHRlckZuID0gKG5vZGUpID0+IG5vZGUuZGlzcGxheUZpZWxkLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgIT0gLTFcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgICAgZmlsdGVyRm4gPSBmaWx0ZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignRG9uXFwndCBrbm93IHdoYXQgdG8gZG8gd2l0aCBmaWx0ZXInLCBmaWx0ZXIpO1xuICAgICAgY29uc29sZS5lcnJvcignU2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBmdW5jdGlvbicsIGZpbHRlcik7XG4gICAgfVxuICAgIHRoaXMucm9vdHMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5maWx0ZXIoZmlsdGVyRm4sIGF1dG9TaG93KSk7XG4gIH1cblxuICBjbGVhckZpbHRlcigpIHtcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKG5vZGUpID0+IG5vZGUuY2xlYXJGaWx0ZXIoKSk7XG4gIH1cblxuICBwcml2YXRlIF9jYW5Nb3ZlTm9kZShub2RlLCBmcm9tSW5kZXgsIHRvKSB7XG4gICAgLy8gc2FtZSBub2RlOlxuICAgIGlmIChub2RlLnBhcmVudCA9PT0gdG8ucGFyZW50ICYmIGZyb21JbmRleCA9PT0gdG8uaW5kZXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCEodGhpcy5vcHRpb25zLmFsbG93Rm9sZGVyRnJvbU5vZGUgfHwgdG8ucGFyZW50LmlzRm9sZGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlYWRPbmx5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICF0by5wYXJlbnQuaXNEZXNjZW5kYW50T2Yobm9kZSk7XG4gIH1cbiAgYWRkTm9kZSAobmFtZTogc3RyaW5nLCBpblBhcmVudDogVHJlZU5vZGUpIHtcblxuICB9XG4gIGFkZEZvbGRlciAobmFtZTogc3RyaW5nLCBub2RlOiBUcmVlTm9kZSkge1xuICAgIGxldCBwYXJlbnROb2RlID0gdGhpcy52aXJ0dWFsUm9vdDtcbiAgICBpZiAobm9kZSAmJiBub2RlLmlzRm9sZGVyKSB7XG4gICAgICBwYXJlbnROb2RlID0gbm9kZTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgaWYgKCFwYXJlbnROb2RlLmRhdGEuY2hpbGRyZW4pIHtcbiAgICAgIHBhcmVudE5vZGUuZGF0YS5jaGlsZHJlbiA9IFtdO1xuICAgIH1cbiAgICBwYXJlbnROb2RlLmRhdGEuY2hpbGRyZW4ucHVzaCh7XG4gICAgICAnbmFtZScgOiBuYW1lLFxuICAgICAgJ2ZvbGRlcicgOiB0cnVlXG4gICAgfSlcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG4gIG1vdmVOb2RlKG5vZGUsIHRvKSB7XG4gICAgY29uc3QgZnJvbUluZGV4ID0gbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XG4gICAgY29uc3QgZnJvbVBhcmVudCA9IG5vZGUucGFyZW50O1xuXG4gICAgaWYgKCF0aGlzLl9jYW5Nb3ZlTm9kZShub2RlLCBmcm9tSW5kZXggLCB0bykpIHJldHVybjtcblxuICAgIGNvbnN0IGZyb21DaGlsZHJlbiA9IGZyb21QYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJyk7XG5cbiAgICAvLyBJZiBub2RlIGRvZXNuJ3QgaGF2ZSBjaGlsZHJlbiAtIGNyZWF0ZSBjaGlsZHJlbiBhcnJheVxuICAgIGlmICghdG8ucGFyZW50LmdldEZpZWxkKCdjaGlsZHJlbicpKSB7XG4gICAgICB0by5wYXJlbnQuc2V0RmllbGQoJ2NoaWxkcmVuJywgW10pO1xuICAgIH1cbiAgICBjb25zdCB0b0NoaWxkcmVuID0gdG8ucGFyZW50LmdldEZpZWxkKCdjaGlsZHJlbicpO1xuXG4gICAgY29uc3Qgb3JpZ2luYWxOb2RlID0gZnJvbUNoaWxkcmVuLnNwbGljZShmcm9tSW5kZXgsIDEpWzBdO1xuXG4gICAgLy8gQ29tcGVuc2F0ZSBmb3IgaW5kZXggaWYgYWxyZWFkeSByZW1vdmVkIGZyb20gcGFyZW50OlxuICAgIGxldCB0b0luZGV4ID0gKGZyb21QYXJlbnQgPT09IHRvLnBhcmVudCAmJiB0by5pbmRleCA+IGZyb21JbmRleCkgPyB0by5pbmRleCAtIDEgOiB0by5pbmRleDtcblxuICAgIHRvQ2hpbGRyZW4uc3BsaWNlKHRvSW5kZXgsIDAsIG9yaWdpbmFsTm9kZSk7XG5cbiAgICBmcm9tUGFyZW50LnRyZWVNb2RlbC51cGRhdGUoKTtcbiAgICBpZiAodG8ucGFyZW50LnRyZWVNb2RlbCAhPT0gZnJvbVBhcmVudC50cmVlTW9kZWwpIHtcbiAgICAgIHRvLnBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uTW92ZU5vZGUsIG5vZGU6IG9yaWdpbmFsTm9kZSwgdG86IHsgcGFyZW50OiB0by5wYXJlbnQuZGF0YSwgaW5kZXg6IHRvSW5kZXggfSB9KTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbl07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==