var dts = require('dts-bundle');
var package = io.File.read('package.json');

dts.bundle({
	name: package.name,
	main: './ts-temp/memoize-deco.d.ts',
	out: './typings/index.d.ts'
});

io.File.copyTo('./ts-temp/typings/index.d.ts', './lib/memoize-deco.d.ts');