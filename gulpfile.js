var gulp = require('gulp'),
    less = require('gulp-less'),
    changed = require('gulp-changed'),
    debug = require('gulp-debug');


gulp.task('less', function () {
    return gulp.src('css/style.less')
        .pipe(changed( 'css', {extension: '.css'}))
        .pipe(less({
            paths: [ './css/less/' ]
        }))
        .pipe(debug({title: 'CSS compiled '}))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch("css/style.less", gulp.series("less"));
});

gulp.task('default', gulp.series('watch'));