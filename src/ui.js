import { forEach } from './utils.js';
import { div, span, button } from './dom.js';

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

export const App = () => (
  div({ className: 'superDiv' }, [
    'This is a baby react ',
    span({ style: { 'font-weight': 'bold' } }, 'SUPER FUN'),
    Randomizer(),
  ])
);

export const render = (dom, node) => {
  forEach(node.children, x => node.removeChild(x));
  root.appendChild(dom);
};

