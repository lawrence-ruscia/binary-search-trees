import { Tree } from './solution/Tree.js';

const arr = [1];

const tree = new Tree(arr);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);

tree.printTree();

const printNodes = (node) => {
  console.log(node.value);
};

tree.rebalance();
tree.printTree();
console.log({ isBalanced: tree.isBalanced() });
