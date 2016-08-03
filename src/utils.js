const normalizeAttributeKey = (key) => {
  switch (key) {
  case 'className':
    return 'class';
  case 'htmlFor':
    return 'for';
  default:
    return key;
  }
};

/**
 * This is not very sophisticated and is likely error prone.
 */
const normalizeChildren = (children) => {
  if (!Array.isArray(children)) return normalizeChildren([children]);
  return children
    .filter(x => !!x) // Only truthy children
    .map(x => {
      if (typeof x === 'string') {
        return document.createTextNode(x);
      } else if (Array.isArray(x)) {
        return normalizeChildren(x);
      } else {
        return x;
      }
    });
};

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

export const el = (tagName, props, children) => {
  const element = document.createElement(tagName);

  if (props) {
    forEach(props, (v, _k) => {
      const k = normalizeAttributeKey(_k);
      element.setAttribute(k, v);
    });
  }

  normalizeChildren(children).forEach(x => {
    element.appendChild(x);
  });

  return element;
};

