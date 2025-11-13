import { Tree } from './solution/Tree.js';

// === Utility: Generate random numbers < 100 ===
function generateRandomArray(size = 10, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

// === 1️⃣ Create a BST instance and populate with random numbers ===
const bst = new Tree();

const randomNumbers = generateRandomArray(10, 100);
console.log('🌱 Random numbers:', randomNumbers);

randomNumbers.forEach((num) => bst.insert(num));

// === 2️⃣ Confirm that the tree is balanced ===
console.log('\n✅ Is the tree balanced?', bst.isBalanced());

// === 3️⃣ Print all traversal orders ===
console.log('\n📘 Level Order:');
bst.levelOrderForEach((node) => console.log(node));

console.log('\n📗 Pre Order:');
bst.preOrderForEach((node) => console.log(node));

console.log('\n📙 Post Order:');
bst.postOrderForEach((node) => console.log(node));

console.log('\n📕 In Order:');
bst.inOrderForEach((node) => console.log(node));

// === 4️⃣ Unbalance the tree by adding numbers > 100 ===
console.log('\n⚠️ Adding numbers > 100 to unbalance the tree...');
[101, 150, 200, 250, 300].forEach((num) => bst.insert(num));
bst.printTree();

// === 5️⃣ Confirm the tree is now unbalanced ===
console.log(
  '\n❌ Is the tree balanced after adding big numbers?',
  bst.isBalanced()
);

// === 6️⃣ Rebalance the tree ===
console.log('\n🔧 Rebalancing the tree...');
bst.rebalance();
bst.printTree();

// === 7️⃣ Confirm that the tree is balanced again ===
console.log('\n✅ Is the tree balanced now?', bst.isBalanced());

// === 8️⃣ Print all traversal orders again ===
console.log('\n📘 Level Order (after rebalance):');
bst.levelOrderForEach((node) => console.log(node.value));

console.log('\n📗 Pre Order (after rebalance):');
bst.preOrderForEach((node) => console.log(node.value));

console.log('\n📙 Post Order (after rebalance):');
bst.postOrderForEach((node) => console.log(node.value));

console.log('\n📕 In Order (after rebalance):');
bst.inOrderForEach((node) => console.log(node.value));
