import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PersonNode} from '../person-node/person-node.interface';

@Component({
  selector: 'app-node-creator',
  templateUrl: './node-creator.component.html',
  styleUrls: ['./node-creator.component.css']
})
export class NodeCreatorComponent implements OnInit {

  @Input() parent;
  private person: PersonNode;
  @Output() done = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {
    this.person = {
      _id: null,
      is_root: false,
      data: {
        deletable: true,
        name: '',
        node_open: false
      },
      parent: this.parent._id,
      children: []
    };
  }

  createPerson() {
    this.done.next(this.person);
  }

  getPerson() {
    return this.person;
  }

  closeCreatorDialog() {
    this.cancel.next(true);
  }
}
