import { h, Component } from 'preact';
import './input.css';

export default class Link extends Component {
	render({
		formula,
		setFormula,
	}) {
		return (
			<textarea cols="50" rows="5" id="audio" type="text" onChange={event => setFormula(event.currentTarget.value)} value={formula} />
		);
	}
}
