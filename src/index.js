import Rx from 'rx';
import { DOM } from 'rx-dom';
import 'normalize.css';

import { forEach } from './utils.js';
import { div, span } from './dom.js';
import './index.styl';

const root = document.querySelector('#root');

const render = (dom, node) => {
  forEach(node.children, x => node.removeChild(x));
  root.appendChild(dom);
};

const Randomizer = () => (
  div(
    {
      style: {
        color: 'orange',
        'font-weight': 'bold',
      },
    },
    div({ className: 'random' }, Math.random())
  )
);

const App = () => (
  div({ className: 'superDiv' }, [
    "This is a baby react ",
    span({ style: { 'font-weight': 'bold' } }, 'SUPER FUN'),
    Randomizer(),
  ])
);

// Initial render
render(App(), root);

const documentReady = DOM.fromEvent(document, 'DOMContentLoaded');

documentReady.subscribe((e) => {
  const clicks = DOM.click(document.body);

  clicks.subscribe((e) => {
    render(App(), root);
  });
});
