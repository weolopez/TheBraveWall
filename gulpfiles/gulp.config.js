module.exports = function() {
    var config = {
	src: './src',
	build: './dist/apps/TheBraveWall/ngApp',
	dist: '',
	srcTestList: [
        'src/test/**/*'
    ],
	srcList: [
        'src/app/**/*',
        'src/assets/**/*',
        '!src/**/*_test.js'
    ]
    }
return config;
};
