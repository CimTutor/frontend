import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <AceEditor
        mode="c_cpp"
        theme="xcode"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        // value={value}
      />
    );
  }
}

export default CodeEditor;
