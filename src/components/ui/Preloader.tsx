/**
 *  Preloader
 *
 *  @type UI Component
 *  @desc a simple preloader for displaying while waiting for app to do something
 */

import React from "react";

import { ThemeColor } from "../../types/Theme";

// Preloader props
interface Props {
  show: boolean;
  color: ThemeColor;
  text?: string;
}

const Preloader: React.FC<Props> & { defaultProps: Partial<Props> } = ({
  show,
  color,
  text
}) => {
  return show ? (
    <React.Fragment>
      <div className="preloader">
        <div className={`bg-${color}`} />
        <div className={`bg-${color}`} />
        <div className={`bg-${color}`} />
        <div className={`bg-${color}`} />
      </div>
      {text ? <p>{text}</p> : null}
    </React.Fragment>
  ) : null;
};

// Preloader default props
Preloader.defaultProps = {
  show: false,
  color: "primary"
};

export default Preloader;
