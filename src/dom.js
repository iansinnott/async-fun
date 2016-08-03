import { forEach, partial } from './utils.js';

/**
 * This is done mainly for fun to create an API that is similar to that of
 * React. We pass props that are not reserved words and convert them into their
 * DOM equivalent.
 */
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

const stringifyStyle = (styleObject) => {
  let result = '';

  forEach(styleObject, (v, k) => {
    result = result + `${k}:${v};`;
  });

  return result;
};

const normalizeAttributeValue = (key, value) => {
  switch (key) {
  case 'style':
    return stringifyStyle(value);
  default:
    return value;
  }
};

const isPrimative = (x) => {
  switch (typeof x) {
  case 'string':
  case 'boolean':
  case 'number':
    return true;
  default:
    return false;
  }
};

/**
 * This is not very sophisticated and is likely error prone.
 */
export const normalizeChildren = (children) => {
  if (!Array.isArray(children)) return normalizeChildren([children]);
  return children
    .filter(x => !!x) // Only truthy children
    .map(x => {
      if (isPrimative(x)) {
        return document.createTextNode(x);
      } else if (Array.isArray(x)) {
        return normalizeChildren(x);
      } else {
        return x;
      }
    });
};

export const el = (tagName, props, children, ...rest) => {
  if (rest.length) {
    console.warn('Warning: Too many arguments supplied to el. Maybe you forgot to wrap `children` in an array?');
  }

  const element = document.createElement(tagName);

  if (props) {
    forEach(props, (_v, _k) => {
      const k = normalizeAttributeKey(_k);
      const v = normalizeAttributeValue(_k, _v);
      element.setAttribute(k, v);
    });
  }

  if (children) {
    normalizeChildren(children).forEach(x => {
      element.appendChild(x);
    });
  }

  return element;
};

export const div = partial(el, 'div');
export const section = partial(el, 'section');
export const header = partial(el, 'header');
export const footer = partial(el, 'footer');
export const span = partial(el, 'span');
export const h1 = partial(el, 'h1');
export const h2 = partial(el, 'h2');
export const h3 = partial(el, 'h3');
export const h4 = partial(el, 'h4');
export const h5 = partial(el, 'h5');
export const h6 = partial(el, 'h6');
export const p = partial(el, 'p');
export const a = partial(el, 'a');
export const button = partial(el, 'button');
export const em = partial(el, 'em');
export const strong = partial(el, 'strong');
export const table = partial(el, 'table');
export const thead = partial(el, 'thead');
export const tbody = partial(el, 'tbody');
export const tr = partial(el, 'tr');
export const td = partial(el, 'td');
export const i = partial(el, 'i');
export const ul = partial(el, 'ul');
export const ol = partial(el, 'ol');
export const li = partial(el, 'li');
export const form = partial(el, 'form');
export const fieldset = partial(el, 'fieldset');
export const input = partial(el, 'input');
export const textarea = partial(el, 'textarea');
export const select = partial(el, 'select');
export const option = partial(el, 'option');
export const label = partial(el, 'label');
export const pre = partial(el, 'pre');
export const code = partial(el, 'code');
export const iframe = partial(el, 'iframe');
export const img = partial(el, 'img');
export const nav = partial(el, 'nav');
export const style = partial(el, 'style');
export const script = partial(el, 'script');
export const object = partial(el, 'object');
export const video = partial(el, 'video');

// NOTE: There is not yet any specific support for SVG. Creating a secondary
// generic dom creation function that utilizes svg namespacing may be necessary.
export const svg = partial(el, 'svg');
export const g = partial(el, 'g');
export const path = partial(el, 'path');
export const text = partial(el, 'text');
export const circle = partial(el, 'circle');
export const rect = partial(el, 'rect');
export const line = partial(el, 'line');

