import 'normalize.css';

import { forEach } from './utils.js';
import { div, span } from './dom.js';

const root = document.querySelector('#root');

const render = (dom, node) => {
  forEach(node.children, x => node.removeChild(x));
  root.appendChild(dom);
};

const App = () => (
  div({ className: 'superDiv' }, [
    "I've also heard that creating your own react clone is ",
    span(null, 'SUPER FUN'),
    div({
      style: { color: 'orange' },
    }, Math.random()),
  ])
);

// Initial render
render(App(), root);

// Rerender to display new randomized values occasionally
setInterval(() => {
  render(App(), root);
}, 1000);
