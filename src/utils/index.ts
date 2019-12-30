/**
 *  Utils
 *
 *  @type Functions
 *  @desc several utility functions that can be used throughout the site anywhere
 */

export const addRouteAttrToDOM = (
  location: any,
  element: HTMLElement = document.body,
  rootName: string = "home"
) => {
  const route: string = location.pathname.replace("/", "");
  element.dataset.route = route === "" ? rootName : route;
};

export const getCurrentRoute = (location: any, rootName: string = "home") => {
  const route: string = location.pathname.replace("/", "");
  return route === "" ? rootName : route;
};

export const getTransitionDuration = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  if (!style) {
    return;
  }

  const duration = parseFloat(
    style.getPropertyValue("transition-duration").replace("s", "")
  );
  const delay = style.getPropertyValue("transition-delay")
    ? parseFloat(style.getPropertyValue("transition-delay").replace("s", ""))
    : 0;

  const val = duration + delay;
  return val * 1000;
};

export const onTransitionEnd = (element: HTMLElement, callback: any) => {
  const duration = getTransitionDuration(element);
  setTimeout(() => {
    callback(element, duration);
  }, duration);
};

/*
 *  Check search input value for valid characters
 */
export const queryIsInvalid = (input: string): boolean => {
  const re = /[^A-Za-z 0-9\-]/gi;
  return re.test(input);
};
