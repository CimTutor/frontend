import React from "react";
import Tree from "react-d3-tree";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "*intTreeNode1",
  attributes: { value: "1" },
  children: [
    {
      name: "strTreeNode1",
      attributes: { value: "String Node 1" },
      children: [
        {
          name: "*strTreeNode2",
          attributes: { value: "String Node 2" },
          children: [
            {
              name: "*strTreeNode3",
              attributes: { value: "String Node 3" },
              children: [],
            },
          ],
        },
      ],
    },
    { name: "*intTreeNode2", attributes: { value: "2" }, children: [] },
  ],
};

export default function OrgChartTree(data) {
  // console.log(orgChart);
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "50em", height: "25em" }}>
      <Tree data={data} />
    </div>
  );
}

export function RenderTree(data) {
  console.log("data", data);
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "50em", height: "25em" }}>
      <Tree data={data} />
    </div>
  );
}
