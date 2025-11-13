import { Tree } from './solution/Tree.js';

const arr = [1, 7, 4, 23, 8, 9];

const tree = new Tree(arr);
tree.insert(5);
tree.insert(10);
tree.insert(25);
tree.printTree();

const printNodes = (node) => {
  console.log(node.value);
};

// In-order Traversal
console.log('In-order Traversal');
tree.inOrderForEach(printNodes);

// Pre-order Traversal
console.log('Pre-order Traversal');
tree.preOrderForEach(printNodes);

// Post-order Traversal
console.log('Post-order Traversal');
tree.postOrderForEach(printNodes);
