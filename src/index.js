import Rx from 'rx';
import { DOM } from 'rx-dom';
import 'normalize.css';

import { forEach } from './utils.js';
import { div, span, button } from './dom.js';
import './index.styl';

const root = document.querySelector('#root');

const render = (dom, node) => {
  forEach(node.children, x => node.removeChild(x));
  root.appendChild(dom);
};

const Randomizer = () => (
  div(
    {
      className: 'Randomizer',
      style: {
        color: 'orange',
        'font-weight': 'bold',
      },
    },
    [
      div({ className: 'random' }, Math.random()),
      button({ className: 'clicker' }, 'Randomize'),
    ]
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

  // This is a fairly simple example of the power of Rx. It's a bit silly, since
  // we would normally probably subscribe to events directly on a dom node
  // instaed of filtering by the classname on event.target, however for this
  // case it's useful since every click renders a new button to the dom so we
  // can't attach a listener to it right away.
  const clicks = DOM.click(document.body)
    .filter(e => e.target.className === 'clicker');

  clicks.subscribe((e) => {
    render(App(), root);
  });
});
