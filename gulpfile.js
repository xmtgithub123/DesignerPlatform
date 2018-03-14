var args = require('yargs').argv;

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    merge = require('merge-stream');
var tinylr;

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

gulp.task('styles', function() {
    gulp.src('_sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(clean({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('watch', function() {
    gulp.watch('_sass/*.scss', ['styles']);
    gulp.watch('public/stylesheets/**', notifyLiveReload);
    gulp.watch('views/**/*.*', notifyLiveReload);
});

// gulp release --langs cn
// gulp release --langs en
gulp.task('release', function() {
    var langs = args.langs;

    var css = gulp.src('public/stylesheets/**')
        .pipe(gulp.dest(langs + '/stylesheets'));
    var javascripts = gulp.src('public/javascripts/**')
        .pipe(gulp.dest(langs + '/javascripts'));
    var images = gulp.src('public/images/**')
        .pipe(gulp.dest(langs + '/images'));

    var entry = gulp.src('public/' + langs + '.html')
        .pipe(rename({
            basename: 'index'
        }))
        .pipe(gulp.dest(langs));

    return merge(css, javascripts, images, entry);
});

gulp.task('releaseall', function() {
    var cn_css = gulp.src('public/stylesheets/**')
        .pipe(gulp.dest('cn/css'));
    var cn_javascripts = gulp.src('public/javascripts/**')
        .pipe(gulp.dest('cn/javascripts'));
    var cn_images = gulp.src('public/images/**')
        .pipe(gulp.dest('cn/images'));

    var cn_entry = gulp.src('public/cn.html')
        .pipe(rename({
            basename: 'index'
        }))
        .pipe(gulp.dest('cn'));

    // var en_css = gulp.src('public/stylesheets/**')
    //     .pipe(gulp.dest('en/css'));
    // var en_javascripts = gulp.src('public/javascripts/**')
    //     .pipe(gulp.dest('en/javascripts'));
    // var en_images = gulp.src('public/images/**')
    //     .pipe(gulp.dest('en/images'));

    // var en_entry = gulp.src('public/en.html')
    //     .pipe(rename({
    //         basename: 'index'
    //     }))
    //     .pipe(gulp.dest('en'));

    return merge(cn_css, cn_javascripts, cn_images, cn_entry,
        en_css, en_javascripts, en_images, en_entry);
});

gulp.task('default', [
    'styles',
    'livereload',
    'watch'
]);