let gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('postcss-cssnext'),
    short = require('postcss-short'),
    nested = require('postcss-nested'),
    mqpacker = require("css-mqpacker");

gulp.task('css', () => {
  let processors = [
    autoprefixer({grid: true}),
    cssnext,
    short,
    nested,
    mqpacker,
  ];
  return gulp.src('src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('public/css'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: "public"
    },
    notify: false
  })
});

gulp.task('watch',['serve', 'css'], () => {
  gulp.watch('src/css/*.css', ['css'])
  gulp.watch('public/index.html', browserSync.reload)
});

gulp.task('default', ['watch']);
