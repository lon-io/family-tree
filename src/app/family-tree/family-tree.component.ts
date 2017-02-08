import { Component, OnInit } from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {PersonNode} from '../person-node/person-node.interface';
import {FamilyTree} from './family-tree.class';
import {PersonNodeData} from '../person-node/person-node-data.interface';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {

  private tree: FamilyTree;

  constructor(
    private toast: ToastComponent
  ) { }

  ngOnInit() {
    this.tree = new FamilyTree(this.createNewPersonNode({
      name: 'First',
      deletable: false,
      node_open: true
    }));

    this.tree._root.children.push(this.createNewPersonNode({
      name: 'One',
      deletable: false,
      node_open: true
    }));
    this.tree._root.children[0].parent = this.tree;

    this.tree._root.children.push(this.createNewPersonNode({
      name: 'Two',
      deletable: false,
      node_open: true
    }));
    this.tree._root.children[1].parent = this.tree;

    this.tree._root.children.push(this.createNewPersonNode({
      name: 'Three',
      deletable: false,
      node_open: true
    }));
    this.tree._root.children[2].parent = this.tree;

    this.tree._root.children[0].children.push(this.createNewPersonNode({
      name: 'Four',
      deletable: false,
      node_open: true
    }));
    this.tree._root.children[0].children[0].parent = this.tree._root.children[0];

    this.tree._root.children[0].children.push(this.createNewPersonNode({
      name: 'Five',
      deletable: false,
      node_open: true
    }));
    this.tree._root.children[0].children[1].parent = this.tree._root.children[0];

    this.tree._root.children[2].children.push(this.createNewPersonNode({
      name: 'Six',
      deletable: false,
      node_open: true
    }));
    this.tree._root.children[2].children[0].parent = this.tree._root.children[2];

  }

  addNewChildNode(parent: PersonNode, child: PersonNode) {
    parent.children.push(child);
  }

  createNewPersonNode = (data: PersonNodeData) => {
    return {
      data : data,
      parent: null,
      children : []
    };
  };

  onChildChecked($event) {

  }

}
