import { h, ComponentProps } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';
import './output.css';

export default function Output({
	formula = '',
	volume = 0,
	range = 0,
	period = Infinity,
	fadeIn = 1,
}) {
	const refNotifTimeout = useRef<number>();
	const [state, setState] = useState<string | null>(null);
	const copy = useCallback<NonNullable<ComponentProps<'textarea'>['onClick']>>((event) => {
		event.currentTarget.select();
		document.execCommand('copy');
		event.currentTarget.blur();
		clearTimeout(refNotifTimeout.current);
		refNotifTimeout.current = setTimeout(() => {
			setState(null);
		}, 1000);
		setState('copied!');
	}, []);

	return (
		<div class="output">
			<textarea class="js" onClick={copy} spellcheck={false} title="click to copy script">
				{`(function(){document.addEventListener("mousedown",function e(){const t=48e3,n=new(window.AudioContext||window.webkitAudioContext)({sampleRate:48e3}),o=n.createGain();o.gain.setValueAtTime(0,0),o.gain.linearRampToValueAtTime(${volume},${fadeIn}),o.connect(n.destination);function a(t){t=t%${period}; return (Math.abs(${formula})/${range})%2-1;};let i=0;function r(){const e=n.createBufferSource();e.connect(o);const r=n.createBuffer(1,t,n.sampleRate),u=r.getChannelData(0);for(let e=0;e<t;++e)u[e]=a(i+e);e.buffer=r,e.start(),i+=t}setInterval(r,1e3);r(),document.removeEventListener("mousedown",e)})})();`}
			</textarea>
			<div class="copy-notif">{state}</div>
		</div>
	);
}
