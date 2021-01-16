import _ from "lodash";

const createSymbols = (type, strings) =>
  _.fromPairs(
    _.map(strings, (str) => {
      return [str, `${_.toUpper(type)}_${_.toUpper(str)}`];
    })
  );

const defaults = ["CREATE", "DELETE", "INDEX", "NEW", "SHOW", "UPDATE"];

const actions = [["code", []]];

export default _.chain(actions)
  .map((action) => {
    let [module, customActions] = action;
    return [module, createSymbols(module, _.concat(defaults, customActions))];
  })
  .fromPairs()
  .value();
