import {PersonNode} from '../person-node/person-node.interface';
import {PersonNodeData} from '../person-node/person-node-data.interface';
/**
 * Created by lon on 1/13/17.
 */
export class FamilyTree {
  _root: PersonNode;

  constructor(data: PersonNode) {
    this._root = data;
    // this._root.data.deletable = false;
  }

  // createNewPersonNode = (data: PersonNodeData) => {
  //   return {
  //     data : data,
  //     parent: null,
  //     children : []
  //   };
  // }

  findIndex = (arr, data) => {
    let index;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === data._id) {
        index = i;
      }
    }

    return index;
  }

  traverseDF = (callback) => {

    // this is a recurse and immediately-invoking function
    (function recurse(currentNode: PersonNode ) {
      // step 2
      for (let i = 0, length = currentNode.children.length; i < length; i++) {
        // step 3
        recurse(currentNode.children[i]);
      }

      // step 4
      callback(currentNode);

      // step 1
    })(this._root);

  }

  contains = (callback, traversal)  => {
    traversal.call(this, callback);
  }

  add = (data, toData, traversal) => {
    let child = data,
      parent = null,
      callback = function (node) {
        if (node._id === toData._id) {
          parent = node;
        }
      };

    this.contains(callback, traversal);

    if (parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  }

  edit = (data, traversal) => {
    let person = null,
      callback = function (node) {
        if (node._id === data._id) {
          person = node;
        }
      };

    this.contains(callback, traversal);

    if (person) {
      person = data;
    } else {
      throw new Error('Cannot edit a non-existent node.');
    }
  }

  remove = function(data, fromData, traversal) {
    let tree = this,
      parent = null,
      childToRemove = null,
      index;

    let callback = function (node) {
      if (node._id === fromData._id) {
        parent = node;
      }
    };

    this.contains(callback, traversal);

    if (parent) {
      index = this.findIndex(parent.children, data);

      if (index === undefined) {
        throw new Error('Node to remove does not exist.');
      } else {
        childToRemove = parent.children.splice(index, 1);
      }
    } else {
      throw new Error('Parent does not exist.');
    }

    return childToRemove;
  };
}
