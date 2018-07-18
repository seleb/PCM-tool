(function() {
	function listener() {
		const bufferDuration = 1; // seconds
		const sampleRate = 48000;
		const samples = sampleRate * bufferDuration;;
		const ctx = new(window.AudioContext || window.webkitAudioContext)({
			sampleRate,
		});

		const gainNode = ctx.createGain();
		gainNode.gain.setValueAtTime(0, 0);
		gainNode.gain.linearRampToValueAtTime(`${volume}`, `${fadeIn}`);
		gainNode.connect(ctx.destination);
		const fn = new Function('t', `t=t%${period}; return (Math.abs(${formula})/${range})%2-1;`);

		let t = 0;

		function doIt() {
			const source = ctx.createBufferSource();
			source.connect(gainNode);
			const buffer = ctx.createBuffer(1, samples, ctx.sampleRate);
			const b = buffer.getChannelData(0);
			for (let i = 0; i < samples; ++i) {
				b[i] = fn(t + i);
			}
			source.buffer = buffer;
			source.start();
			t += samples;
		}
		const interval = setInterval(doIt, bufferDuration * 1000);
		doIt();
		document.removeEventListener('mousedown', listener);
	};
	document.addEventListener('mousedown', listener);
}());
