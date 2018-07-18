import { h, render } from 'preact';

import App from './components/app';

let root;
function init() {
	render(<App />, document.body, root);
}
init();
