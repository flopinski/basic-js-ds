const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const addInside = (node, data) => {
      if (!node) return new Node(data);

      if (node.data === data) return node;

      if (data < node.data) {
        node.left = addInside(node.left, data);
      } else {
        node.right = addInside(node.right, data);
      }
      return node;
    };
    this.treeRoot = addInside(this.treeRoot, data);
  }

  has(data) {
    const searchInside = (node, data) => {
      if (!node) return false;

      if (node.data === data) return true;

      if (data < node.data) return searchInside(node.left, data);
      else return searchInside(node.right, data);
    };

    return searchInside(this.treeRoot, data);
  }

  find(data) {
    const findInside = (node, data) => {
      if (!node) return null;
      if (node.data === data) return node;

      if (data < node.data) return findInside(node.left, data);
      else return findInside(node.right, data);
    };
    return findInside(this.treeRoot, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left
          return node;  
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left
        }
        node.data = minFromRight.data

        node.right = removeNode(node.right, minFromRight.data)
        return node
      }
    };
    this.treeRoot = removeNode(this.treeRoot, data);

  }

  min() {
    if (!this.treeRoot) return
    
    let node = this.treeRoot;
    while (node.left) node = node.left;

    return node.data
  }

  max() {
    if (!this.treeRoot) return;
    
    let node = this.treeRoot;
    while (node.right) node = node.right;

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
