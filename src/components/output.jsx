import { h, Component, } from 'preact';
import './output.css';

export default class Output extends Component {
	constructor() {
		super();
		this.state = {
			copy: undefined,
		};
	}
	copy = (event) => {
		event.target.select();
		document.execCommand('copy');
		event.target.blur();
		clearTimeout(this.copyNotifTimeout);
		this.copyNotifTimeout = setTimeout(() => {
			this.setState({
				copy: undefined,
			});
		}, 1000);
		this.setState({
			copy: 'copied!',
		});
	}
	render({
		formula = '',
		volume = 0,
		range = 0,
		period = Infinity,
		fadeIn = 1,
	}, {
		copy = '',
	}) {

		return (
			<div class="output">
				<textarea class="js" onClick={this.copy} spellcheck="false">
					{`(function(){document.addEventListener("mousedown",function e(){const t=48e3,n=new(window.AudioContext||window.webkitAudioContext)({sampleRate:48e3}),o=n.createGain();o.gain.setValueAtTime(0,0),o.gain.linearRampToValueAtTime(${volume},${fadeIn}),o.connect(n.destination);const a=new Function("t",'t=t%${period}; return (Math.abs(${formula})/${range})%2-1;');let i=0;function r(){const e=n.createBufferSource();e.connect(o);const r=n.createBuffer(1,t,n.sampleRate),u=r.getChannelData(0);for(let e=0;e<t;++e)u[e]=a(i+e);e.buffer=r,e.start(),i+=t}setInterval(r,1e3);r(),document.removeEventListener("mousedown",e)})})();`}
				</textarea>
				<div class="copy-notif">{copy}</div>
			</div>
		);
	}
}
