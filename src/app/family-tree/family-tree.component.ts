import {Component, OnInit} from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {PersonNode} from '../person-node/person-node.interface';
import {FamilyTree} from './family-tree.class';
import {PersonNodeData} from '../person-node/person-node-data.interface';
import {DataService} from '../services/data.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {

  private persons = [];
  private tree: FamilyTree;
  private showCreateRootDialog = false;
  private root: PersonNode;
  private isLoading = true;

  constructor(private toast: ToastComponent,
              private dataService: DataService
              ) {
  }

  ngOnInit() {

    this.root = {
      _id: null,
      is_root: true,
      data: {
        deletable: false,
        name: '',
        node_open: false
      },
      parent: null,
      children: []
    };
    this.getpersons();

  }

  onUpdateTree($event) {
    console.log('Update Tree: ' + $event);
    this.getpersons();
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
        this.persons = data;
        if (this.persons.length !== 0) {
          this.tree = this.unflatten(this.persons);
          this.isLoading = false;
        }
      },
      err => console.log(err),
      () => {
      }
    );
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
      data: data,
      parent: null,
      children: []
    };
  };

  // // http://stackoverflow.com/a/22072374/4931825
  unflatten(array, parent= null, tree = null) {
    if (parent === null) {
      // We're at the root node
      parent = _.findWhere(array, {is_root: true});
      tree = new FamilyTree(parent);
    }

    let children = _.filter(array, (child: PersonNode) => {
      console.log(child);
      return child.is_root !== true && child.parent._id === parent._id;
    });

    if (!_.isEmpty(children)) {
      parent['children'] = children;
      _.each(children, (child) => {
        this.unflatten(array, child, tree); // populate each child node recursively
      });
    }
    return tree;
  };
}
