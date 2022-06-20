import preact from '@preact/preset-vite';
import visualizer from 'rollup-plugin-visualizer';
import type { UserConfigExport } from 'vite';

const config: UserConfigExport = ({ command }) => ({
	root: 'src',
	base: './',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			plugins: [...preact(), command === 'build' && visualizer({ open: true })],
		},
	},
});

export default config;
