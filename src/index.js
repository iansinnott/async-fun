import Rx from 'rx';
import axios from 'axios';
import 'normalize.css';

window.Rx = Rx;

import { App, render } from './ui.js';
import './index.styl';

const root = document.querySelector('#root');

const initialState = {
  users: [],
};

const documentReady = Rx.Observable.fromEvent(document, 'DOMContentLoaded');
const clickStream = Rx.Observable.fromEvent(document, 'click');
const refreshClickStream = clickStream.filter(e => e.target.className === 'refresh');
const removeClickStream = clickStream
  .filter(e => e.target.className === 'remove')
  .map(e => e.target.dataset.index);

const reqStream = refreshClickStream
  .startWith('startup click') // NOTE: This value is not important. It simply kicks off the click stream
  .map(() => {
    const randomOffset = Math.floor(Math.random() * 500);
    return `https://api.github.com/users?since=${randomOffset}`;
  });

// NOTE: The difference between map and flat map is that flatMap will unwrap
// observables, which is quite useful for mappings where the returned value of
// the mapper is an observable. This is much preferable to subscribing to every
// mapped observable that comes back to us
const resStream = reqStream.flatMap(url => {
  return Rx.Observable.fromPromise(axios.get(url));
});

// NOTE: This doesn't work well, because every time the user clicks the remove
// button we get the initial last resStream result back. This means that the
// index in question is indeed updated correctly but the other indices are also
// effectively reset since the user object at those indices in the initial array
// hasn't changed. This is stateful. Maybe the best approach is indeed creating
// a stream per row as staltz did in the example.
const suggestionsStream = removeClickStream
  .startWith('0') // Note that we must start off the stream since no remove buttons are rendered initially
  .combineLatest(resStream, (index, res) => {
    const users = res.data;
    const randomizedUser = users[Math.floor(Math.random() * users.length)];
    const result = users.slice(0, 3);

    result[index] = randomizedUser;

    return result;
  })
  .merge(refreshClickStream.map(() => null));

documentReady.subscribe(() => {

  // Initial render
  render(App(initialState), root);

  suggestionsStream.subscribe(
    users => {
      console.log(users);
      render(App({ users: users || [] }), root);
    },
    err => console.error(err),
    () => console.log('done')
  );

});
