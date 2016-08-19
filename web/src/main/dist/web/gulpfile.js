'use strict';

var gulp = require('gulp');
var metal = require('gulp-metal');
var merge = require('merge-stream');
var path = require('path');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

metal.registerTasks({
	bundleCssFileName: 'library.css',
	bundleFileName: 'library.js',
	globalName: 'Library',
	mainBuildJsTasks: ['build:globals:js'],
	moduleName: 'library',
	scssIncludePaths: ['../../../../node_modules'],
	soyDeps: '../../../../node_modules/metal*/src/**/*.soy'
});

gulp.task('copy:deps', function() {
	var copyNodeModules = function(from, to) {
		return gulp
		.src(path.join('../../../../node_modules', from))
		.pipe(gulp.dest(to));
	};

	return merge(
		copyNodeModules('/metal-input-matrix/src/**/*.soy', 'build/vendor/metal/metal-input-matrix'),
		copyNodeModules('/metal-components/build/soy/**/*.soy', 'build/vendor/metal'),
		copyNodeModules('/senna/build/senna.css', 'build/vendor/senna'),
		copyNodeModules('/westyle/**', 'build/vendor/westyle')
	);
});

gulp.task('copy:images', function() {
	return gulp
		.src(path.join('src/images/**/*'))
		.pipe(gulp.dest('build/images'));
});

gulp.task('copy', ['copy:deps', 'copy:images']);

gulp.task('build', function(done) {
	runSequence('clean', 'copy', ['css', 'build:js'], 'uglify', done);
});

gulp.task('browser-sync', function() {
	browserSync.init({
		files: ['**/*.js', '**/*.css', '**/*.png'],
		proxy: {
			target: 'http://localhost:8080',
			ws: true
		},
		open: false,
		port: 8081,
		ui: false,
		reloadDelay: 500,
		reloadOnRestart: true
	});
});

gulp.task('dev', ['browser-sync', 'watch']);