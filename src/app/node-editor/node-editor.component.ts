import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.css']
})
export class NodeEditorComponent {

  @Input() person;
  @Output() done = new EventEmitter();
  @Output() cancel = new EventEmitter();

  updateTitle() {
    this.done.next(this.person);
  }

  closeEditorDialog() {
    this.cancel.next(true);
  }

  getPerson() {
    return this.person;
  }

}
