// Breakpoints

const breakpointsSource = [
  ['XX_SMALL', '320px'],
  ['X_SMALL', '360px'],
  ['SMALL', '640px'],
  ['MEDIUM', '768px'],
  ['LARGE', '1024px'],
  ['X_LARGE', '1200px'],
  ['XX_LARGE', '1280px'],
];

// Container names
export const breakpointsArr = breakpointsSource.map(e => e[0]);
// Containers object
export const breakpointsObj = breakpointsSource.reduce(
  (prev, next) => {
    prev[next[0]] = next[1]; // eslint-disable-line
    return prev;
  }, {},
);

/**
 * function to generate media query
 * Example Usage:
 *
 * breakpoint(breakpoints.XX_SMALL);  // returns '@media (min-width: 320px)'
 * breakpoint('200px');               // returns '@media (min-width: 200px)'
 *
 * @param  {string} breakpoint   css unit value (i.e. 10px, 2rem, etc.)
 * @return {string} media query string
 */
export const breakpoint = breakpt => `@media (min-width: ${breakpt})`;
