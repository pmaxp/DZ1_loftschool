var gulp = require("gulp"),
	browserSync = require('browser-sync');

// Static server
gulp.task('browser-sync', function() {
    browserSync({
    	port: 9000,
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch([
    	'app/*.html',
    	'app/js/**/*.js',
    	'app/css/**/*.css'	
    ]).on('change', browserSync.reload);
});

gulp.task('default',['server', 'watch']);