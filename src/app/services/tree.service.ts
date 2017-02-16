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

    getPersons() {
        return this.api.getPersons()
            .do((resp: any) => {
                let tree = this.storeHelper.unflatten(resp);
                this.storeHelper.updateTree('tree', tree);
            });
    }

    addPerson(person, parent = null) {
        return this.api.addPerson(person)
            .do((resp: any) => {
              this.storeHelper.addNode('tree', person, parent);
            });
    }

  deletePerson(person: any, parent = null) {
    return this.api.deletePerson(person)
      .do((resp: any) => {
        this.storeHelper.findAndDelete('tree', person, parent);
      });
  }

  editPerson(person: any) {
    return this.api.editPerson(person)
      .do((resp: any) => {
        this.storeHelper.editNode('tree', person);
      });
  }
}
