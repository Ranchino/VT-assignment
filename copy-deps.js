const fs = require('fs');
const path = require('path');

const root = './src';
const outdir = './build';
const filter = ['.html', '.css'];
const files = [];

function explore(root, filter, output) {
	if (!fs.existsSync(root)) {
		return;
	}
	fs.readdirSync(root)
		.map(filename => path.join(root, filename))
		.forEach(filename => {
			const stat = fs.lstatSync(filename);
			if (stat.isDirectory()) {
				return explore(filename, filter, output);
			}
			if (filter.findIndex(pattern => filename.includes(pattern)) == -1) {
				return;
			}
			output.push(filename);
		})
}

function copy_files(files) {
	files
		.map(filename => filename.replace(/src[\/\\]/, ''))
		.map(filename => [path.join(root, filename), path.join(outdir, filename)])
		.forEach(([src, dst]) => {
			const dir = path.dirname(dst)
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir)
			}
			fs.copyFile(src, dst, err => err && console.error(err))
		})
}

explore(root, filter, files);
copy_files(files);