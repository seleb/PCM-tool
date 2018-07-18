import { h, Component } from 'preact';

import Input from './input';
import Output from './output';
import Link from './link';
import Field from './field';

import './app.css';
import Audio from './audio';

function r(from, to) {
	return Math.floor(Math.random() * (to - from) + from);
}

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			formula: '',
			volume: 0.5,
			range: 1000,
			period: Infinity,
			fadeIn: 1,
		};
		try {
			this.state = {
				...this.state,
				...JSON.parse(localStorage.getItem('state')),
			};
		} catch (error) {
			console.error(error);
		}
		if (!this.state.formula) {
			this.randomize();
		}
	}

	saveState = () => {
		try {
			localStorage.setItem('state', JSON.stringify(this.state));
		} catch (error) {
			console.error(error);
		}
	}

	setField = (field, value) => {
		this.setState({
			[field]: value,
		});
		this.saveState();
	}

	setFormula = formula => {
		this.setState({
			formula,
		});
		this.saveState();
	}

	randomize = () => {
		const patterns = [
			`(t%${r(0, 250)}*${r(0, 2000)}&t)/${r(0, 500)}&(t%${r(0, 250)}*${r(0, 2000)}&t)/${r(0, 300)}`,
			`t%${r(0, 500)}*${r(0, 4000)}&t/${r(0, 400)}`,
			`t%${r(0, 500)}*${r(0, 2000)}&t`,
			`Math.random()*${this.state.range}`,
			`t/${r(0, 800)}*((t>>${r(0, 24)}|t>>${r(0, 16)})&${r(0, 128)}&t>>${r(0, 16)})`,
			`Math.sin(t/${r(0, 100)})*${r(0, 1000)}+Math.sin(t%${r(0, 1000)}&(t/${r(0, 2000)}))*${r(0, 1000)}`,
			`t/${r(0,32)}|(t<<${r(0,8)}&t/${r(0,8)}<<${r(0,8)})`,
		];
		this.setFormula(patterns[r(0, patterns.length)]);
	}

	restoreDefaults = () => {
		this.setState({
			range: 1000,
			period: Infinity,
			volume: 0.5,
		});
		this.saveState();
	}

	render({ }, {
		formula = '',
		volume = 0,
		range = 0,
		period = Infinity,
		fadeIn = 0,
	}) {
		const audioProps = {
			formula,
			volume,
			range,
			period,
			fadeIn,
		};
		return (
			<div class="app">
				<header>
					PCM tool
				</header>
				<main>
					<div class="input">
						<Input formula={formula} setFormula={this.setFormula} />
						<Field field="range" defaultValue={1000} value={range} setState={this.setField} />
						<Field field="period" defaultValue={Infinity} value={period} setState={this.setField} />
						<Field field="fadeIn" defaultValue={1} value={fadeIn} setState={this.setField} />
						<div class="field">
							<label for="volume">volume:</label>
							<input id="volume" name="volume" type="range" min="0" max="1" step=".01" value={volume} onChange={event => this.setField("volume", event.currentTarget.value)} />
						</div>
						<button onClick={this.randomize}>randomize</button>
						<button onClick={this.restoreDefaults}>restore defaults</button>
						<Audio {...audioProps} />
					</div>
					<Output {...audioProps} />
				</main>
				<footer>
					Links
					<Link url="http://countercomplex.blogspot.com/2011/10/algorithmic-symphonies-from-one-line-of.html">inspiration</Link>
					<Link url="https://twitter.com/SeanSLeBlanc">contact</Link>
				</footer>
			</div>
		);
	}
}
