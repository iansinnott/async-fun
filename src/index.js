import 'normalize.css';

import {
  el,
} from './utils.js';

const root = document.querySelector('#root');

root.appendChild(
  el('div', { class: 'superDiv' }, 'Some Text Content')
);

console.log('Welcome to the bundle!');
