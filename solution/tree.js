class TreeNode {
  #data;
  left;
  right;

  constructor(data) {
    this.#data = data;
    this.left = null;
    this.right = null;
  }

  get data() {
    return this.#data;
  }
}

export class Tree {
  #arr;
  #root;

  constructor(arr) {
    // Make sure array is sorted and have no duplicates
    const uniqueSortedArr = [...new Set(arr)].sort((a, b) => a - b);
    console.log(uniqueSortedArr);

    this.#arr = uniqueSortedArr;
    this.#root = this.#buildTree(uniqueSortedArr);

    this.#prettyPrint(this.#root);
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
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.#prettyPrint(
        node.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }
}
