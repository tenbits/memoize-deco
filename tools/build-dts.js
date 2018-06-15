var dts = require('dts-bundle');

dts.bundle({
	name: 'memoize',
	main: './ts-temp/memoize-deco.d.ts',
	out: './typings/index.d.ts'
});

io.File.copyTo('./ts-temp/typings/index.d.ts', './lib/memoize-deco.d.ts');