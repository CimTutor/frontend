let markdown=`# Hello 👋

We have made two custom data structures available for you to use:

* Linked List Node
* Tree Node

## Linked List Node

For a Linked List Node we have added support for following data types:

* Int -> \`IntegerLLNode\`
* Short Int -> \`ShortIntLLNode\`
* Long Int -> \`LongIntLLNode\`
* Unsigned Int -> \`UnsignedIntLLNode\`
* Float -> \`FloatLLNode\`
* Double -> \`DoubleLLNode\`
* Signed Char -> \`SignedCharLLNode\`
* Unsigned Char -> \`UnsignedCharLLNode\`
* String -> \`StringLLNode\`

Examples:
\`\`\`c++

  IntegerLLNode *intNode = new IntegerLLNode(1);
  StringLLNode *stringNode = new StringLLNode("String Node 1");
  DoubleLLNode *doubleNode = new DoubleLLNode(2.5);

  intNode->next(stringNode);
  stringNode->next(doubleNode);
  
\`\`\`

The Linked List Node allows you to create a linked list that contains the data types listed above.

## Binary Tree Node

For a Binary Tree Node we have added support for following data types:

* Int -> \`IntegerTreeNode\`
* Short Int -> \`ShortIntTreeNode\`
* Long Int -> \`LongIntTreeNode\`
* Unsigned Int -> \`UnsignedIntTreeNode\`
* Float -> \`FloatTreeNode\`
* Double -> \`DoubleTreeNode\`
* Signed Char -> \`SignedCharTreeNode\`
* Unsigned Char -> \`UnsignedCharTreeNode\`
* String -> \`StringTreeNode\`

Examples:
\`\`\`c++

IntegerTreeNode *intTreeNode1= new IntegerTreeNode(x);
IntegerTreeNode *intTreeNode2 = new IntegerTreeNode(2);
StringTreeNode *strTreeNode1 =new StringTreeNode("String Node 1");
StringTreeNode *strTreeNode2 = new StringTreeNode("String Node 2");
StringTreeNode *strTreeNode3 = new StringTreeNode("String Node 3");

strTreeNode2->left(strTreeNode3);
intTreeNode1->left(strTreeNode1);
intTreeNode1->right(intTreeNode2);
strTreeNode1->left(strTreeNode2);


TreeNode * root = strTreeNode1->getRoot();
TreeNode * root_left = root->getLeft();
TreeNode * root_right = root->getRight();

\`\`\`

The Binary Tree Node allows you to create a binary tree that contains the data types listed above. \n
You can call getRoot() on any node from tree to get the root of the tree.\n
Given anynode, you can get the left and right child by calling getLeft() and getRight().\n
\n
\n
`

export default markdown