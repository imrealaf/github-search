/**
 *  API
 *
 *  @desc create api using axios and make requests to GitHub api
 */

import axios from "axios";

// Create api instance
const api = axios.create({
  baseURL: "https://api.github.com/"
});

/**
 *  searchUsers
 *
 *  @desc make get request to find user with best match of query
 */
const searchUsers = (query: string) => {
  return query
    ? api.get("/search/users", {
        params: {
          q: query
        }
      })
    : undefined;
};

/**
 *  getRepos
 *
 *  @desc make get request to find user's repos based on username
 */
const getRepos = (username: string) => {
  return username
    ? api.get(`/users/${username}/repos?sort=updated&direction=desc`)
    : undefined;
};

// Return api
export default {
  searchUsers,
  getRepos
};
