//chiccazzo l'ha scritto sto codice
var source, destination, lr, gulp, gutil, jade, stylus;

gulp = require('gulp');
jade = require('gulp-jade');
gutil = require('gulp-util');

var libs = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-aria/angular-aria.min.js',
  'bower_components/angular-material/angular-material.min.js',
  'bower_components/angular-resource/angular-resource.min.js'
];

var cssLibs = [
  'bower_components/angular-material/angular-material.min.css'
]

source = {
  templates: "templates/**/*.jade",
  scripts: "scripts/**/*.js",
  styles: "styles/**/*.css",
  assets: "assets/**/*"
};

destination = {
  build: "build/",
  scripts: "build/scripts",
  styles: "build/styles",
  libs: "build/libs",
  assets: "build/assets"
};

gulp.task("templates", function(event) {
  return gulp.src(source.templates).pipe(jade({
    pretty: true
  })).pipe(gulp.dest(destination.build));
});

gulp.task("scripts", function(event) {
  return gulp.src(source.scripts)
  .pipe(gulp.dest(destination.scripts));
});

gulp.task("styles", function(event) {
  return gulp.src(source.styles)
  .pipe(gulp.dest(destination.styles));
});

gulp.task("assets", function(event) {
  return gulp.src(source.assets)
  .pipe(gulp.dest(destination.assets));
});

gulp.task("libs", function(event) {
  return gulp.src(libs)
    .pipe(
      gulp.dest(destination.libs)
    );
});

gulp.task("cssLibs", function(event) {
  return gulp.src(cssLibs)
    .pipe(
      gulp.dest(destination.libs)
    );
});

gulp.task("watch", function() {
  gulp.watch(source.templates, ["templates"]);
  gulp.watch(source.scripts, ["scripts"]);
  gulp.watch(source.styles, ["styles"]);
  gulp.watch(source.assets, ["assets"]);
  gulp.watch(destination.build+'/**/*', refresh);
});

gulp.task('serve', function () {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname+'/' + destination.build + '/'));
  app.listen(4000);
  lr = require('tiny-lr')();
  lr.listen(35729);
});

gulp.task("default", ["templates", "scripts", "styles", "assets", "libs", "cssLibs", "watch", "serve"]);

refresh = function(event) {
  var fileName = require('path').relative(__dirname, event.path);
  gutil.log.apply(gutil, [gutil.colors.magenta(fileName), gutil.colors.cyan('built')]);
  lr.changed({
    body: { files: [fileName] }
  });
}
