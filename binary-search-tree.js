class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

//   if insertion point is found

//   create new node

// if value to be inserted < this key

//   go left

// else go right

  insert(val) {
    let newNode = new Node(val);
    if (this.root == null) {
      this.root = newNode;
    }
    let currentNode = this.root;

    while (currentNode.val !== val){
      if (currentNode.val < val) {
        if (currentNode.right == null) currentNode.right = newNode;
        currentNode = currentNode.right;
      } else {
        if (currentNode.left == null) currentNode.left = newNode;
        currentNode = currentNode.left;
      } 
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode= this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < currentNode.val) {
      // val is less than current val, move left.
      if (currentNode.left == null) {
        currentNode.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentNode.left)
    }
    if (val > currentNode.val) {
      // val is greater than current val, move right.
      if (currentNode.right == null) {
        currentNode.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, currentNode.right)
    }
  }


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root == null) return undefined;
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.val == val) {
        return currentNode;
      }
      if (currentNode.val > val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node=this.root) {
    if (node == null) return;
    if (node.val == val) return node;
    if (node.val > val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  // dfsPreOrder() {
  //   let arr = [];
  //   let currNode;
  //   let visitStack = [this.root];
  //   while (visitStack.length) {
  //     currNode = visitStack.pop();
  //     arr.push(currNode.val);
  //     if (currNode.right) visitStack.push(currNode.right);
  //     if (currNode.left) visitStack.push(currNode.left);
  //   }
  //   return arr;
  // }

  //using recursion:

  dfsPreOrder() {
    let arr = []
    let current = this.root;
    function traverse(node) {
    arr.push(node.val);  
    node.left && traverse(node.left, arr);
    node.right && traverse(node.right, arr);
    }
    traverse(current);
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let arr = []
    let current = this.root;
    function traverse(node) {
    node.left && traverse(node.left, arr);
    arr.push(node.val);
    node.right && traverse(node.right, arr);
    }
    traverse(current);
    return arr;
  }


  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let arr = []
    let current = this.root;
    function traverse(node) {
    node.left && traverse(node.left, arr);
    node.right && traverse(node.right, arr);
    arr.push(node.val);
    }
    traverse(current);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let arr = []
    let queue = [this.root]
    let currentNode;
    while (queue.length) {
      currentNode = queue.shift();
      arr.push(currentNode.val);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right)
    }
    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  /** notes:
   * leaf notes may be deleted easily.
   * if deleted note only has one child, we can link the parent to the child.
   */

  remove(val) {
    let currentNode = this.root;
    let parent = this.root;
    while(currentNode) {

      // console.log(`parent is ${parent.val} and current node is ${currentNode.val}`)
      // we've found our node:
      if (currentNode.val == val) {
        // CASE: node to be deleted is a LEAF node (no children)
        if (!currentNode.left && !currentNode.right) {
          if (parent.right == currentNode) parent.right = null;
          if (parent.left == currentNode) parent.left = null;
          return currentNode
        }
        // CASE: node to be deleted only has one child
        if (currentNode.right && !currentNode.left || !currentNode.right && currentNode.left) {
          if (parent.right == currentNode) parent.right = currentNode.right || currentNode.left
          if (parent.left == currentNode) parent.left = currentNode.right || currentNode.left
          return currentNode
        }
        // CASE: node to be deleted has two children - deleted node.right has no .left property
        // does deleted node .right have a .left? - if not, simply replace current node with currentnode.right, set left side of removed node to left side of currentNode.right.
        if (!currentNode.right.left)  {
          if (currentNode.right.val > parent.val) {
            parent.right = currentNode.right;
            parent.right.left = currentNode.left;
          } else {
            parent.left = currentNode.right;
            parent.left.left = currentNode.left;
          }
          return currentNode;
        }
        // CASE: node to be deleted has two children, with nested .left property
        if (currentNode.right.left) {
          // go find the min value within the currentNode.right substructure, and replace the deleted node with THAT node.
          let curr = currentNode.right.left
          let prevNode = currentNode.right
          let minNode;
          while (curr) {
           // get lowest node
            if (!curr.left) {
              minNode = curr;
            }
            // get parent of lowest node
            if (curr.left) {
              prevNode = prevNode.left
            }
            curr = curr.left;
          }
          // connect our nodes
          prevNode.left = minNode.right;
          minNode.right = currentNode.right;
          minNode.left = currentNode.left;
          parent.right = minNode;
          return currentNode;
        }
      }
      
      if (currentNode.val > val) {
        parent = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.val < val) {
        parent = currentNode;
        currentNode = currentNode.right;
      }

    }
    return currentNode;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  // isBalanced(node=this.root) {
  //   if (node == null) return 0;
  //   // check left subtree:
  //   let leftHeight = this.isBalanced(node.left);
  //   if (leftHeight == -1) return false;
  //   // check right subtree:
  //   let rightHeight = this.isBalanced(node.right);
  //   if (rightHeight == -1) return false;

  //   return true;
  // }

  isBalanced(current=this.root) {
    if (current === null) return;
    // if max - min <= 1 ? returns true or false;
    // if maxDepth - minDepth > 1, the tree is unbalanced -> one side has more branches; 
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    let current = this.root;
    while (current) {
      if (current.right.right) {
        current = current.right;
      }
      if (!current.right.right) return current.val;
    }
  }
  
  dfsInOrderIterative() {
    let curr = this.root;
    let stack = [];
    let dfs = [];
    while (stack.length > 0 || curr) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop();
      if (curr) {
        dfs.push(curr.val);
        curr = curr.right;
      }
    }
    return dfs;
  }
}


module.exports = BinarySearchTree;
