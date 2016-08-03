import 'normalize.css';

import { el } from './utils.js';

window.el = el;

const root = document.querySelector('#root');

root.appendChild(
  el('div', { class: 'superDiv' }, [
    "I've also heard that creating your own react clone is ",
    el('span', null, 'SUPER FUN'),
  ])
);
