import { h, ComponentChildren } from 'preact';
import './link.css';

export default function Link({
	url = '',
	children,
}: {
	url?: string;
	children?: ComponentChildren;
}) {
	return (
		<a class="link" href={url}>
			{children}
		</a>
	);
}
