import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person-node',
  templateUrl: './person-node.component.html',
  styleUrls: ['./person-node.component.css']
})
export class PersonNodeComponent implements OnInit {

  @Input() note = {};
  @Output() checked = new EventEmitter();

  showCheck: boolean = false;
  isEditing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  onChecked() {
    this.toggleEditing();
  }

  onEditorAction($event) {

  }

  onChildChecked($event) {

  }

}
