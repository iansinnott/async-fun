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

const refreshClickStream = Rx.Observable.fromEvent(document.querySelector('.refresh'), 'click');

const reqStream = refreshClickStream
  .map(() => {
    const randomOffset = Math.floor(Math.random() * 500);
    return `https://api.github.com/users?since=${randomOffset}`;
  })
  .merge(Rx.Observable.just('https://api.github.com/users'));

// NOTE: The difference between map and flat map is that flatMap will unwrap
// observables, which is quite useful for mappings where the returned value of
// the mapper is an observable. This is much preferable to subscribing to every
// mapped observable that comes back to us
const resStream = reqStream.flatMap(url => {
  return Rx.Observable.fromPromise(axios.get(url));
});

documentReady.subscribe(() => {

  // Initial render
  render(App(initialState), root);

  resStream.subscribe(
    res => {
      render(App({
        users: res.data,
      }), root);
    },
    err => console.error(err),
    () => console.log('done')
  );

});
