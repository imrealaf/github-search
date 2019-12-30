/**
 *  App
 *
 *  @type Component
 *  @desc the main app container component
 *  @prop location - the location object from route props
 */

import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import { Preload, Preloader } from "./ui";
import { Page } from "./hoc";
import { SearchForm, SearchResults, NoResults } from "./";
import { useQuery, useSearch } from "../hooks";

const App: React.FC = () => {
  /*
   *  Add font awesome icons to library
   */
  library.add(fas, fab);

  /*
   *  Search hooks
   */
  const urlQuery = useQuery();
  const search = useSearch(urlQuery);

  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/* Preload */}
      <Preload>
        <FontAwesomeIcon
          className="text-light"
          icon={["fab", "github"]}
          size="4x"
        />
      </Preload>

      {/* Header/nav */}
      <header role="banner">
        <Navbar
          bg="dark"
          variant="dark"
          expand="sm"
          role="navigation"
          className="mb-4"
        >
          <Container>
            <Navbar.Brand className="mx-auto">
              <FontAwesomeIcon icon={["fab", "github"]} className="mr-2" />
              {config.appName}
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>

      {/* Main content */}
      <main id="main" role="main">
        <Page title="Search" descrip="Search GitHub user's and Companies">
          <Container>
            {/* Hidden title */}
            <h1 className="sr-only">{config.appName}</h1>

            {/* The search form */}
            <SearchForm
              query={urlQuery}
              submit={search.submit}
              reset={search.reset}
              items={search.items}
            />

            {/* Preloader (show when pending) */}
            {search.pending ? (
              <div className="text-center py-5">
                <Preloader show={true} color="secondary" />
              </div>
            ) : null}

            {/* Search results */}
            {!search.pending && search.items.length ? (
              <SearchResults {...search} />
            ) : null}

            {/* No results */}
            {!search.pending && search.notFound ? (
              <NoResults query={search.query} />
            ) : null}
          </Container>
        </Page>
      </main>
    </React.Fragment>
  );
};

export default App;
