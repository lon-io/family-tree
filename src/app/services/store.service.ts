/**
 * Created by lon on 2/8/17.
 */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/distinctUntilChanged';
import {FamilyTree} from '../family-tree/family-tree.class';

// Store state interface
export interface State {
  tree: FamilyTree;
}

// Create the store default state
const defaultState: State = {
  tree: new FamilyTree(
    {
      data : {
        name: '',
        deletable: false,
        node_open: true
      },
      _id: null,
      is_root: true,
      parent: null,
      children : []
    })
};

// Immutable store
const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {

  // handle to store to permit state setting and getting
  private store = _store;
  changes = this.store.asObservable()
    .distinctUntilChanged();

  // Set the state
  setState(state: State) {
    this.store.next(state);
  }

  // Get the current state
  getState(): State {
    return this.store.value;
  }

  // Reset the state to the default
  purge() {
    this.store.next(defaultState);
  }
}
