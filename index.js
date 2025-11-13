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

console.log('Recursive');
tree.levelOrderForEach(printNodes, 'recursive');
console.log('Iterative');
tree.levelOrderForEach(printNodes, 'iterative');
