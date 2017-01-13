import {PersonNodeData} from "./person-node-data.interface";
/**
 * Created by lon on 1/13/17.
 */
export interface PersonNode {
  data: PersonNodeData;
  parent: any;
  children: Array<PersonNode>;
}
