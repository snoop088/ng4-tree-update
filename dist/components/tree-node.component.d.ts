import { ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { ITreeNodeTemplate } from './tree-node-content.component';
export declare class TreeNodeComponent implements AfterViewInit {
    private elementRef;
    node: TreeNode;
    nodeIndex: number;
    treeNodeContentTemplate: TemplateRef<ITreeNodeTemplate>;
    loadingTemplate: TemplateRef<any>;
    constructor(elementRef: ElementRef);
    onDrop($event: any): void;
    allowDrop(element: any): boolean;
    getNodePadding(): string;
    ngAfterViewInit(): void;
}
