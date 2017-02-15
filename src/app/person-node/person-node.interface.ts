import {PersonNodeData} from './person-node-data.interface';
/**
 * Created by lon on 1/13/17.
 */
export interface PersonNode {
  _id: any;
  is_root: boolean;
  data: PersonNodeData;
  parent: any;
  children: Array<PersonNode>;
}
