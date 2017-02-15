/**
 * Created by lon on 2/8/17.
 */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/distinctUntilChanged';
import {FamilyTree} from '../family-tree/family-tree.class';

export interface State {
  tree: FamilyTree;
}

const defaultState: State = {
  tree: new FamilyTree(
    {
      data : {
        name: 'First',
        deletable: false,
        node_open: true
      },
      parent: null,
      children : []
    })
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;
  changes = this.store.asObservable()
    .distinctUntilChanged();

  setState(state: State) {
    this.store.next(state);
  }

  getState(): State {
    return this.store.value;
  }

  purge(){
    this.store.next(defaultState);
  }
}
