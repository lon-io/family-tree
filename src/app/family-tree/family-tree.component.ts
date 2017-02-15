import { Component, OnInit } from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {PersonNode} from '../person-node/person-node.interface';
import {FamilyTree} from './family-tree.class';
import {PersonNodeData} from '../person-node/person-node-data.interface';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {

  private persons = [];
  private tree: FamilyTree;
  private showCreateRootDialog: boolean = false;
  private root: PersonNode;

  constructor(
    private toast: ToastComponent,
    private dataService: DataService
  ) { }

  ngOnInit() {

    this.root = {
      _id: null,
      is_root: true,
      data : {
        deletable: true,
        name: '',
        node_open: false
      },
      parent: null,
      children : []
    };
    this.getpersons();


    // this.tree = new FamilyTree(this.createNewPersonNode({
    //   name: 'First',
    //   deletable: false,
    //   node_open: true
    // }));

    // this.tree._root.children.push(this.createNewPersonNode({
    //   name: 'One',
    //   deletable: false,
    //   node_open: true
    // }));
    // this.tree._root.children[0].parent = this.tree;
    //
    // this.tree._root.children.push(this.createNewPersonNode({
    //   name: 'Two',
    //   deletable: false,
    //   node_open: true
    // }));
    // this.tree._root.children[1].parent = this.tree;
    //
    // this.tree._root.children.push(this.createNewPersonNode({
    //   name: 'Three',
    //   deletable: false,
    //   node_open: true
    // }));
    // this.tree._root.children[2].parent = this.tree;
    //
    // this.tree._root.children[0].children.push(this.createNewPersonNode({
    //   name: 'Four',
    //   deletable: false,
    //   node_open: true
    // }));
    // this.tree._root.children[0].children[0].parent = this.tree._root.children[0];
    //
    // this.tree._root.children[0].children.push(this.createNewPersonNode({
    //   name: 'Five',
    //   deletable: false,
    //   node_open: true
    // }));
    // this.tree._root.children[0].children[1].parent = this.tree._root.children[0];
    //
    // this.tree._root.children[2].children.push(this.createNewPersonNode({
    //   name: 'Six',
    //   deletable: false,
    //   node_open: true
    // }));
    // this.tree._root.children[2].children[0].parent = this.tree._root.children[2];

  }

  addRoot() {
    this.dataService.addPerson(this.root).subscribe(
      res => {
        let person_ = res.json();
        this.toast.setMessage('Success', 'success');
        this.persons.push(person_);
        this.showCreateRootDialog = false;
        this.getpersons();
      },
      err => console.log(err)
    );
  }

  private getpersons() {
    this.dataService.getPersons().subscribe(
      (data) => {
        console.log(data);
        this.persons = data;
        if (this.persons.length !== 0) {
          this.parseTree();
        }
      },
      err => console.log(err),
      () => {}
    );
  }

  private parseTree() {
    console.log('I got data');
  }

  createRoot() {
    this.showCreateRootDialog = true;
  }

  addNewChildNode(parent: PersonNode, child: PersonNode) {
    parent.children.push(child);
  }

  createNewPersonNode = (data: PersonNodeData) => {
    return {
      _id: null,
      is_root: false,
      data : data,
      parent: null,
      children : []
    };
  }

}
