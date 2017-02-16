import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DataService} from '../services/data.service';
import {ToastComponent} from '../shared/toast/toast.component';
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
    private dataService: DataService,
    private toast: ToastComponent
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
    // this.showEditor(false);
    this.done.next(this.person);
  }
}
