import React from "react";
import _ from "lodash";
import { withStyles } from "@material-ui/core/";

import Tree from "./Tree";
import Struct from "./Struct";
import Variables from "./Variables";

const styles = {};

class ComponentRender extends React.Component {
  render() {
    const { data } = this.props;

    let render_object = <></>;

    if (_.get(data, "type") === "VARIABLES") {
      render_object = <Variables data={data} />;
    } else if (_.get(data, "type") === "STRUCT") {
      return <Struct data={data} />;
    } else {
      render_object = <Tree data={data} />;
    }

    return (
      <div id="treeWrapper" style={{ width: "50em", height: "30em" }}>
        {render_object}
      </div>
    );
  }
}
export default withStyles(styles)(ComponentRender);
