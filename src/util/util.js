import _ from "lodash";

const RENDER_TYPES = {
  LinkedListNode: "LinkedListNode",
  TreeNode: "TreeNode",
};

export const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

export const parseTree = (state, variables) => {
  // TODO: make sure we show right and left, handle null children
  if (state === null) {
    return {};
  }
  const name = _.get(variables, `${_.get(state, "address")}`, null);
  const children = [];
  const value = _.get(state, "value", null);
  // console.log("parse Tree", state, name, _.get(state, "children", []));

  _.get(state, "children", []).forEach((child) => {
    children.push(this.parseTree(child, variables));
  });

  return { name, attributes: { value }, children };
};

export const parseLL = (state, variables) => {
  const name = _.get(variables, `${_.get(state, "address")}`, null);
  const children = [];
  const value = _.get(state, "value", null);
  // console.log("parse LL", state, name, _.get(state, "children", []));

  _.get(state, "children", []).forEach((child) => {
    children.push(this.parseLL(child, variables));
  });

  return { name, attributes: { value }, children };
};

export const parseStates = (states, variables) => {
  console.log("PARSE STATES", states);
  let res = [];
  let var_nodes = [];
  states.forEach((value) => {
    const context_states = _.get(value, "states", {});
    context_states.forEach((state) => {
      const varT = _.get(state, "variable_type");
      // const state = _.get(c_state, "states", {});

      if (varT === RENDER_TYPES.LinkedListNode) {
        const s = this.parseLL(_.get(state, "states", {}), variables);
        res.push(s);
      } else if (varT === RENDER_TYPES.TreeNode) {
        const s = this.parseTree(_.get(state, "states", {}), variables);
        res.push(s);
      } else {
        if (_.get(state, "name") !== undefined) {
          var_nodes.push({
            name: _.get(state, "name"),
            type: _.get(state, "variable_type"),
            value: _.get(state, "value"),
          });
        }
      }
    });
  });

  if (var_nodes.length !== 0) {
    res.push({ type: "VARIABLES", data: var_nodes });
  }

  return { res };
};
