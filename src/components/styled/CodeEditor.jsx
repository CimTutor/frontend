import React from "react";
import AceEditor from "react-ace";
import { withStyles } from "@material-ui/core";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";

const styles = {
  "error-marker": "",
};

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange, activeLine, readOnly } = this.props;
    let markers = [];
    markers.push(
      activeLine
        ? {
            startRow: activeLine - 1,
            endRow: activeLine,
            className: "ace_marker",
            type: "text",
          }
        : {}
    );
    return (
      <AceEditor
        mode="c_cpp"
        theme="xcode"
        width="100%"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={value}
        markers={markers}
        readOnly={readOnly}
      />
    );
  }
}

export default withStyles(styles)(CodeEditor);
