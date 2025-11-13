class TreeNode {
  value;
  left;
  right;

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  #root;

  constructor(arr) {
    // Make sure array is sorted and have no duplicates
    const uniqueSortedArr = [...new Set(arr)].sort((a, b) => a - b);
    console.log(uniqueSortedArr);

    this.#root = this.#buildTree(uniqueSortedArr);
  }

  insert(value) {
    this.#root = this.#insertNode(this.#root, value);
  }

  delete(value) {
    this.#root = this.#deleteNode(this.#root, value);
  }

  printTree() {
    this.#prettyPrint(this.#root);
  }

  find(value) {
    return this.#findNode(this.#root, value);
  }

  levelOrderForEach(callback, type = 'recursive') {
    if (!callback || typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    if (type === 'recursive') {
      this.#levelOrderRec(callback);
    }
    if (type === 'iterative') {
      this.#levelOrderIter(callback);
    }
  }

  inOrderForEach(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    this.#inOrderRec(this.#root, callback);
  }

  preOrderForEach(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    this.#preOrderRec(this.#root, callback);
  }

  postOrderForEach(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    this.#postOrderRec(this.#root, callback);
  }

  height(value = this.#root.value) {
    const node = this.find(value);
    return this.#heightFindValue(node);
  }

  depth(value) {
    return this.#depthFindValue(this.#root, value, 0);
  }

  #insertNode(node, value) {
    // Insert if position is empty
    if (node === null) return new TreeNode(value);

    // If value is smaller, insert to left subtree
    if (value < node.value) {
      node.left = this.#insertNode(node.left, value);
    }

    // If value is larger, insert to right subtree
    if (value > node.value) {
      node.right = this.#insertNode(node.right, value);
    }

    // Return updated root
    return node;
  }

  #deleteNode(node, value) {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this.#deleteNode(node.left, value);
    }
    if (value > node.value) {
      node.right = this.#deleteNode(node.right, value);
    }
    if (value === node.value) {
      // Case A: Node is a leaf
      if (node.left === null && node.right === null) {
        return null;
      }

      // Case B: Node has one child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // Case C: Node has two children
      const successor = this.#findSuccessor(node.right);
      node.value = successor.value;
      node.right = this.#deleteNode(node.right, successor.value);
    }

    return node;
  }

  #findSuccessor(node) {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  #findNode(node, value) {
    if (node === null) return null;

    if (value === node.value) {
      return node;
    }
    if (value < node.value) {
      return this.#findNode(node.left, value);
    }
    if (value > node.value) {
      return this.#findNode(node.right, value);
    }

    return node;
  }

  #levelOrderIter(callback) {
    if (this.#root === null) return;

    // Store unvisited nodes
    const queue = [];
    queue.push(this.#root);

    while (queue.length !== 0) {
      const node = queue.shift(); // Remove element to visit

      // Visit node
      callback(node);

      // Add children to visit to the queue
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  #levelOrderRec(callback) {
    const result = [];

    function traverse(node, level) {
      if (node === null) return;

      // Create a new sublist if this is the first time visiting this level
      if (result.length === level) {
        result.push([]);
      }

      callback(node);

      result[level].push(node.value);
      // Recurse left and right with incremented level
      traverse(node.left, level + 1);
      traverse(node.right, level + 1);
    }

    traverse(this.#root, 0);
  }

  #inOrderRec(node, callback) {
    if (node === null) return;

    this.#inOrderRec(node.left, callback);
    callback(node);
    this.#inOrderRec(node.right, callback);
  }

  #preOrderRec(node, callback) {
    if (node === null) return;

    callback(node);
    this.#preOrderRec(node.left, callback);
    this.#preOrderRec(node.right, callback);
  }

  #postOrderRec(node, callback) {
    if (node === null) return;

    this.#postOrderRec(node.left, callback);
    this.#postOrderRec(node.right, callback);
    callback(node);
  }

  #heightFindValue(node) {
    if (node === null) return -1;

    const leftHeight = this.#heightFindValue(node.left);
    const rightHeight = this.#heightFindValue(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  #depthFindValue(node, value, currentDepth) {
    if (node === null) return -1;

    if (node.value === value) return currentDepth;

    if (value < node.value) {
      return this.#depthFindValue(node.left, value, currentDepth + 1);
    } else {
      return this.#depthFindValue(node.right, value, currentDepth + 1);
    }
  }

  #buildTree(arr) {
    return this.#sortedArrayToBST(arr, 0, arr.length - 1);
  }

  #sortedArrayToBST(arr, left, right) {
    if (left > right) return null;

    // Pick middle element as root
    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(arr[mid]);

    // Recursively build left and right subtrees
    root.left = this.#sortedArrayToBST(arr, left, mid - 1);
    root.right = this.#sortedArrayToBST(arr, mid + 1, right);

    return root;
  }

  #prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.#prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.#prettyPrint(
        node.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }
}
