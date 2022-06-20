module.exports = {
	globDirectory: './dist',
	globPatterns: ['**/*.{html,css,png,js,webmanifest}'],
	swDest: './dist/service-worker.js',
	inlineWorkboxRuntime: true,
	sourcemap: false,
};
