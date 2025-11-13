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
