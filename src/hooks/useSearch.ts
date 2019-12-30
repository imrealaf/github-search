/**
 *  useSearch
 *
 *  @type Custom Hook
 *  @desc custom hook to search users are repos
 */

import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import config from "../constants/config";
import api from "../api";
import { queryIsInvalid } from "../utils";

export default (urlQuery: string | null) => {
  /*
   *  History and location api
   */
  const history = useHistory();
  const location = useLocation();

  /*
   *  Create state
   */
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [notFound, setNotFound] = useState(false);

  /*
   *  On mount, if valid query in url, submit search
   */
  useEffect(() => {
    if (urlQuery && !queryIsInvalid(urlQuery)) {
      submit(urlQuery);
    }
  }, []);

  /*
   *  Set query paramter in search history
   */
  const setQueryParam = (queryString: string) => {
    const params = new URLSearchParams(location.search);
    params.set(config.queryVar, encodeURI(queryString));

    history.push({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  /*
   *  Reset query paramter in search history
   */
  const resetQueryParam = () => {
    const params = new URLSearchParams(location.search);
    params.delete(config.queryVar);

    history.push({
      pathname: location.pathname
    });
  };

  /*
   *  Handle no results function
   */
  const doNoResults = () => {
    setItems([]);
    setNotFound(true);
    setPending(false);
  };

  /*
   *  Submit search function
   */
  const submit = async (searchValue: string) => {
    // Set query state
    setQuery(searchValue);

    // Set query param
    setQueryParam(searchValue);

    // Set state as pending
    setPending(true);

    // Search request success ..
    try {
      // Capture search reults
      const usersResult = (await api.searchUsers(searchValue)) as any;

      // If items found ..
      if (usersResult.data.items.length) {
        // Grab the first user as the match
        const user = usersResult.data.items[0];

        // Look for user repos
        const reposResult = (await api.getRepos(user.login)) as any;

        // If user has repos ..
        if (reposResult.data.length) {
          // Set repo items
          setItems(reposResult.data);

          // Set not pending
          setPending(false);

          // User doesn't have any repos
        } else {
          doNoResults();
        }

        // No items found
      } else {
        doNoResults();
      }

      // Search request failed ..
    } catch (error) {
      doNoResults();
    }
  };

  /*
   *  Reset search function
   */
  const reset = () => {
    setItems([]);
    setNotFound(false);
    setPending(false);
    setQuery("");
    resetQueryParam();
  };

  /*
   *  Return api
   */
  return {
    query,
    items,
    pending,
    notFound,
    submit,
    reset
  };
};
