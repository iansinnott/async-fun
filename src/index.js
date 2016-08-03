import 'normalize.css';

import { div, span } from './dom.js';

const root = document.querySelector('#root');

root.appendChild(
  div({ className: 'superDiv' }, [
    "I've also heard that creating your own react clone is ",
    span(null, 'SUPER FUN'),
  ])
);
