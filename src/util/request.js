import _ from "lodash";
import axios from "axios";
import qs from "qs";

const baseUrl = "http://www.omdbapi.com";

const apiKey = "&apikey=29dc1524";

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

  return axios({
    method,
    url: `${baseUrl}/${query}${apiKey}`,
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
