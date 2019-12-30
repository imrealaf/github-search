/**
 *  Page
 *
 *  @type Higher Order Component
 *  @desc the page wrapper component that adds meta data to a page
 *  @prop title - the title of the page (optional)
 *  @prop descrip - the description of the page (optional)
 *  @prop location - the location object passed from Route
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter, RouteComponentProps } from "react-router-dom";

import config from "../../constants/config";
import { getCurrentRoute } from "../../utils";

// Page props
interface Props extends RouteComponentProps {
  title?: string;
  descrip?: string;
}

const Page: React.FC<Props> = ({ children, title, descrip, location }) => {
  const [currentRoute, setCurrentRoute] = useState(null) as any;

  /*
   *  On route change ..
   */
  useEffect(() => {
    setCurrentRoute(getCurrentRoute(location));
  }, [location, setCurrentRoute]);

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Helmet
        titleTemplate={`%s ${config.meta.titleSeperator} ${config.appName}`}
        defaultTitle={config.appName}
      >
        <title>{title ? title : ""}</title>
        {descrip ? <meta name="description" content={descrip} /> : null}
        <body data-route={currentRoute} />
      </Helmet>
      {children}
    </React.Fragment>
  );
};

export default withRouter(Page);
