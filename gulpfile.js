const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const plumer = require('gulp-plumber');
const aliasCombo = require('gulp-alias-combo');
const Watch = require('./gulp/watch');
const runSequence = require('run-sequence');
const gulpWatch = require('gulp-watch');
const PATHS = require('./config').paths;
const watch = new Watch(PATHS.appRootPath);

gulp.task('less', function (e) {
    return (
        gulp.src(['src/**/*.less', '!src/common/**/*.less'])
            .pipe(plumer({
                errorHandler: function (err) {
                    this.emit('end')
                }
            }))
            .pipe(less())
            .pipe(rename({
                extname: '.wxss'
            }))
            .pipe(gulp.dest('src'))
    );
});

gulp.task('watch:less', function () {
    gulp.watch(['src/**/*.less', '!src/common/**/*.less'], ['less']);
});


gulp.task('wless', () => {
    return gulpWatch(__dirname + '/src/**/*.less', (detail) => {
        return gulp.src(__dirname + '/src/**/*.less').pipe(less()).pipe(rename({
            extname: '.wxss'
        })).pipe(gulp.dest('src'))
    });
})

gulp.task('default', (cb) => {
    return runSequence('wless', cb);
});