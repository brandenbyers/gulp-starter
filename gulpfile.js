var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    reload 		 = browserSync.reload;
    traceur      = require('gulp-traceur'),
    concat 		 = require('gulp-concat'),
    uglify		 = require('gulp-uglify'),
    minifyHTML   = require('gulp-minify-html')
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var src = 'public/src',
	dist = 'public/dist',
	paths = {
		js: src + '/js/*.js',
		scss: src + '/scss/*.scss',
		html: src + '/**/*.html'
	};

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: dist + '/'
		}
	});
});

gulp.task('js', function () {
	gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(traceur())
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

gulp.task('sass', function () {
	gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'))
		.pipe(reload({stream:true}));
});

gulp.task('html', function () {
	gulp.src(paths.html)
//	.pipe(minifyHTML())
	.pipe(gulp.dest(dist + '/'));
});

gulp.task('bs-reload', function () {
	browserSync.reload();
})

gulp.task('default', ['js', 'sass', 'html', 'browser-sync'], function () {
	gulp.watch(paths.js, ['js', browserSync.reload]);
  	gulp.watch(paths.scss, ['sass']);
 	gulp.watch(paths.html, ['html', 'bs-reload']);
});