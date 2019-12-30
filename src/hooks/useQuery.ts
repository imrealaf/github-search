/**
 *  useQuery
 *
 *  @type Custom Hook
 *  @desc custom hook to get and parse query string
 */

import { useLocation } from "react-router-dom";

import config from "../constants/config";

export default () => {
  // Get url params (polyfill has been included for older browsers)
  const params = new URLSearchParams(useLocation().search);

  // Get query
  const query = params.get(config.queryVar) as string | null;

  /*  
    Return result ..
    if query, decode the value
  */
  return query ? decodeURI(query) : null;
};
