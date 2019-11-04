'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	pug = require('gulp-pug'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	imagemin = require('gulp-imagemin'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		pug: 'build/',
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		pug: 'src/*.pug',
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/style/main.styl',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		pug: 'src/**/*.pug',
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.styl',
		img: 'src/img/**/*.*'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "dev"
};
gulp.task('pug:build', function () {
	gulp.src('src/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('src'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(prefixer())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('image:build', function () {
	gulp.src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
    'pug:build',
	'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('watch', function () {
	watch([path.watch.pug], function (event, cb) {
		gulp.start('pug:build');
	});
	watch([path.watch.html], function (event, cb) {
		gulp.start('html:build');
	});
	watch([path.watch.style], function (event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.js], function (event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function (event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function (event, cb) {
		gulp.start('fonts:build');
	});
});
gulp.task('default', ['build', 'webserver', 'watch']);
