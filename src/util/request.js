import _ from "lodash";
import axios from "axios";
import qs from "qs";

// TODO: Change this to point to our host
const baseUrl = "http://localhost:5000";

const parseResponse = (response) => {
  const data = _.get(response, "data", {});
  if (_.has(data, ["payload"])) {
    return data["payload"];
  } else {
    return _.omit(data, ["errors"]);
  }
};

export const request = (method) => (query, options = {}) => {
  if (method === "GET" && !_.isEmpty(options.data)) {
    options.params = options.data;
  }

  console.log("Method: " + method)

  return axios({
    method,
    url: `${baseUrl}/${query}`,
    timeout: 60 * 1000,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: "brackets" });
    },
    ...options,
  })
    .then(parseResponse)
    .catch((error) => {
      throw error;
    });
};

// Realistically we will only use get
export default _.chain(["get", "post", "delete", "patch", "put"])
  .map((method) => [method, request(_.toUpper(method))])
  .fromPairs()
  .value();
