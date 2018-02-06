var gulp = require('gulp');
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {
    // Bootstrap
    gulp.src([
            './node_modules/bootstrap/dist/**/*',
            '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
            '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
        ])
        .pipe(gulp.dest('./vendor/bootstrap'))

    // jQuery
    gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ])
        .pipe(gulp.dest('./vendor/jquery'))
})

gulp.task("styles", function() {
    gulp.src("./scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task("serve", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch("./scss/*.scss", ["styles"]);
    gulp.watch("./**/*.html").on("change", browserSync.reload);
});

// Default task
gulp.task('default', ['styles', 'vendor', 'serve']);