import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person-node',
  templateUrl: './person-node.component.html',
  styleUrls: ['./person-node.component.css']
})
export class PersonNodeComponent implements OnInit {

  @Input() person = {};
  @Output() checked = new EventEmitter();

  showCheck: boolean = false;
  isEditing: boolean = false;
  showChildren: boolean = true;

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

  onChecked() {
    // this.toggleEditing();
    this.toggleShowChildren();
  }

  enableEditing() {
    console.log('Editing');
  }

  deleteNode() {
    console.log('deleted');
  }

  addChild(){
    console.log('adding child node');
  }

  onEditorAction($event) {

  }

  onChildChecked($event) {

  }

}
