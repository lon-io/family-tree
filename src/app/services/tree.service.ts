import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {StoreHelper} from './store_helper.service';
/**
 * Created by lon on 1/7/17.
 */

@Injectable()
export class TreeService {
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper
    ) {
    }

    // Calls the api to get all nodes
    getPersons() {
        return this.api.getPersons()
            .do((resp: Array<any>) => {
                if (resp.length !== 0) {
                  let tree = this.storeHelper.unflatten(resp);
                  this.storeHelper.updateTree('tree', tree);
                }else {
                  this.storeHelper.resetTree();
                }
            });
    }

    // Calls the api to add a node
    addPerson(person, parent = null) {
        return this.api.addPerson(person)
            .do((person_: any) => {
              this.storeHelper.addNode('tree', person_, parent);
            });
    }

  // Calls the api to delete a node
  deletePerson(person: any, parent = null) {
    let nodes = this.storeHelper.flatten(person);
    return this.api.deletePersons(person, nodes)
      .do((resp: any) => {
        this.storeHelper.findAndDelete('tree', person, parent);
      });
  }

  // Calls the api to update a node
  editPerson(person: any) {
    return this.api.editPerson(person)
      .do((resp: any) => {
        this.storeHelper.editNode('tree', person);
      });
  }
}
