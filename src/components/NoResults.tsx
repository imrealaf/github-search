/**
 *  NoResults
 *
 *  @type Component
 *  @desc display no results message
 */

import React from "react";

// NoResults props
interface Props {
  query: string | null;
}

const NoResults: React.FC<Props> = ({ query }) => {
  return (
    <p className="lead py-3">
      No repositories found for <strong>{query}</strong>
    </p>
  );
};

export default NoResults;
