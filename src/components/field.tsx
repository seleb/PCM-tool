import { h, Component } from 'preact';
import './field.css';

export default class Link extends Component {
	onChange = ({
		currentTarget: {
			value,
		},
	}) => {
		const {
			setState,
			field,
			defaultValue,
		} = this.props;
		setState(field, (isNaN(value) || !value) ? defaultValue : Math.floor(Number(value)));
	}

	componentDidMount(){
		this.onChange({currentTarget:{value:this.props.value}});
	}

	render({
		field = '',
		value = 0,
		defaultValue = 0,
		setState,
	}) {
		return (
			<div class="field">
				<label for={field}>{field}:</label>
				<input type="text" id={field} name={field} value={value} onChange={this.onChange} />
			</div>
		);
	}
}
