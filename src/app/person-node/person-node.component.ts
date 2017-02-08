import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person-node',
  templateUrl: './person-node.component.html',
  styleUrls: ['./person-node.component.css']
})
export class PersonNodeComponent implements OnInit {

  @Input() person;

  // To determine whether or not to dosplay the anchor tags in a node
  showCheck: boolean = false;
  // To determine whether or not a node should display it's editor
  isEditing: boolean = false;
  // To determine whether or not a node's children should be visible
  showChildren: boolean = true;
  // To determine if the click action in a button originated from one of the anchor children
  private childClicked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
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
    console.log('deleted');
  }

  addChildNode() {
    console.log('adding child node');
  }

  onEditorAction($event) {
    this.person = $event;
    this.onCancel();
  }

  onCancel() {
    this.toggleEditing();
  }
}
