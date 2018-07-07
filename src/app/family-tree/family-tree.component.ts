import {Component, OnInit, OnDestroy} from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {PersonNode} from '../person-node/person-node.interface';
import {FamilyTree} from './family-tree.class';
import {Subscription} from 'rxjs';
import {Store} from '../services/store.service';
import {TreeService} from '../services/tree.service';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit, OnDestroy {

  storeSub: Subscription;
  isLoading = true;
  private persons = [];
  private tree: FamilyTree;
  private treeExists = false;
  private showCreateRootDialog = false;
  private root: PersonNode;

  constructor(private toast: ToastComponent,
              private treeService: TreeService,
              private store: Store
              ) {

  }

  ngOnInit() {

    // Set dummy default for root node
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

    // fetch all nodes
    this.treeService.getPersons().subscribe(
      (data) => {
        this.isLoading = false;
      },
      err => console.log(err),
      () => {
      }
    );

    // Subscribe to changes in the store's data
    this.storeSub = this.store.changes
      .map(data => data.tree)
      .subscribe(
        tree => {
          this.tree = tree;
          this.root = tree._root;
          if (this.tree._root._id !== null) {
            this.treeExists = true;
            this.isLoading = false;
          }else {
            this.treeExists = false;
          }
        },
        err => console.log(err),
        () => {
        }
      );
  }

  // unsubscribe form the store to prevent memory leakage
  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  // On updating any child node (direct or indirect), reset the tree
  onUpdateTree($event) {
    this.treeService.getPersons().subscribe(
    );
  }

  // create the root node
  addRoot() {
    this.treeService.addPerson(this.root).subscribe(
      res => {
        this.toast.setMessage('Success', 'success');
        this.showCreateRootDialog = false;
        this.treeExists = true;
      },
      err => console.log(err)
    );
  }

  // close the creator dialog
  closeRootCreatorDialog() {
    this.showCreateRootDialog = false;
  }

  // show the creator dialog
  createRoot() {
    this.showCreateRootDialog = true;
  }

  getRoot() {
    return this.root;
  }

  getTree() {
    return this.tree;
  }

  getTreeExistence() {
    return this.treeExists;
  }

  getToastMessage() {
    return this.toast.message;
  }

  shouldShowCreateRootDialog() {
    return this.showCreateRootDialog;
  }
}
