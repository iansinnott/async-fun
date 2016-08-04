import { forEach } from './utils.js';
import {
  div,
  span,
  ul,
  li,
  img,
  a,
} from './dom.js';

const UserListItem = (user) => (
  li(
    { className: 'UserListItem' },
    [
      img({ src: user.avatar_url, className: 'avatar' }),
      a({ href: user.html_url, target: '_blank' }, user.login),
    ]
  )
);

const UserList = (users) => (
  div(
    { className: 'UserList' },
    ul(null, users.map(u => UserListItem(u)))
  )
);

export const App = (props) => (
  div({ className: 'superDiv' }, [
    'This is a baby react ',
    span({ style: { 'font-weight': 'bold' } }, 'SUPER FUN'),
    UserList(props.users),
  ])
);

export const render = (dom, node) => {
  forEach(node.children, x => node.removeChild(x));
  root.appendChild(dom);
};

