import {PersonNode} from '../person-node/person-node.interface';
import {PersonNodeData} from '../person-node/person-node-data.interface';
import * as _ from 'underscore';
/**
 * Created by lon on 1/13/17.
 */
export class FamilyTree {
  _root: PersonNode;

  constructor(data: PersonNode) {
    this._root = data;
  }

  // Traverse the entire tree
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

  // Traverse a node in the tree; may also traverse the whole tree if the node is the root node
  traverseNodeDF = (node, callback) => {

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
    })(node);

  }

  // Calls the specified traversal method on the tree, passing the callback as an argument
  contains = (callback, traversal)  => {
    traversal.call(this, callback);
  }

  // Calls the specified traversal method on the node passed, passing the callback as an argument
  nodeContains = (node, callback, traversal)  => {
    traversal.call(this, node, callback);
  }

  // Adds node - data as a child to node - todata; using the specified traversal method
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

  // Edits the title property of a node
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

  // Removes a node; and hence, all its children
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

  // Gets an array containing the id of a node and those of all its (direct or indirect) children
  getFlattenedNode = (person: any, traversal: (node, callback) => any, nodes = []) => {
    let callback =  (node) => {
      nodes.push(node._id);
    };
    this.nodeContains(person, callback, traversal);
    return nodes;
  }

  // Helper method to get the index of an item in an array
  findIndex = (arr, data) => {
    let index;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === data._id) {
        index = i;
      }
    }

    return index;
  }

}
