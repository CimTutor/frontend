import _ from "lodash";

const RENDER_TYPES = {
  LinkedListNode: "LLNode",
  TreeNode: "TreeNode",
  Arrays: /\[([\d]+)\]/g,
};

export const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

export const parseTree = (state, variables) => {
  if (state === null) {
    return {};
  }
  const name = _.get(variables, `${_.get(state, "address")}`, null);
  const children = [];
  const value = _.get(state, "value", null);

  _.get(state, "children", []).forEach((child) => {
    children.push(parseTree(child, variables));
  });

  return { name, attributes: { value }, children };
};

export const parseLL = (state, variables) => {
  const name = _.get(variables, `${_.get(state, "address")}`, null);
  const children = [];
  const value = _.get(state, "value", null);

  _.get(state, "children", []).forEach((child) => {
    children.push(parseLL(child, variables));
  });

  return { name, attributes: { value }, children };
};

const parseArray = (state, variables) => {
  const name = _.get(variables, `${_.get(state, "address")}`, null);
  const values = _.get(state, "values", null);
  const pointers =   _.get(state, "pointers", []).map(element => 
    element.map(pointer => _.get(variables, pointer, null))
  );

  return { name, values: values, pointers: pointers, type: _.get(state, "variable_type") };
};

const parseStruct = (state, variables) => {
  const name = _.get(state, "name", "");
  const fields = _.get(state, "fields", []);
  const rf = _.map(fields, (field) => {
    return { field: _.get(field, "Field"), value: _.get(field, "Value") };
  });
  return { name, values: rf, type: "STRUCT" };
};

// Need to parse states with relation to context
export const parseStates = (states, variables) => {
  let res = [];
  let var_nodes = [];

  states.forEach((value) => {
    const context_states = _.get(value, "states", {});
    const context_var_nodes = [];

    context_states.forEach((state) => {
      const varT = _.get(state, "variable_type", "");

      if (varT.includes(RENDER_TYPES.LinkedListNode)) {
        const s = parseLL(_.get(state, "states", {}), variables);
        res.push(s);
      } else if (varT.includes(RENDER_TYPES.TreeNode)) {
        const s = parseTree(_.get(state, "states", {}), variables);
        res.push(s);
      } else if (_.get(state, "values", undefined)) {
        const s = parseArray(state, variables);
        context_var_nodes.push(s);
      } else if (_.get(state, "fields", undefined) !== undefined) {
        const s = parseStruct(state, variables);
        res.push(s);
      } else {
        if (_.get(state, "name") !== undefined) {
          context_var_nodes.push({
            name: _.get(state, "name"),
            type: _.get(state, "variable_type"),
            value: _.get(state, "value"),
          });
        }
      }
    });

    if (context_var_nodes.length !== 0) {
      res.push({ type: "VARIABLES", data: context_var_nodes });
    }
  });

  console.log("PARSED RES", res);

  return { res };
};

export const parseStatesForMenu = (states, res) => {
  let contexts = [];
  // dogshit code, idgaf anymore

  states.forEach((value) => {
    const contextStates = _.get(value, "states", {});
    const contextName = _.get(value, "context", {});
    const contextVariables = [];
    if (contextStates.length !== 0) {
      let v = false;
      contextStates.forEach((state) => {
        if (_.get(state, "value") || _.get(state, "values")) {
          v = true;
        } else {
          contextVariables.push(_.get(state, "name"));
        }
      });

      if (v) {
        contextVariables.push("Variables");
      }

      contexts.push({ context: contextName, variables: contextVariables });
    }
  });

  return { contexts };
};
