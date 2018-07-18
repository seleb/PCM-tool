import { h, Component } from 'preact';

import './audio.css';

export default class Audio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			graph: [],
		};

		this.bufferDuration = 1; // seconds
		this.sampleRate = 48000;
		this.samples = this.sampleRate * this.bufferDuration;
		this.ctx = new (window.AudioContext || window.webkitAudioContext)({
			sampleRate: this.sampleRate,
		});

		this.gainNode = this.ctx.createGain();
		this.gainNode.gain.value = props.volume;
		this.gainNode.connect(this.ctx.destination);
	}

	makeFn = () => {
		const {
			formula = '',
			range = 0,
			period = Infinity,
		} = this.props;
		return new Function('t', `t=t%${period}; return (Math.abs(${formula})/${range})%2-1;`);
	}

	doIt = () => {
		const fn = this.makeFn();
		const source = this.ctx.createBufferSource();
		source.connect(this.gainNode);
		const buffer = this.ctx.createBuffer(1, this.samples, this.ctx.sampleRate);
		const b = buffer.getChannelData(0);
		for (let i = 0; i < this.samples; ++i) {
			b[i] = fn(this.t + i);
		}
		source.buffer = buffer;
		source.start();
		this.lastSource = source;
		this.t += this.samples;
	}

	start = () => {
		this.setState({
			playing: true,
		});
		this.interval = setInterval(this.doIt, this.bufferDuration * 1000);
		this.t = 0;
		this.doIt();
	}

	stop = () => {
		this.lastSource.stop();
		this.setState({
			playing: false,
		});
		clearInterval(this.interval);
		this.t = 0;
	}

	componentDidUpdate({
		volume,
	}) {
		if (volume !== this.props.volume) {
			this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
		}
	}

	render({
		formula = '',
	}, {
		playing = false,
	}) {
		return playing ? <button onClick={this.stop}>pause</button> : <button onClick={this.start}>play</button>;
	}
}
