/**
 * A simple forEach function that can be used on objects as well as arrays.
 * NOTE: No context setting is implemented so this API is not exactly the same
 * as the standard JS [].forEach.
 */
export const forEach = (iterable, fn) => {
  if (typeof iterable !== 'object') {
    throw new Error(`forEach called on non iterable value "${iterable}"`);
  }

  if (Array.isArray(iterable)) {
    return iterable.forEach(fn);
  }

  Object.keys(iterable).forEach((k) => {
    fn(iterable[k], k);
  });
};

/**
 * A super simple partial function. It only does partial application with one
 * argument.
 */
export const partial = (fn, arg) => (...args) => fn(arg, ...args);
