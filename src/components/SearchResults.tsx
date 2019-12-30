/**
 *  SearchResults
 *
 *  @type Component
 *  @desc displays list of results
 */

import React from "react";
import { ListGroup } from "react-bootstrap";

// SearchResults props
interface Props {
  query: string | null;
  items: any;
  reset: any;
}

const SearchResults: React.FC<Props> = ({ query, items, reset }) => {
  const getContext = () => {
    return items.length === 1 ? "repository" : "repositories";
  };
  return (
    <React.Fragment>
      {/* Info text */}
      <p className="text-secondary">
        {items.length} {getContext()} found for <strong>{query}</strong>
      </p>

      {/* Results list */}
      <ListGroup role="list" variant="flush">
        {items.map((item: any, index: number) => {
          return (
            <ListGroup.Item key={index} role="listitem">
              <h5 className="mb-0">{item.name}</h5>
              <p className="text-sm text-secondary mb-2">{item.language}</p>
              {item.description ? <p>{item.description}</p> : null}
              <span className="text-sm">
                <strong>{item.watchers}</strong> watcher
                {item.watchers !== 1 ? "s" : ""}
              </span>
              <span className="text-sm ml-2">
                <strong>{item.forks}</strong> fork
                {item.forks !== 1 ? "s" : ""}
              </span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </React.Fragment>
  );
};

export default SearchResults;
