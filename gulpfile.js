'use strict';

const gulp = require('gulp'),
path = require("path"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
ghPages = require('gulp-gh-pages'),
autoprefixer = require("autoprefixer"), 
chalk = require("chalk");

/**
 * Normalize all paths to be plain, paths with no leading './',
 * relative to the process root, and with backslashes converted to
 * forward slashes. Should work regardless of how the path was
 * written. Accepts any number of parameters, and passes them along to
 * path.resolve().
 *
 * This is intended to avoid all known limitations of gulp.watch().
 *
 * @param {...string} pathFragment - A directory, filename, or glob.
 */
function normalizePath() {
  return path
    .relative(process.cwd(), path.resolve.apply(this, arguments))
    .replace(/\\/g, "/");
}

// SASS Compilation
gulp.task("sass", function() {
  return gulp
    .src(path.resolve("./source/css/", "sass/**/*.scss"))
    .pipe(
      sass({
        includePaths: ["node_modules/foundation-sites/scss"]
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest(path.resolve("./source/css/")));
});

// SASS Compilation
gulp.task("sass:production", function() {
  return gulp
    .src(path.resolve("./source/css/", "sass/**/*.scss"))
    .pipe(
      sass({
        includePaths: ["node_modules/foundation-sites/scss"],
        outputStyle: 'compressed'
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest(path.resolve("./source/css/")));
});

// CSS Copy
gulp.task("copy:css", function() {
  return gulp
    .src(normalizePath("./source/css/") + "/*.css")
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 versions", "ie >= 9", "and_chr >= 2.3"],
          cascade: false
        })
      ])
    )
    .pipe(gulp.dest(normalizePath("./public/css/")))
});

gulp.task('deploy', function() {
  return gulp.src(normalizePath("./build/") + "/**/*")
    .pipe(ghPages());
});

gulp.task(
  "assets",
  gulp.series(
    "sass",
    "copy:css",
  )
);

gulp.task(
  "assets:production",
  gulp.series(
    "sass:production",
    "copy:css",
  )
);

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

const fractal = require('@frctl/fractal').create();

fractal.set('project.title', 'WebcastTV Component Library'); // title for the project
fractal.web.set('builder.dest', 'build'); // destination for the static export
fractal.docs.set('path', `${__dirname}/docs`); // location of the documentation directory.
fractal.components.set('path', `${__dirname}/components`); // location of the component directory.
fractal.web.set('static.path', path.join(__dirname, 'public'));

const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
    skin: "teal",
    "nav": ["docs", "components"] // show docs above components in the sidebar
    // any other theme configuration values here
});

fractal.web.theme(myCustomisedTheme); 

// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

gulp.task("default", gulp.series("assets", "fractal:start"));
gulp.task("build", gulp.series("assets:production", "fractal:build"));
gulp.task("deploy", gulp.series("assets", "fractal:build", "deploy"));