import Rx from 'rx';
import { DOM } from 'rx-dom';
import axios from 'axios';
import 'normalize.css';

window.Rx = Rx;
window.DOM = DOM;

import { App, render } from './ui.js';
import './index.styl';

const root = document.querySelector('#root');

const initialState = {
  users: [],
};

// Initial render
render(App(initialState), root);

const documentReady = DOM.fromEvent(document, 'DOMContentLoaded');

const reqStream = Rx.Observable.just('https://api.github.com/users');

// NOTE: The difference between map and flat map is that flatMap will unwrap
// observables, which is quite useful for mappings where the returned value of
// the mapper is an observable. This is much preferable to subscribing to every
// mapped observable that comes back to us
const resStream = reqStream.flatMap(url => {
  return Rx.Observable.fromPromise(axios.get(url));
});

documentReady.subscribe(() => {

  resStream.subscribe(
    res => {
      console.log(res.data);
      render(App({
        users: res.data,
      }), root);
    },
    err => console.error(err),
    () => console.log('done')
  );

});
