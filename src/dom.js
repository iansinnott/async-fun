import {
  forEach,
  normalizeAttributeKey,
  normalizeChildren,
  partial,
} from './utils.js';

export const el = (tagName, props, children) => {
  const element = document.createElement(tagName);

  if (props) {
    forEach(props, (v, _k) => {
      const k = normalizeAttributeKey(_k);
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
export const input = partial(el, 'input');
export const select = partial(el, 'select');
export const option = partial(el, 'option');

