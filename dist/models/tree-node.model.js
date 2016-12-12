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
        if (this.treeModel.contextMenuNode &&
            (this.id !== this.treeModel.contextMenuNode.id)) {
            this.treeModel.contextMenuNode.openContext = false;
        }
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
        this.fireEvent({ eventName: events_1.TREE_EVENTS.onUpdateData, node: this });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21vZGVscy90cmVlLW5vZGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLHVCQUE0QixxQkFBcUIsQ0FBQyxDQUFBO0FBQ2xELDJCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1QjtJQTBCRSxrQkFBbUIsSUFBUSxFQUFTLE1BQWUsRUFBUyxTQUFtQjtRQUE1RCxTQUFJLEdBQUosSUFBSSxDQUFJO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFaOUUsY0FBYztRQUNQLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDbkMsb0JBQW9CO1FBQ1osaUJBQVksR0FBWSxLQUFLLENBQUM7UUFVcEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsZ0NBQWdDO1FBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBRSxJQUFJLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ0QscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FB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LENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN6RixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsb0JBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLDRFQUE0RSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDaEwsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzthQUN0QyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQTlVRCxJQThVQztBQTlVWSxnQkFBUSxXQThVcEIsQ0FBQTtBQUVEO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuL3RyZWUtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBJVHJlZU5vZGUgfSBmcm9tICcuLi9kZWZzL2FwaSc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZCB9IGZyb20gJy4uL2RlcHJlY2F0ZWQnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlTm9kZSBpbXBsZW1lbnRzIElUcmVlTm9kZSB7XG4gIGdldCBpc0hpZGRlbigpIHsgcmV0dXJuIHRoaXMuZ2V0RmllbGQoJ2lzSGlkZGVuJykgfTtcbiAgc2V0IGlzSGlkZGVuKHZhbHVlKSB7IHRoaXMuc2V0RmllbGQoJ2lzSGlkZGVuJywgdmFsdWUpIH07XG4gIGdldCBpc0V4cGFuZGVkKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNFeHBhbmRlZCh0aGlzKSB9O1xuICBnZXQgaXNBY3RpdmUoKSB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5pc0FjdGl2ZSh0aGlzKSB9O1xuICBnZXQgaXNGb2N1c2VkKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNOb2RlRm9jdXNlZCh0aGlzKSB9O1xuXG4gIGxldmVsOiBudW1iZXI7XG4gIHBhdGg6IHN0cmluZ1tdO1xuICBlbGVtZW50UmVmOkVsZW1lbnRSZWY7XG4gIGNoaWxkcmVuOiBUcmVlTm9kZVtdO1xuXG4gIHByaXZhdGUgX29yaWdpbmFsTm9kZTogYW55O1xuICBnZXQgb3JpZ2luYWxOb2RlKCkgeyByZXR1cm4gdGhpcy5fb3JpZ2luYWxOb2RlIH07XG4gICAvLyBGT0xERVIgRkxBR1xuICBwcml2YXRlIF9pc0ZvbGRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBPUEVOIENPTlRFWFQgRkxBR1xuICBwcml2YXRlIF9vcGVuQ29udGV4dDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgb3BlbkNvbnRleHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5Db250ZXh0O1xuICB9XG4gIHNldCBvcGVuQ29udGV4dCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29wZW5Db250ZXh0ID0gdmFsdWU7XG4gIH1cblxuIFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YTphbnksIHB1YmxpYyBwYXJlbnQ6VHJlZU5vZGUsIHB1YmxpYyB0cmVlTW9kZWw6VHJlZU1vZGVsKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgdXVpZCgpOyAvLyBNYWtlIHN1cmUgdGhlcmUncyBhIHVuaXF1ZSBJRFxuICAgIHRoaXMubGV2ZWwgPSB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmxldmVsICsgMSA6IDA7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5wYXJlbnQgPyBbLi4udGhpcy5wYXJlbnQucGF0aCwgdGhpcy5pZF0gOiBbXTtcblxuICAgIGlmICh0aGlzLmdldEZpZWxkKCdjaGlsZHJlbicpKSB7XG4gICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcbiAgICB9XG4gICAgLy8gQ0hFQ0sgZm9yIGNoaWxkcmVuXG4gICAgaWYgKHRoaXMuZGF0YVsnZm9sZGVyJ10pIHtcbiAgICAgIHRoaXMuX2lzRm9sZGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBoZWxwZXIgZ2V0IGZ1bmN0aW9uczpcbiAgZ2V0IGhhc0NoaWxkcmVuKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZGF0YS5oYXNDaGlsZHJlbiB8fCAodGhpcy5jaGlsZHJlbiAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApKTtcbiAgfVxuICBnZXQgaXNDb2xsYXBzZWQoKTpib29sZWFuIHsgcmV0dXJuICF0aGlzLmlzRXhwYW5kZWQgfVxuICBnZXQgaXNMZWFmKCk6Ym9vbGVhbiB7IHJldHVybiAhdGhpcy5oYXNDaGlsZHJlbiB9XG4gIGdldCBpc1Jvb3QoKTpib29sZWFuIHsgcmV0dXJuIHRoaXMucGFyZW50LmRhdGEudmlydHVhbCB9XG4gIGdldCByZWFsUGFyZW50KCk6VHJlZU5vZGUgeyByZXR1cm4gdGhpcy5pc1Jvb3QgPyBudWxsIDogdGhpcy5wYXJlbnQgfVxuXG4gIC8vIHByb3h5IGZ1bmN0aW9uczpcbiAgZ2V0IG9wdGlvbnMoKTogVHJlZU9wdGlvbnMgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwub3B0aW9ucyB9XG4gIGZpcmVFdmVudChldmVudCkgeyB0aGlzLnRyZWVNb2RlbC5maXJlRXZlbnQoZXZlbnQpIH1cbiAgZ2V0IGNvbnRleHQoKTphbnkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmNvbnRleHQgfVxuXG4gIC8vIGZpZWxkIGFjY2Vzc29yczpcbiAgZ2V0IGRpc3BsYXlGaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGaWVsZCgnZGlzcGxheScpO1xuICB9XG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLmdldEZpZWxkKCdpZCcpO1xuICB9XG5cbiAgc2V0IGlkKHZhbHVlKSB7XG4gICAgdGhpcy5zZXRGaWVsZCgnaWQnLCB2YWx1ZSk7XG4gIH1cblxuICBnZXRGaWVsZChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMub3B0aW9uc1tgJHtrZXl9RmllbGRgXV07XG4gIH1cblxuICBzZXRGaWVsZChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW3RoaXMub3B0aW9uc1tgJHtrZXl9RmllbGRgXV0gPSB2YWx1ZTtcbiAgfVxuICBnZXQgaXNGb2xkZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRm9sZGVyIHx8IHRoaXMuaGFzQ2hpbGRyZW47XG4gIH1cblxuICAvLyB0cmF2ZXJzaW5nOlxuICBfZmluZEFkamFjZW50U2libGluZyhzdGVwcywgc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEluZGV4SW5QYXJlbnQoc2tpcEhpZGRlbik7XG4gICAgcmV0dXJuIHRoaXMuX2dldFBhcmVudHNDaGlsZHJlbihza2lwSGlkZGVuKVtpbmRleCArIHN0ZXBzXTtcbiAgfVxuXG4gIGZpbmROZXh0U2libGluZyhza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZmluZEFkamFjZW50U2libGluZygrMSwgc2tpcEhpZGRlbik7XG4gIH1cblxuICBmaW5kUHJldmlvdXNTaWJsaW5nKHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiB0aGlzLl9maW5kQWRqYWNlbnRTaWJsaW5nKC0xLCBza2lwSGlkZGVuKTtcbiAgfVxuXG4gIGdldFZpc2libGVDaGlsZHJlbigpIHtcbiAgICByZXR1cm4gKHRoaXMuY2hpbGRyZW4gfHwgW10pLmZpbHRlcigobm9kZSkgPT4gIW5vZGUuaXNIaWRkZW4pO1xuICB9XG5cbiAgZ2V0Rmlyc3RDaGlsZChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBza2lwSGlkZGVuID8gdGhpcy5nZXRWaXNpYmxlQ2hpbGRyZW4oKSA6IHRoaXMuY2hpbGRyZW47XG5cbiAgICByZXR1cm4gXy5maXJzdChjaGlsZHJlbiB8fCBbXSk7XG4gIH1cblxuICBnZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVuKCkgOiB0aGlzLmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIF8ubGFzdChjaGlsZHJlbiB8fCBbXSk7XG4gIH1cblxuICBmaW5kTmV4dE5vZGUoZ29JbnNpZGUgPSB0cnVlLCBza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZ29JbnNpZGUgJiYgdGhpcy5pc0V4cGFuZGVkICYmIHRoaXMuZ2V0Rmlyc3RDaGlsZChza2lwSGlkZGVuKSB8fFxuICAgICAgICAgICB0aGlzLmZpbmROZXh0U2libGluZyhza2lwSGlkZGVuKSB8fFxuICAgICAgICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5maW5kTmV4dE5vZGUoZmFsc2UsIHNraXBIaWRkZW4pO1xuICB9XG5cbiAgZmluZFByZXZpb3VzTm9kZShza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nID0gdGhpcy5maW5kUHJldmlvdXNTaWJsaW5nKHNraXBIaWRkZW4pO1xuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWFsUGFyZW50XG4gICAgfVxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmcuX2dldExhc3RPcGVuRGVzY2VuZGFudChza2lwSGlkZGVuKTtcbiAgfVxuXG4gIF9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbik7XG4gICAgcmV0dXJuICh0aGlzLmlzQ29sbGFwc2VkIHx8ICFsYXN0Q2hpbGQpXG4gICAgICA/IHRoaXNcbiAgICAgIDogbGFzdENoaWxkLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbiA9IGZhbHNlKTphbnlbXSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnBhcmVudCAmJlxuICAgICAgKHNraXBIaWRkZW4gPyB0aGlzLnBhcmVudC5nZXRWaXNpYmxlQ2hpbGRyZW4oKSA6IHRoaXMucGFyZW50LmNoaWxkcmVuKTtcblxuICAgIHJldHVybiBjaGlsZHJlbiB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW5kZXhJblBhcmVudChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UGFyZW50c0NoaWxkcmVuKHNraXBIaWRkZW4pLmluZGV4T2YodGhpcyk7XG4gIH1cblxuICBpc0Rlc2NlbmRhbnRPZihub2RlOlRyZWVOb2RlKSB7XG4gICAgaWYgKHRoaXMgPT09IG5vZGUpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xuICB9XG5cbiAgLy8gaGVscGVyIG1ldGhvZHM6XG4gIGxvYWRDaGlsZHJlbigpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nZXRDaGlsZHJlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGRvZXNuXFwndCBoYXZlIGNoaWxkcmVuLCBvciBhIGdldENoaWxkcmVuIG1ldGhvZCcpO1xuICAgIH1cbiAgICBQcm9taXNlLnJlc29sdmUodGhpcy5vcHRpb25zLmdldENoaWxkcmVuKHRoaXMpKVxuICAgICAgLnRoZW4oKGNoaWxkcmVuKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgIHRoaXMuc2V0RmllbGQoJ2NoaWxkcmVuJywgY2hpbGRyZW4pO1xuICAgICAgICAgIHRoaXMuX2luaXRDaGlsZHJlbigpO1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZC5nZXRGaWVsZCgnaXNFeHBhbmRlZCcpICYmIGNoaWxkLmhhc0NoaWxkcmVuKSB7XG4gICAgICAgICAgICAgIGNoaWxkLmV4cGFuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIGlmICghdGhpcy5pc0V4cGFuZGVkKSB7XG4gICAgICB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XG4gICAgICB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbnN1cmVWaXNpYmxlKCkge1xuICAgIGlmICh0aGlzLnJlYWxQYXJlbnQpIHtcbiAgICAgIHRoaXMucmVhbFBhcmVudC5leHBhbmQoKTtcbiAgICAgIHRoaXMucmVhbFBhcmVudC5lbnN1cmVWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgZGVwcmVjYXRlZCgndG9nZ2xlJywgJ3RvZ2dsZUV4cGFuZGVkJyk7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZGVkKCkge1xuICAgIHRoaXMuc2V0SXNFeHBhbmRlZCghdGhpcy5pc0V4cGFuZGVkKTtcbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Ub2dnbGUsIHdhcm5pbmc6ICd0aGlzIGV2ZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Ugb25Ub2dnbGVFeHBhbmRlZCBpbnN0ZWFkJywgbm9kZTogdGhpcywgaXNFeHBhbmRlZDogdGhpcy5pc0V4cGFuZGVkIH0pO1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblRvZ2dsZUV4cGFuZGVkLCBub2RlOiB0aGlzLCBpc0V4cGFuZGVkOiB0aGlzLmlzRXhwYW5kZWQgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldElzRXhwYW5kZWQodmFsdWUpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRFeHBhbmRlZE5vZGUodGhpcywgdmFsdWUpO1xuXG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuICYmIHRoaXMuaGFzQ2hpbGRyZW4gJiYgdmFsdWUpIHtcbiAgICAgIHRoaXMubG9hZENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgc2V0SXNBY3RpdmUodmFsdWUsIG11bHRpID0gZmFsc2UpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRBY3RpdmVOb2RlKHRoaXMsIHZhbHVlLCBtdWx0aSk7XG4gICAgaWYgKHRoaXMudHJlZU1vZGVsLmNvbnRleHRNZW51Tm9kZSAmJiBcbiAgICAgICh0aGlzLmlkICE9PSB0aGlzLnRyZWVNb2RlbC5jb250ZXh0TWVudU5vZGUuaWQpKSB7XG4gICAgICB0aGlzLnRyZWVNb2RlbC5jb250ZXh0TWVudU5vZGUub3BlbkNvbnRleHQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b2dnbGVBY3RpdmF0ZWQobXVsdGkgPSBmYWxzZSkge1xuICAgIHRoaXMuc2V0SXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUsIG11bHRpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0QWN0aXZlQW5kVmlzaWJsZShtdWx0aSA9IGZhbHNlKSB7XG4gICAgdGhpcy5zZXRJc0FjdGl2ZSh0cnVlLCBtdWx0aSlcbiAgICAgIC5lbnN1cmVWaXNpYmxlKCk7XG5cbiAgICBzZXRUaW1lb3V0KHRoaXMuc2Nyb2xsSW50b1ZpZXcuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRSZWYpIHtcbiAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIG5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCAmJiBuYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3SWZOZWVkZWQoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXNlZE5vZGUodGhpcyk7XG4gICAgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgIGlmIChwcmV2aW91c05vZGUpIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkJsdXIsIG5vZGU6IHByZXZpb3VzTm9kZSB9KTtcbiAgICB9XG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uRm9jdXMsIG5vZGU6IHRoaXMgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJsdXIoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXNlZE5vZGUobnVsbCk7XG4gICAgaWYgKHByZXZpb3VzTm9kZSkge1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uQmx1ciwgbm9kZTogdGhpcyB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZpbHRlcihmaWx0ZXJGbiwgYXV0b1Nob3cgPSBmYWxzZSkge1xuICAgIGxldCBpc1Zpc2libGUgPSBmaWx0ZXJGbih0aGlzKTtcblxuICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIGNoaWxkLmZpbHRlcihmaWx0ZXJGbiwgYXV0b1Nob3cpO1xuICAgICAgICBpc1Zpc2libGUgPSBpc1Zpc2libGUgfHwgIWNoaWxkLmlzSGlkZGVuO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5pc0hpZGRlbiA9ICFpc1Zpc2libGU7XG4gICAgaWYgKGF1dG9TaG93KSB7XG4gICAgICB0aGlzLmVuc3VyZVZpc2libGUoKTtcbiAgICB9XG4gIH1cblxuICBjbGVhckZpbHRlcigpIHtcbiAgICB0aGlzLmlzSGlkZGVuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLmNsZWFyRmlsdGVyKCkpO1xuICB9XG5cbiAgYWxsb3dEcmFnKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcmFnO1xuICB9XG4gIC8vIFRPR0dMRSBDT05URVhUXG4gIHRvZ2dsZUNvbnRleHQoJGV2ZW50KSB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMudHJlZU1vZGVsLmNvbnRleHRNZW51Tm9kZSAmJiAodGhpcy50cmVlTW9kZWwuY29udGV4dE1lbnVOb2RlLmlkICE9IHRoaXMuaWQpKSB7XG4gICAgICB0aGlzLnRyZWVNb2RlbC5jb250ZXh0TWVudU5vZGUub3BlbkNvbnRleHQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy50cmVlTW9kZWwuY29udGV4dE1lbnVOb2RlID0gdGhpcztcbiAgICB0aGlzLl9vcGVuQ29udGV4dCA9ICF0aGlzLl9vcGVuQ29udGV4dDtcbiAgICAvLyByZXNldCBjb250ZXh0IG9mIHByZXZpb3VzLCBzaG93IHRoaXMgY29udGV4dFxuICB9XG4gIC8vIFJFTkFNRVxuICByZW5hbWUobmV3TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kYXRhLm5hbWUgPSBuZXdOYW1lO1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblVwZGF0ZURhdGEsIG5vZGU6IHRoaXMgfSk7XG4gIH1cbiAgbW91c2VBY3Rpb24oYWN0aW9uTmFtZTpzdHJpbmcsICRldmVudCwgZGF0YTphbnkgPSBudWxsKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXModHJ1ZSk7XG5cbiAgICBjb25zdCBhY3Rpb25NYXBwaW5nID0gdGhpcy5vcHRpb25zLmFjdGlvbk1hcHBpbmcubW91c2U7XG4gICAgY29uc3QgYWN0aW9uID0gYWN0aW9uTWFwcGluZ1thY3Rpb25OYW1lXTtcblxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIGFjdGlvbih0aGlzLnRyZWVNb2RlbCwgdGhpcywgJGV2ZW50LCBkYXRhKTtcblxuICAgICAgLy8gVE9ETzogcmVtb3ZlIGFmdGVyIGRlcHJlY2F0aW9uIG9mIGNvbnRleHQgbWVudSBhbmQgZGJsIGNsaWNrXG4gICAgICBpZiAoYWN0aW9uTmFtZSA9PT0gJ2NvbnRleHRNZW51Jykge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Db250ZXh0TWVudSwgbm9kZTogdGhpcywgcmF3RXZlbnQ6ICRldmVudCB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb25OYW1lID09PSAnZGJsQ2xpY2snKSB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkRvdWJsZUNsaWNrLCB3YXJuaW5nOiAnVGhpcyBldmVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGFjdGlvbk1hcHBpbmcgdG8gaGFuZGxlIGRvdWJsZSBjbGlja3MnLCBub2RlOiB0aGlzLCByYXdFdmVudDogJGV2ZW50IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0Q2hpbGRyZW4oKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuZ2V0RmllbGQoJ2NoaWxkcmVuJylcbiAgICAgIC5tYXAoYyA9PiBuZXcgVHJlZU5vZGUoYywgdGhpcywgdGhpcy50cmVlTW9kZWwpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1dWlkKCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwMDAwMDApO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=