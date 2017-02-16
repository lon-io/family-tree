import {Component, OnInit, OnDestroy} from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {PersonNode} from '../person-node/person-node.interface';
import {FamilyTree} from './family-tree.class';
import {PersonNodeData} from '../person-node/person-node-data.interface';
import {ApiService} from '../services/api.service';
import * as _ from 'underscore';
import {Subscription} from 'rxjs';
import {Store} from '../services/store.service';
import {TreeService} from '../services/tree.service';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit, OnDestroy {

  treeSub: Subscription;
  private persons = [];
  private tree: FamilyTree;
  private showCreateRootDialog = false;
  private root: PersonNode;
  private isLoading = true;

  constructor(private toast: ToastComponent,
              private treeService: TreeService,
              private store: Store
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

    this.treeService.getPersons().subscribe(
      (data) => {
        this.isLoading = false;
      },
      err => console.log(err),
      () => {
      }
    );

    this.treeSub = this.store.changes
      .map(data => data.tree)
      .subscribe(
        tree => {
          this.tree = tree;
          if (this.tree._root._id !== null) {
            this.root = tree._root;
            this.isLoading = false;
          }
        },
        err => console.log(err),
        () => {
        }
      );
  }

  ngOnDestroy(): void {
    this.treeSub.unsubscribe();
  }

  onUpdateTree($event) {
    this.treeService.getPersons().subscribe(
    );
  }

  addRoot() {
    this.treeService.addPerson(this.root).subscribe(
      res => {
        this.toast.setMessage('Success', 'success');
        this.showCreateRootDialog = false;
      },
      err => console.log(err)
    );
  }

  createRoot() {
    this.showCreateRootDialog = true;
  }
}
