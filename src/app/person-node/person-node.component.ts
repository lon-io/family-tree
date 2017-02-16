import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {ApiService} from '../services/api.service';
import {TreeService} from '../services/tree.service';

@Component({
  selector: 'app-person-node',
  templateUrl: './person-node.component.html',
  styleUrls: ['./person-node.component.css']
})
export class PersonNodeComponent implements OnInit {

  @Input() person;
  @Output() updateTree = new EventEmitter();

  isNodeDeleted = false;
  // To determine whether or not to dosplay the anchor tags in a node
  showCheck = false;
  // To determine whether or not a node should display it's editor
  isEditing = false;
  // To determine whether or not a node should display it's child creator
  isCreatingChild = false;
  // To determine whether or not a node's children should be visible
  showChildren = true;
  // To determine if the click action in a button originated from one of the anchor children
  private childClicked = false;

  constructor(
    private treeService: TreeService,
    private toast: ToastComponent
  ) { }

  ngOnInit() {
  }

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  toggleCreatingChild() {
    this.isCreatingChild = !this.isCreatingChild;
  }

  toggleShowChildren() {
    this.showChildren = !this.showChildren;
  }

  toggleChildClick() {
    this.childClicked = !this.childClicked;
  }

  onChecked() {
    if (!this.childClicked) {
      this.toggleShowChildren();
    }
  }

  deleteNode() {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.treeService.deletePerson(this.person, this.person.parent).subscribe(
        res => {
          this.isNodeDeleted = true;
          this.updateTree.next(this.person);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => {
          console.log(error);
          this.toast.setMessage('An error occured, Please try again later', 'danger');
        }
      );
    }
  }

  onEditorAction($event) {
    this.updatePerson($event);
    this.onCancel();
  }

  onCreatorAction($event) {
    this.createPerson($event);
    this.onCancel();
  }

  onUpdateTree($event) {
    this.updateTree.next($event);
  }

  updatePerson(person_) {
    this.treeService.editPerson(this.person).subscribe(
      res => {
        this.toast.setMessage('Success', 'success');
        this.person = person_;
      },
      error => {
        console.log(error);
        this.toast.setMessage('An error occured', 'danger');
      },
      () => {
      }
    );
  }
  onCancel() {
    this.isCreatingChild = false;
    this.isEditing = false;
  }

  private createPerson(person_: any) {
    this.treeService.addPerson(person_, this.person).subscribe(
      res => {
        this.person.children.push(res);
        this.toast.setMessage('Success', 'success');
        this.updateTree.next(true);
      },
      error => {
        console.log(error);
        this.toast.setMessage('An error occured', 'danger');
      }
    );
  }
}
