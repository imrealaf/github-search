# GitHub Search

## Assumptions made:

- Using the /search/users endpoint to create a better user experience in case the user does not know the full valid github username
- Using the /search/users endpoint, if results found, return the first item (as a best match)
- From found user result, get user's repos
- If user has no repos, no results shown
