import { h, Component } from 'preact';
import './link.css';

export default class Link extends Component {
	render({
		url = '',
		children,
	}) {
		return (
			<a class="link" href={url}>
				{children}
			</a>
		);
	}
}
