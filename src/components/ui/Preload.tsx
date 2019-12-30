/**
 *  Preload
 *
 *  @type Higher Order Component
 *  @desc covers the DOM and acts a a preloader while the app loads
 */

import React, { useEffect, useState, useRef } from "react";

import config from "../../constants/config";
import { ThemeColor } from "../../types/Theme";
import { onTransitionEnd } from "../../utils";

// Preload props
interface Props {
  color: ThemeColor;
  animateOut: boolean;
}

const Preload: React.FC<Props> & { defaultProps: Partial<Props> } = ({
  children,
  color,
  animateOut
}) => {
  const [show, setShow] = useState(true);
  const ref = useRef(null) as any;

  /*
   *  On mount ..
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (animateOut) {
        ref.current.style.opacity = 0;
        onTransitionEnd(ref.current, () => {
          document.body.style.overflow = "";
          setShow(false);
        });
      } else {
        document.body.style.overflow = "";
        setShow(false);
      }
    }, config.preload.delayTime);
  }, [animateOut, ref]);

  /*
   *  Generate classes function
   */
  const className = (): string => {
    const classes = ["preload", `bg-${color}`];
    return classes.join(" ");
  };

  /*
   *  Render
   */
  return show ? (
    <div className={className()} ref={ref}>
      {children}
    </div>
  ) : null;
};

// Preload default props
Preload.defaultProps = {
  color: "dark",
  animateOut: true
};

export default Preload;
