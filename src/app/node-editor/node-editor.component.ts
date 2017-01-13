import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.css']
})
export class NodeEditorComponent {

  @Input() person = {};
  @Output() action = new EventEmitter();

  isEditorVisible: boolean = false;

  showEditor(value: boolean) {
    this.isEditorVisible = value;
  }

  updateTitle(color: string) {
    // this.showEditor(false);
    this.action.next(color);
  }

}
