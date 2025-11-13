# 🌳 Binary Search Tree (BST)

A **Binary Search Tree (BST)** is a fundamental data structure in computer science.  
It is a specialized form of a binary tree where each node follows this **ordering property**:

> For every node:
>
> - All values in its **left subtree** are _less than_ the node’s value.
> - All values in its **right subtree** are _greater than_ the node’s value.

This property enables efficient **searching, insertion, and deletion** — typically in `O(log n)` time for balanced trees.

---

## 🚀 Features

- ✅ Insert and delete nodes
- 🔍 Search for values
- 📏 Compute node height and depth
- 🔄 Check if the tree is balanced
- ⚖️ Rebalance the tree automatically
- 🧭 Traverse the tree in:
  - Level order
  - Pre-order
  - In-order
  - Post-order
- 🌱 Pretty-print the tree structure in the console

---

## 🧪 How It Works

The project demonstrates how to:

1. Create a BST from random numbers.
2. Check whether the tree is balanced.
3. Print the tree using various traversal methods.
4. Intentionally unbalance the tree by inserting large numbers.
5. Rebalance the tree and confirm the balance is restored.

---

## 🧩 Example Driver Script

```js
// Create a tree from random numbers
const bst = new BinarySearchTree();
const randomNumbers = generateRandomArray(10, 100);
randomNumbers.forEach((num) => bst.insert(num));

console.log('Is balanced?', bst.isBalanced());

// Unbalance the tree
[150, 200, 250].forEach((num) => bst.insert(num));
console.log('Is balanced after adding large numbers?', bst.isBalanced());

// Rebalance and check again
bst.rebalance();
console.log('Is balanced after rebalance?', bst.isBalanced());
```

🧠 Concepts Covered

- Binary Tree & BST Properties

- Recursion & Traversal Algorithms

- Tree Balancing and Rebalancing

- Time and Space Complexity

- Data Structure Design in JavaScript
