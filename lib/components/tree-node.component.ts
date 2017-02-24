import { Component, Input, ElementRef, AfterViewInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';

@Component({
  selector: 'TreeNode',
  encapsulation: ViewEncapsulation.None,
  styles: [
    '.tree-children.tree-children-no-padding { padding-left: 0 }',
    '.tree-children { padding-left: 10px }',
    `.node-content-wrapper {
      display: flex;
      padding: 2px 5px;
    }`,
    '.node-wrapper { display: block }',
    '.node-wrapper span { vertical-align: middle; line-height: 1.5em }',
    '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
    '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
    '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #e7f4f9 }',
    '.node-content-wrapper:hover { background: #f7fbff }',
    '.tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover { box-shadow: inset 0 0 1px #999; }',
    '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
    '.node-content-wrapper.is-dragging-over-disabled { opacity: 0.5 }',
    `.toggle-children {
        display: flex;
        margin-right: 3px;
    }`,
    `.toggle-children-placeholder {
        display: flex;
        margin-right: 2px;
    }`
  ],
  template: `
    <div
      *ngIf="!node.isHidden"
      class="tree-node tree-node-level-{{ node.level }}"
      [class.tree-node-expanded]="node.isExpanded && node.isFolder"
      [class.tree-node-collapsed]="node.isCollapsed && node.isFolder"
      [class.tree-node-leaf]="node.isLeaf"
      [class.tree-node-active]="node.isActive"
      [class.tree-node-focused]="node.isFocused">

      <TreeNodeDropSlot
        *ngIf="nodeIndex === 0"
        [dropIndex]="nodeIndex"
        [node]="node.parent"
        ></TreeNodeDropSlot>

        <div class="node-wrapper" [style.padding-left]="getNodePadding()">
          
          <div class="node-content-wrapper"
            #nodeContentWrapper
            (click)="node.mouseAction('click', $event)"
            (dblclick)="node.mouseAction('dblClick', $event)"
            (contextmenu)="node.mouseAction('contextMenu', $event)"
            (treeDrop)="onDrop($event)"
            [treeAllowDrop]="allowDrop.bind(this)"
            [treeDrag]="node"
            [treeDragEnabled]="node.allowDrag()">
            <span
              *ngIf="node.isFolder"
              class="toggle-children-wrapper"
              (click)="node.mouseAction('expanderClick', $event)">
              <span class="toggle-children"><i class="material-icons">{{ node.isExpanded ? 'folder_open' : 'folder' }}</i></span>
            </span>
            <span
              *ngIf="!node.isFolder"
              class="toggle-children-placeholder">
              <i class="material-icons">insert_drive_file</i>
            </span>
            <TreeNodeContent [node]="node" [treeNodeContentTemplate]="treeNodeContentTemplate"></TreeNodeContent>
          </div>
        </div>

      <div [class.tree-children]="true"
           [class.tree-children-no-padding]="node.options.levelPadding"
           *ngIf="node.isExpanded">
        <div *ngIf="node.children">
          <TreeNode
            *ngFor="let node of node.children; let i = index"
            [node]="node"
            [nodeIndex]="i"
            [treeNodeContentTemplate]="treeNodeContentTemplate"
            [loadingTemplate]="loadingTemplate">
          </TreeNode>
        </div>
        <LoadingComponent
          [style.padding-left]="getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [loadingTemplate]="loadingTemplate"
        ></LoadingComponent>
      </div>
      <TreeNodeDropSlot
        [dropIndex]="nodeIndex + 1"
        [node]="node.parent"
        ></TreeNodeDropSlot>
    </div>
  `
})

export class TreeNodeComponent implements AfterViewInit {
  @Input() node:TreeNode;
  @Input() nodeIndex:number;
  @Input() treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
  @Input() loadingTemplate: TemplateRef<any>;

  constructor(private elementRef: ElementRef) {
  }

  onDrop($event) {
    this.node.mouseAction('drop', $event.event, {
      from: $event.element,
      to: { parent: this.node, index: 0 }
    });
  }

  allowDrop(element) {
    if (this.node.options.readOnly) return false;
    return this.node.options.allowDrop(element, { parent: this.node, index: 0 });
  }

  getNodePadding() {
    return this.node.options.levelPadding * (this.node.level - 1) + 'px';
  }

  ngAfterViewInit() {
    this.node.elementRef = this.elementRef;
  }
}
