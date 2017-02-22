import { Component, Input } from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular2-tree-component';

const actionMapping:IActionMapping = {
  mouse: {
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app',
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }
      .contextMenu {
        display: none;
      }
      .contextOn {
        display: inline-block
      }
      `
  ],
  template: `
  <form>
    <input #filter (keyup)="filterNodes(filter.value, tree)" placeholder="filter nodes"/>
  </form>
  <Tree
    #tree
    [nodes]="nodes"
    [focused]="true"
    [options]="customTemplateStringOptions"
    (onEvent)="onEvent($event)"
  >
  <template #treeNodeTemplate let-node>
  <span title="{{node.data.subTitle}}">{{ node.data.name }}</span>
  <span class="pull-right">{{ childrenCount(node) }} | {{ node.isFolder }}</span>
  <div class="contextMenu" [class.contextOn]="node.openContext">
      <a (click)="logger('Edit -> router')">edit</a> | 
      <a (click)="logger('Archive -> db op?')">archive</a> |
      <a (click)="_contextToggleRenOption()">rename</a>
      <span *ngIf="_contextRenOption">
        <input #ren type="text" (keyup.enter)="node.rename(ren.value); _contextToggleRenOption()">
        <button (click)="node.rename(ren.value); _contextToggleRenOption()">Rename</button>
      </span>
  </div>
  </template>
  <template #loadingTemplate>Loading, please hold....</template>
  </Tree>
  <br>
  <p>Keys:</p>
  down | up | left | right | space | enter
  <p>Mouse:</p>
  click to select | shift+click to select multi
  <p>API:</p>
  <button (click)="tree.treeModel.focusNextNode()">next node</button>
  <button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
  <button (click)="tree.treeModel.focusDrillDown()">drill down</button>
  <button (click)="tree.treeModel.focusDrillUp()">drill up</button>
  <button (click)="customTemplateStringOptions.allowDrag = true">allowDrag</button>
  <p></p>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleActivated()">
    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleExpanded()">
    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().blur()">
    blur
  </button>
  <button
    (click)="addNode(tree)">
    Add Node
  </button>
  <button (click)="addFolder(tree)">Add Folder</button>
  <button
    (click)="activateSubSub(tree)">
    Activate inner node
  </button>
  `
})
export class App {
  nodes:any[] = null;
  private _contextRenOption = false;
  constructor() {
    setTimeout(() => {
      this.nodes = [
        {

          expanded: true,
          name: 'root expanded',
          subTitle: 'the root',
          folder: true,
          children: [
            {
              name: 'child1',
              subTitle: 'a good child',
              folder: false,
              hasChildren: false
            }, {

              name: 'child2',
              subTitle: 'a bad child',
              folder: false,
              hasChildren: false
            }
          ]
        },
        {
          name: 'root2',
          subTitle: 'the second root',
          folder: true,
          children: [
            {
              name: 'child2.1',
              subTitle: 'new and improved',
              folder: false,
              hasChildren: false
            }, {

              name: 'child2.2',
              subTitle: 'new and improved2',
              folder: true,
              children: [
                {
                  uuid: 1001,
                  name: 'subsub',
                  subTitle: 'subsub',
                  folder: false,
                  hasChildren: false
                }
              ]
            }
          ]
        },
        {

          name: 'asyncroot',
          folder: true,
          hasChildren: true
        }
      ];
    }, 1);
  }

  asyncChildren = [
    {
      name: 'child2.1',
      subTitle: 'new and improved'
    }, {
      name: 'child2.2',
      subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }
  addFolder(tree) {
    let addToNode = tree.treeModel.getFocusedNode();
    tree.treeModel.addFolder('New Folder', addToNode)
  }
  addNode(tree) {
    this.nodes[0].children.push({

      name: 'a new child',
      folder: false,
      hasChildren: false
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    }
  onEvent = console.log.bind(console);
  private _contextToggleRenOption() {
    this._contextRenOption = !this._contextRenOption;
  }
  private _contextRenameNode(val: string, node: TreeNode) {
    node.data.name = val;
    //node.treeModel.update();
    this._contextToggleRenOption();
    console.log(node.treeModel.nodes);
  }
  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component')
  }
}
