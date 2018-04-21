var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');



gulp.task('html', function() {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist')) //выбираем файлы, с которыми нужно что-то сделать
    .pipe(browserSync.reload({
        stream:true
    }));
});

gulp.task('css', function () {
    return gulp.src('./src/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream:true
        }));
        
});

gulp.task('img', function () {
    return gulp.src('./src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('del:dist', function () {
    return del.sync('./dist');
});

gulp.task('watch', function() {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/sass/**/*.scss', ['css']);
    //первый аргумент - то, за какими файлами мы следим
    //второй аргумент - то, что нужн осделать, когда эти файлы меняются
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('build',['html', 'css', 'img']);
gulp.task('start', ['del:dist','build','server', 'watch']);