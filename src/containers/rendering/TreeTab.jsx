import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import _, { mapValues } from "lodash";

const styles = {
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
};

class ControlledTreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
      selected: [],
    };
  }

  handleToggle = (event, nodeIds) => {
    this.setState({ expanded: nodeIds });
  };

  handleSelect = (event, nodeIds) => {
    this.setState({ selected: nodeIds });
    if (nodeIds.charAt(0) !== "#") {
      this.props.handleTreeClick(parseInt(nodeIds, 10));
    }
  };

  render() {
    const { classes, res, contexts } = this.props;
    const { expanded, selected } = this.state;
    let index = 0;
    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={this.handleToggle}
        onNodeSelect={this.handleSelect}
      >
        {_.map(contexts, (context, i) => {
          return (
            <TreeItem
              key={i}
              nodeId={"#".concat(i)}
              label={_.get(context, "context")}
            >
              {_.map(_.get(context, "variables"), (variable, i2) => {
                index += 1;
                return (
                  <TreeItem
                    key={i2}
                    nodeId={(index - 1).toString()}
                    label={variable}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    );
  }
}

export default withStyles(styles)(ControlledTreeView);
