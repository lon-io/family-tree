/**
 * Created by lon on 2/8/17.
 */
import { Injectable } from '@angular/core';
import {Store} from './store.service';
import {PersonNodeData} from '../person-node/person-node-data.interface';
@Injectable()
export class StoreHelper {
  constructor(private store: Store) {}

  createNewPersonNode = (data: PersonNodeData) => {
    return {
      data : data,
      parent: null,
      children : []
    };
  }

}
