import { forEach } from './utils.js';
import {
  div,
  ul,
  li,
  img,
  a,
  button,
} from './dom.js';

const UserListItem = (user, index) => (
  li(
    { className: 'UserListItem' },
    [
      img({ src: user.avatar_url, className: 'avatar' }),
      a({ href: user.html_url, target: '_blank' }, user.login),
      button({ className: 'remove', 'data-index': index }, 'X'),
    ]
  )
);

const UserList = (users) => (
  div(
    { className: 'UserList' },
    ul(null, users.map(UserListItem))
  )
);

export const App = ({ users }) => (
  div({ className: 'superDiv' }, [
    button({ className: 'refresh' }, 'Refresh'),
    (users.length ? UserList(users) : (
      div({ className: 'loading' }, 'Loading...')
    )),
  ])
);

export const render = (dom, node) => {
  forEach(node.children, x => node.removeChild(x));
  root.appendChild(dom);
};

