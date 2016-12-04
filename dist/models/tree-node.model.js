"use strict";
var events_1 = require('../constants/events');
var deprecated_1 = require('../deprecated');
var _ = require('lodash');
var TreeNode = (function () {
    function TreeNode(data, parent, treeModel) {
        this.data = data;
        this.parent = parent;
        this.treeModel = treeModel;
        // FOLDER FLAG
        this._isFolder = false;
        // OPEN CONTEXT FLAG
        this._openContext = false;
        this.id = this.id || uuid(); // Make sure there's a unique ID
        this.level = this.parent ? this.parent.level + 1 : 0;
        this.path = this.parent ? this.parent.path.concat([this.id]) : [];
        if (this.getField('children')) {
            this._initChildren();
        }
        // CHECK for children
        if (this.data['folder']) {
            this._isFolder = true;
        }
    }
    Object.defineProperty(TreeNode.prototype, "isHidden", {
        get: function () { return this.getField('isHidden'); },
        set: function (value) { this.setField('isHidden', value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TreeNode.prototype, "isExpanded", {
        get: function () { return this.treeModel.isExpanded(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isActive", {
        get: function () { return this.treeModel.isActive(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "isFocused", {
        get: function () { return this.treeModel.isNodeFocused(this); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "originalNode", {
        get: function () { return this._originalNode; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeNode.prototype, "openContext", {
        get: function () {
            return this._openContext;
        },
        set: function (value) {
            this._openContext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "hasChildren", {
        // helper get functions:
        get: function () {
            return !!(this.data.hasChildren || (this.children && this.children.length > 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isCollapsed", {
        get: function () { return !this.isExpanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isLeaf", {
        get: function () { return !this.hasChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isRoot", {
        get: function () { return this.parent.data.virtual; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "realParent", {
        get: function () { return this.isRoot ? null : this.parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "options", {
        // proxy functions:
        get: function () { return this.treeModel.options; },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.fireEvent = function (event) { this.treeModel.fireEvent(event); };
    Object.defineProperty(TreeNode.prototype, "context", {
        get: function () { return this.options.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "displayField", {
        // field accessors:
        get: function () {
            return this.getField('display');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "id", {
        get: function () {
            return this.getField('id');
        },
        set: function (value) {
            this.setField('id', value);
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.getField = function (key) {
        return this.data[this.options[(key + "Field")]];
    };
    TreeNode.prototype.setField = function (key, value) {
        this.data[this.options[(key + "Field")]] = value;
    };
    Object.defineProperty(TreeNode.prototype, "isFolder", {
        get: function () {
            return this._isFolder || this.hasChildren;
        },
        enumerable: true,
        configurable: true
    });
    // traversing:
    TreeNode.prototype._findAdjacentSibling = function (steps, skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var index = this.getIndexInParent(skipHidden);
        return this._getParentsChildren(skipHidden)[index + steps];
    };
    TreeNode.prototype.findNextSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(+1, skipHidden);
    };
    TreeNode.prototype.findPreviousSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(-1, skipHidden);
    };
    TreeNode.prototype.getVisibleChildren = function () {
        return (this.children || []).filter(function (node) { return !node.isHidden; });
    };
    TreeNode.prototype.getFirstChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.getVisibleChildren() : this.children;
        return _.first(children || []);
    };
    TreeNode.prototype.getLastChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.getVisibleChildren() : this.children;
        return _.last(children || []);
    };
    TreeNode.prototype.findNextNode = function (goInside, skipHidden) {
        if (goInside === void 0) { goInside = true; }
        if (skipHidden === void 0) { skipHidden = false; }
        return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
            this.findNextSibling(skipHidden) ||
            this.parent && this.parent.findNextNode(false, skipHidden);
    };
    TreeNode.prototype.findPreviousNode = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var previousSibling = this.findPreviousSibling(skipHidden);
        if (!previousSibling) {
            return this.realParent;
        }
        return previousSibling._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getLastOpenDescendant = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var lastChild = this.getLastChild(skipHidden);
        return (this.isCollapsed || !lastChild)
            ? this
            : lastChild._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getParentsChildren = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = this.parent &&
            (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
        return children || [];
    };
    TreeNode.prototype.getIndexInParent = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._getParentsChildren(skipHidden).indexOf(this);
    };
    TreeNode.prototype.isDescendantOf = function (node) {
        if (this === node)
            return true;
        else
            return this.parent && this.parent.isDescendantOf(node);
    };
    // helper methods:
    TreeNode.prototype.loadChildren = function () {
        var _this = this;
        if (!this.options.getChildren) {
            throw new Error('Node doesn\'t have children, or a getChildren method');
        }
        Promise.resolve(this.options.getChildren(this))
            .then(function (children) {
            if (children) {
                _this.setField('children', children);
                _this._initChildren();
                _this.children.forEach(function (child) {
                    if (child.getField('isExpanded') && child.hasChildren) {
                        child.expand();
                    }
                });
            }
        });
    };
    TreeNode.prototype.expand = function () {
        if (!this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    };
    TreeNode.prototype.collapse = function () {
        if (this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    };
    TreeNode.prototype.ensureVisible = function () {
        if (this.realParent) {
            this.realParent.expand();
            this.realParent.ensureVisible();
        }
        return this;
    };
    TreeNode.prototype.toggle = function () {
        deprecated_1.deprecated('toggle', 'toggleExpanded');
        return this.toggleExpanded();
    };
    TreeNode.prototype.toggleExpanded = function () {
        this.setIsExpanded(!this.isExpanded);
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onToggle, warning: 'this event is deprecated, please use onToggleExpanded instead', node: this, isExpanded: this.isExpanded });
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onToggleExpanded, node: this, isExpanded: this.isExpanded });
        return this;
    };
    TreeNode.prototype.setIsExpanded = function (value) {
        this.treeModel.setExpandedNode(this, value);
        if (!this.children && this.hasChildren && value) {
            this.loadChildren();
        }
        return this;
    };
    ;
    TreeNode.prototype.setIsActive = function (value, multi) {
        if (multi === void 0) { multi = false; }
        this.treeModel.setActiveNode(this, value, multi);
        if (value) {
            this.focus();
        }
        return this;
    };
    TreeNode.prototype.toggleActivated = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(!this.isActive, multi);
        return this;
    };
    TreeNode.prototype.setActiveAndVisible = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(true, multi)
            .ensureVisible();
        setTimeout(this.scrollIntoView.bind(this));
        return this;
    };
    TreeNode.prototype.scrollIntoView = function () {
        if (this.elementRef) {
            var nativeElement = this.elementRef.nativeElement;
            nativeElement.scrollIntoViewIfNeeded && nativeElement.scrollIntoViewIfNeeded();
            return this;
        }
    };
    TreeNode.prototype.focus = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(this);
        this.scrollIntoView();
        if (previousNode) {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onBlur, node: previousNode });
        }
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onFocus, node: this });
        return this;
    };
    TreeNode.prototype.blur = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(null);
        if (previousNode) {
            this.fireEvent({ eventName: events_1.TREE_EVENTS.onBlur, node: this });
        }
        return this;
    };
    TreeNode.prototype.filter = function (filterFn, autoShow) {
        if (autoShow === void 0) { autoShow = false; }
        var isVisible = filterFn(this);
        if (this.children) {
            this.children.forEach(function (child) {
                child.filter(filterFn, autoShow);
                isVisible = isVisible || !child.isHidden;
            });
        }
        this.isHidden = !isVisible;
        if (autoShow) {
            this.ensureVisible();
        }
    };
    TreeNode.prototype.clearFilter = function () {
        this.isHidden = false;
        if (this.children)
            this.children.forEach(function (child) { return child.clearFilter(); });
    };
    TreeNode.prototype.allowDrag = function () {
        return this.options.allowDrag;
    };
    // TOGGLE CONTEXT
    TreeNode.prototype.toggleContext = function ($event) {
        $event.preventDefault();
        if (this.treeModel.contextMenuNode && (this.treeModel.contextMenuNode.id != this.id)) {
            this.treeModel.contextMenuNode.openContext = false;
        }
        this.treeModel.contextMenuNode = this;
        this._openContext = !this._openContext;
        // reset context of previous, show this context
    };
    // RENAME
    TreeNode.prototype.rename = function (newName) {
        this.data.name = newName;
    };
    TreeNode.prototype.mouseAction = function (actionName, $event, data) {
        if (data === void 0) { data = null; }
        this.treeModel.setFocus(true);
        var actionMapping = this.options.actionMapping.mouse;
        var action = actionMapping[actionName];
        if (action) {
            action(this.treeModel, this, $event, data);
            // TODO: remove after deprecation of context menu and dbl click
            if (actionName === 'contextMenu') {
                this.fireEvent({ eventName: events_1.TREE_EVENTS.onContextMenu, node: this, rawEvent: $event });
            }
            if (actionName === 'dblClick') {
                this.fireEvent({ eventName: events_1.TREE_EVENTS.onDoubleClick, warning: 'This event is deprecated, please use actionMapping to handle double clicks', node: this, rawEvent: $event });
            }
        }
    };
    TreeNode.prototype._initChildren = function () {
        var _this = this;
        this.children = this.getField('children')
            .map(function (c) { return new TreeNode(c, _this, _this.treeModel); });
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW5vZGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLHVCQUE0QixxQkFBcUIsQ0FBQyxDQUFBO0FBQ2xELDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1QjtJQTBCRSxrQkFBbUIsSUFBUSxFQUFTLE1BQWUsRUFBUyxTQUFtQjtRQUE1RCxTQUFJLEdBQUosSUFBSSxDQUFJO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFaOUUsY0FBYztRQUNQLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDbkMsb0JBQW9CO1FBQ1osaUJBQVksR0FBWSxLQUFLLENBQUM7UUFVcEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsZ0NBQWdDO1FBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBRSxJQUFJLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ0QscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FB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RUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2hMLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFBQSxpQkFHQztRQUZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7YUFDdEMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUksRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUF6VUQsSUF5VUM7QUF6VVksZ0JBQVEsV0F5VXBCLENBQUE7QUFFRDtJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztBQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgSVRyZWVOb2RlIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICcuLi9kZXByZWNhdGVkJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGUgaW1wbGVtZW50cyBJVHJlZU5vZGUge1xuICBnZXQgaXNIaWRkZW4oKSB7IHJldHVybiB0aGlzLmdldEZpZWxkKCdpc0hpZGRlbicpIH07XG4gIHNldCBpc0hpZGRlbih2YWx1ZSkgeyB0aGlzLnNldEZpZWxkKCdpc0hpZGRlbicsIHZhbHVlKSB9O1xuICBnZXQgaXNFeHBhbmRlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzRXhwYW5kZWQodGhpcykgfTtcbiAgZ2V0IGlzQWN0aXZlKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNBY3RpdmUodGhpcykgfTtcbiAgZ2V0IGlzRm9jdXNlZCgpIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzTm9kZUZvY3VzZWQodGhpcykgfTtcblxuICBsZXZlbDogbnVtYmVyO1xuICBwYXRoOiBzdHJpbmdbXTtcbiAgZWxlbWVudFJlZjpFbGVtZW50UmVmO1xuICBjaGlsZHJlbjogVHJlZU5vZGVbXTtcblxuICBwcml2YXRlIF9vcmlnaW5hbE5vZGU6IGFueTtcbiAgZ2V0IG9yaWdpbmFsTm9kZSgpIHsgcmV0dXJuIHRoaXMuX29yaWdpbmFsTm9kZSB9O1xuICAgLy8gRk9MREVSIEZMQUdcbiAgcHJpdmF0ZSBfaXNGb2xkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gT1BFTiBDT05URVhUIEZMQUdcbiAgcHJpdmF0ZSBfb3BlbkNvbnRleHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IG9wZW5Db250ZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuQ29udGV4dDtcbiAgfVxuICBzZXQgb3BlbkNvbnRleHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9vcGVuQ29udGV4dCA9IHZhbHVlO1xuICB9XG5cbiBcbiAgY29uc3RydWN0b3IocHVibGljIGRhdGE6YW55LCBwdWJsaWMgcGFyZW50OlRyZWVOb2RlLCBwdWJsaWMgdHJlZU1vZGVsOlRyZWVNb2RlbCkge1xuICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IHV1aWQoKTsgLy8gTWFrZSBzdXJlIHRoZXJlJ3MgYSB1bmlxdWUgSURcbiAgICB0aGlzLmxldmVsID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5sZXZlbCArIDEgOiAwO1xuICAgIHRoaXMucGF0aCA9IHRoaXMucGFyZW50ID8gWy4uLnRoaXMucGFyZW50LnBhdGgsIHRoaXMuaWRdIDogW107XG5cbiAgICBpZiAodGhpcy5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdGhpcy5faW5pdENoaWxkcmVuKCk7XG4gICAgfVxuICAgIC8vIENIRUNLIGZvciBjaGlsZHJlblxuICAgIGlmICh0aGlzLmRhdGFbJ2ZvbGRlciddKSB7XG4gICAgICB0aGlzLl9pc0ZvbGRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gaGVscGVyIGdldCBmdW5jdGlvbnM6XG4gIGdldCBoYXNDaGlsZHJlbigpOmJvb2xlYW4ge1xuICAgIHJldHVybiAhISh0aGlzLmRhdGEuaGFzQ2hpbGRyZW4gfHwgKHRoaXMuY2hpbGRyZW4gJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSk7XG4gIH1cbiAgZ2V0IGlzQ29sbGFwc2VkKCk6Ym9vbGVhbiB7IHJldHVybiAhdGhpcy5pc0V4cGFuZGVkIH1cbiAgZ2V0IGlzTGVhZigpOmJvb2xlYW4geyByZXR1cm4gIXRoaXMuaGFzQ2hpbGRyZW4gfVxuICBnZXQgaXNSb290KCk6Ym9vbGVhbiB7IHJldHVybiB0aGlzLnBhcmVudC5kYXRhLnZpcnR1YWwgfVxuICBnZXQgcmVhbFBhcmVudCgpOlRyZWVOb2RlIHsgcmV0dXJuIHRoaXMuaXNSb290ID8gbnVsbCA6IHRoaXMucGFyZW50IH1cblxuICAvLyBwcm94eSBmdW5jdGlvbnM6XG4gIGdldCBvcHRpb25zKCk6IFRyZWVPcHRpb25zIHsgcmV0dXJuIHRoaXMudHJlZU1vZGVsLm9wdGlvbnMgfVxuICBmaXJlRXZlbnQoZXZlbnQpIHsgdGhpcy50cmVlTW9kZWwuZmlyZUV2ZW50KGV2ZW50KSB9XG4gIGdldCBjb250ZXh0KCk6YW55IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5jb250ZXh0IH1cblxuICAvLyBmaWVsZCBhY2Nlc3NvcnM6XG4gIGdldCBkaXNwbGF5RmllbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RmllbGQoJ2Rpc3BsYXknKTtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGaWVsZCgnaWQnKTtcbiAgfVxuXG4gIHNldCBpZCh2YWx1ZSkge1xuICAgIHRoaXMuc2V0RmllbGQoJ2lkJywgdmFsdWUpO1xuICB9XG5cbiAgZ2V0RmllbGQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVt0aGlzLm9wdGlvbnNbYCR7a2V5fUZpZWxkYF1dO1xuICB9XG5cbiAgc2V0RmllbGQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMuZGF0YVt0aGlzLm9wdGlvbnNbYCR7a2V5fUZpZWxkYF1dID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGlzRm9sZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0ZvbGRlciB8fCB0aGlzLmhhc0NoaWxkcmVuO1xuICB9XG5cbiAgLy8gdHJhdmVyc2luZzpcbiAgX2ZpbmRBZGphY2VudFNpYmxpbmcoc3RlcHMsIHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleEluUGFyZW50KHNraXBIaWRkZW4pO1xuICAgIHJldHVybiB0aGlzLl9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbilbaW5kZXggKyBzdGVwc107XG4gIH1cblxuICBmaW5kTmV4dFNpYmxpbmcoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmRBZGphY2VudFNpYmxpbmcoKzEsIHNraXBIaWRkZW4pO1xuICB9XG5cbiAgZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZmluZEFkamFjZW50U2libGluZygtMSwgc2tpcEhpZGRlbik7XG4gIH1cblxuICBnZXRWaXNpYmxlQ2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuICh0aGlzLmNoaWxkcmVuIHx8IFtdKS5maWx0ZXIoKG5vZGUpID0+ICFub2RlLmlzSGlkZGVuKTtcbiAgfVxuXG4gIGdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVuKCkgOiB0aGlzLmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIF8uZmlyc3QoY2hpbGRyZW4gfHwgW10pO1xuICB9XG5cbiAgZ2V0TGFzdENoaWxkKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGxldCBjaGlsZHJlbiA9IHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVDaGlsZHJlbigpIDogdGhpcy5jaGlsZHJlbjtcblxuICAgIHJldHVybiBfLmxhc3QoY2hpbGRyZW4gfHwgW10pO1xuICB9XG5cbiAgZmluZE5leHROb2RlKGdvSW5zaWRlID0gdHJ1ZSwgc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIGdvSW5zaWRlICYmIHRoaXMuaXNFeHBhbmRlZCAmJiB0aGlzLmdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbikgfHxcbiAgICAgICAgICAgdGhpcy5maW5kTmV4dFNpYmxpbmcoc2tpcEhpZGRlbikgfHxcbiAgICAgICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZmluZE5leHROb2RlKGZhbHNlLCBza2lwSGlkZGVuKTtcbiAgfVxuXG4gIGZpbmRQcmV2aW91c05vZGUoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IHByZXZpb3VzU2libGluZyA9IHRoaXMuZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuKTtcbiAgICBpZiAoIXByZXZpb3VzU2libGluZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVhbFBhcmVudFxuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XG4gIH1cblxuICBfZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGxhc3RDaGlsZCA9IHRoaXMuZ2V0TGFzdENoaWxkKHNraXBIaWRkZW4pO1xuICAgIHJldHVybiAodGhpcy5pc0NvbGxhcHNlZCB8fCAhbGFzdENoaWxkKVxuICAgICAgPyB0aGlzXG4gICAgICA6IGxhc3RDaGlsZC5fZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UGFyZW50c0NoaWxkcmVuKHNraXBIaWRkZW4gPSBmYWxzZSk6YW55W10ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5wYXJlbnQgJiZcbiAgICAgIChza2lwSGlkZGVuID8gdGhpcy5wYXJlbnQuZ2V0VmlzaWJsZUNoaWxkcmVuKCkgOiB0aGlzLnBhcmVudC5jaGlsZHJlbik7XG5cbiAgICByZXR1cm4gY2hpbGRyZW4gfHwgW107XG4gIH1cblxuICBwcml2YXRlIGdldEluZGV4SW5QYXJlbnQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFBhcmVudHNDaGlsZHJlbihza2lwSGlkZGVuKS5pbmRleE9mKHRoaXMpO1xuICB9XG5cbiAgaXNEZXNjZW5kYW50T2Yobm9kZTpUcmVlTm9kZSkge1xuICAgIGlmICh0aGlzID09PSBub2RlKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5pc0Rlc2NlbmRhbnRPZihub2RlKTtcbiAgfVxuXG4gIC8vIGhlbHBlciBtZXRob2RzOlxuICBsb2FkQ2hpbGRyZW4oKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2V0Q2hpbGRyZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSBkb2VzblxcJ3QgaGF2ZSBjaGlsZHJlbiwgb3IgYSBnZXRDaGlsZHJlbiBtZXRob2QnKTtcbiAgICB9XG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbih0aGlzKSlcbiAgICAgIC50aGVuKChjaGlsZHJlbikgPT4ge1xuICAgICAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICB0aGlzLnNldEZpZWxkKCdjaGlsZHJlbicsIGNoaWxkcmVuKTtcbiAgICAgICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuZ2V0RmllbGQoJ2lzRXhwYW5kZWQnKSAmJiBjaGlsZC5oYXNDaGlsZHJlbikge1xuICAgICAgICAgICAgICBjaGlsZC5leHBhbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICBpZiAoIXRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgdGhpcy50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgdGhpcy50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZW5zdXJlVmlzaWJsZSgpIHtcbiAgICBpZiAodGhpcy5yZWFsUGFyZW50KSB7XG4gICAgICB0aGlzLnJlYWxQYXJlbnQuZXhwYW5kKCk7XG4gICAgICB0aGlzLnJlYWxQYXJlbnQuZW5zdXJlVmlzaWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGRlcHJlY2F0ZWQoJ3RvZ2dsZScsICd0b2dnbGVFeHBhbmRlZCcpO1xuICAgIHJldHVybiB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XG4gIH1cblxuICB0b2dnbGVFeHBhbmRlZCgpIHtcbiAgICB0aGlzLnNldElzRXhwYW5kZWQoIXRoaXMuaXNFeHBhbmRlZCk7XG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uVG9nZ2xlLCB3YXJuaW5nOiAndGhpcyBldmVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIG9uVG9nZ2xlRXhwYW5kZWQgaW5zdGVhZCcsIG5vZGU6IHRoaXMsIGlzRXhwYW5kZWQ6IHRoaXMuaXNFeHBhbmRlZCB9KTtcbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Ub2dnbGVFeHBhbmRlZCwgbm9kZTogdGhpcywgaXNFeHBhbmRlZDogdGhpcy5pc0V4cGFuZGVkIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRJc0V4cGFuZGVkKHZhbHVlKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0RXhwYW5kZWROb2RlKHRoaXMsIHZhbHVlKTtcblxuICAgIGlmICghdGhpcy5jaGlsZHJlbiAmJiB0aGlzLmhhc0NoaWxkcmVuICYmIHZhbHVlKSB7XG4gICAgICB0aGlzLmxvYWRDaGlsZHJlbigpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHNldElzQWN0aXZlKHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0QWN0aXZlTm9kZSh0aGlzLCB2YWx1ZSwgbXVsdGkpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9nZ2xlQWN0aXZhdGVkKG11bHRpID0gZmFsc2UpIHtcbiAgICB0aGlzLnNldElzQWN0aXZlKCF0aGlzLmlzQWN0aXZlLCBtdWx0aSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldEFjdGl2ZUFuZFZpc2libGUobXVsdGkgPSBmYWxzZSkge1xuICAgIHRoaXMuc2V0SXNBY3RpdmUodHJ1ZSwgbXVsdGkpXG4gICAgICAuZW5zdXJlVmlzaWJsZSgpO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLnNjcm9sbEludG9WaWV3LmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY3JvbGxJbnRvVmlldygpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50UmVmKSB7XG4gICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBuYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3SWZOZWVkZWQgJiYgbmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKHRoaXMpO1xuICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICBpZiAocHJldmlvdXNOb2RlKSB7XG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25CbHVyLCBub2RlOiBwcmV2aW91c05vZGUgfSk7XG4gICAgfVxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkZvY3VzLCBub2RlOiB0aGlzIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBibHVyKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKG51bGwpO1xuICAgIGlmIChwcmV2aW91c05vZGUpIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkJsdXIsIG5vZGU6IHRoaXMgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaWx0ZXIoZmlsdGVyRm4sIGF1dG9TaG93ID0gZmFsc2UpIHtcbiAgICBsZXQgaXNWaXNpYmxlID0gZmlsdGVyRm4odGhpcyk7XG5cbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBjaGlsZC5maWx0ZXIoZmlsdGVyRm4sIGF1dG9TaG93KTtcbiAgICAgICAgaXNWaXNpYmxlID0gaXNWaXNpYmxlIHx8ICFjaGlsZC5pc0hpZGRlbjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaXNIaWRkZW4gPSAhaXNWaXNpYmxlO1xuICAgIGlmIChhdXRvU2hvdykge1xuICAgICAgdGhpcy5lbnN1cmVWaXNpYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgdGhpcy5pc0hpZGRlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNoaWxkcmVuKSB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5jbGVhckZpbHRlcigpKTtcbiAgfVxuXG4gIGFsbG93RHJhZygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJhZztcbiAgfVxuICAvLyBUT0dHTEUgQ09OVEVYVFxuICB0b2dnbGVDb250ZXh0KCRldmVudCkge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLnRyZWVNb2RlbC5jb250ZXh0TWVudU5vZGUgJiYgKHRoaXMudHJlZU1vZGVsLmNvbnRleHRNZW51Tm9kZS5pZCAhPSB0aGlzLmlkKSkge1xuICAgICAgdGhpcy50cmVlTW9kZWwuY29udGV4dE1lbnVOb2RlLm9wZW5Db250ZXh0ID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMudHJlZU1vZGVsLmNvbnRleHRNZW51Tm9kZSA9IHRoaXM7XG4gICAgdGhpcy5fb3BlbkNvbnRleHQgPSAhdGhpcy5fb3BlbkNvbnRleHQ7XG4gICAgLy8gcmVzZXQgY29udGV4dCBvZiBwcmV2aW91cywgc2hvdyB0aGlzIGNvbnRleHRcbiAgfVxuICAvLyBSRU5BTUVcbiAgcmVuYW1lKG5ld05hbWU6IHN0cmluZykge1xuICAgIHRoaXMuZGF0YS5uYW1lID0gbmV3TmFtZTtcbiAgfVxuICBtb3VzZUFjdGlvbihhY3Rpb25OYW1lOnN0cmluZywgJGV2ZW50LCBkYXRhOmFueSA9IG51bGwpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh0cnVlKTtcblxuICAgIGNvbnN0IGFjdGlvbk1hcHBpbmcgPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5tb3VzZTtcbiAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25NYXBwaW5nW2FjdGlvbk5hbWVdO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgYWN0aW9uKHRoaXMudHJlZU1vZGVsLCB0aGlzLCAkZXZlbnQsIGRhdGEpO1xuXG4gICAgICAvLyBUT0RPOiByZW1vdmUgYWZ0ZXIgZGVwcmVjYXRpb24gb2YgY29udGV4dCBtZW51IGFuZCBkYmwgY2xpY2tcbiAgICAgIGlmIChhY3Rpb25OYW1lID09PSAnY29udGV4dE1lbnUnKSB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkNvbnRleHRNZW51LCBub2RlOiB0aGlzLCByYXdFdmVudDogJGV2ZW50IH0pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbk5hbWUgPT09ICdkYmxDbGljaycpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uRG91YmxlQ2xpY2ssIHdhcm5pbmc6ICdUaGlzIGV2ZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYWN0aW9uTWFwcGluZyB0byBoYW5kbGUgZG91YmxlIGNsaWNrcycsIG5vZGU6IHRoaXMsIHJhd0V2ZW50OiAkZXZlbnQgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2luaXRDaGlsZHJlbigpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5nZXRGaWVsZCgnY2hpbGRyZW4nKVxuICAgICAgLm1hcChjID0+IG5ldyBUcmVlTm9kZShjLCB0aGlzLCB0aGlzLnRyZWVNb2RlbCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHV1aWQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDAwMCk7XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==