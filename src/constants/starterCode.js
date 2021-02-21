export const STARTER_CODE = `// This Test Script is for injection for array algorithms
#include <cstdio>
#include <cstdlib>
#include <string>
#include "LoggerHelper.h"
#include "Logger.h"
#include "LinkedListNodes.h"
#include "TreeNodes.h"

using namespace std;

Logger l;
LoggerHelper logger;

void printIntegers() {
    int y  = 69;
    for(int i = 0; i < 5; i++) {
        cout << i << endl;
    }
}

int main() {
    logger.setLogger(l);
    //Add your code here
    IntegerTreeNode *intTreeNode1= new IntegerTreeNode(1);
    IntegerTreeNode *intTreeNode2 = new IntegerTreeNode(2);
    StringTreeNode *strTreeNode1 =new StringTreeNode("String Node 1");
    StringTreeNode *strTreeNode2 = new StringTreeNode("String Node 2");
    StringTreeNode *strTreeNode3 = new StringTreeNode("String Node 3");

    strTreeNode2->left(strTreeNode3);
    intTreeNode1->left(strTreeNode1);
    intTreeNode1->right(intTreeNode2);
    strTreeNode1->left(strTreeNode2);

    printIntegers();

    IntegerLLNode *intNode = new IntegerLLNode(5);
    StringLLNode *stringNode = new StringLLNode("123123123");
    intNode->next(stringNode);

    return 0;
}`;
