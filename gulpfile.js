/**
 * List of all dependent gulp pluggins 
 * 
 * TODO: Create a constants file <- move strings 
 */
var gulp = require('gulp-help')(require('gulp'));
var inject = require('gulp-inject');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var filesize = require('gulp-filesize');
var clean = require('gulp-rimraf');
var merge = require('gulp-merge');
var Server = require('karma').Server;
var protractor = require("gulp-protractor").protractor;


/**
 * List of local config files
 */
var index_deps = require('./gulpfiles/index_deps')();
var config = require('./gulpfiles/gulp.config')();
var dist = require('./gulpfiles/gulpfile_dist')();


var bowerFiles = gulp.src(index_deps.js.concat(index_deps.css), { base: 'src', read: false });
var srcFiles = gulp.src(config.srcList, { base: 'src', read: false });
var srcTestFiles = gulp.src(config.srcTestList, { base: 'src', read: false });

gulp.task('default', ['help']);

gulp.task('start',
    'Starts webserver with auto reloads on src changes.',
    ['watch', 'run']);

gulp.task('build',
    'Performs all build tasks to create build directory.\n\t\t',
    ['copy', 'copy-index']);

gulp.task('clean', 'Delete build and dist directories.', function () {
    return gulp.src([config.build, 'report'], { read: false })
        .pipe(clean());
});

/** build dependency tasks
 * Copy: bower-components, components to build src directory
 * build index.html 
 */
gulp.task('copy', ['copy-test', 'copy-components', 'copy-deps'], buildIndex);

gulp.task('copy-test','Copy test files to build directory',copyTest);

gulp.task('copy-deps',
    'Copy bower files to build directory',
    function () {
        gulp.src(index_deps.js.concat(index_deps.css), { base: 'src' })
            .pipe(gulp.dest(config.build));
    });

gulp.task('copy-components', 'Copy application source files', copyComponents);

gulp.task('copy-index','Adds CSS and JS files to index.html in build directory.',buildIndex);

/**
 * Below are one time build scripts to run for developement.
 *    when a src file changes it is copy to the build directory. The build 
 *    directory is where we have a running webserver so the developer can see the 
 *    results in real time.  Test are also automatically executed.
 *    
 *    TODO: add protractor
 */
gulp.task('watch', 'Watch src directory and copy to build.', function (cb) {
    watch('src/**/*', function() {
        copyTest();
        copyComponents();
        buildIndex();
    })
});

gulp.task('run',
    'Starts a local webserver and browser.  Reloads page when build directory changes.',
    function () {
        gulp.src('./dist')
            .pipe(webserver({
                livereload: true,
                directoryListing: false,
                open: 'http://localhost:8080/index_wp8.html',
                port: '8080',
                path: '/'
            }));
    });

gulp.task('test',
    'Starts Karma test runner, for unit tests.',
    function (done) {
        new Server({
            configFile: __dirname + '/karma.conf.js'
        }, done).start();
    });

gulp.task('e2e-test',
    '',
    function (done) {
        gulp.src(["./src/test/*.js"])
            .pipe(protractor({
                configFile: "./protractor.conf.js"
            }))
            .on('error', function (e) { throw e })
    });

gulp.task('plato', '', startPlatoVisualizer)   
/**
 * Utility Functions:
 */
function buildIndex() {
    var target = gulp.src('./src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = merge(bowerFiles, srcFiles);
    var src = merge(sources, srcTestFiles);

    target.pipe(inject(src, { relative: true }))
        .pipe(gulp.dest(config.build));
}
function copyTest() {
        console.log(config.srcTestList);
        gulp.src(config.srcTestList, { base: 'src' })
            .pipe(gulp.dest(config.build));
}
function copyComponents() {
    gulp.src(config.srcList, { base: 'src' })
        .pipe(gulp.dest(config.build));
}
function startPlatoVisualizer(done) {
    log('Running Plato');

    var files = ['src/app/**/*.js'];
    var excludeFiles = /.*\_test\.js/;
    var plato = require('plato');

    var options = {
        title: 'Plato Inspections Report', 
        jshint: '.jshintrc',
        exclude: excludeFiles
    };
    var outputDir = 'report';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
        if (done) { done(); }
    }    
}
/**
 * Dist tasks similar to build/copy but creates a distibution directory with 
 * concatinated and minified js and css files.
 */
gulp.task('dist', ['dist-css', 'dist-js'], dist.index);
gulp.task('dist-js', dist.js);
gulp.task('dist-css', dist.css);
gulp.task('dist-index', dist.index);

