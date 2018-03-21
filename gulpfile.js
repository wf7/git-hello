/*
* @Author: c_wangfan-005
* @Date:   2016-09-14 09:50:19
* @Last Modified by:   c_wangfan-005
* @Last Modified time: 2016-09-14 13:35:50
*/

'use strict';
/**
 * 1.less编译压缩合并
 * 2.js合并压缩混淆
 * 3.img复制
 * 4.html压缩
 */


var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
gulp.task('style',function(){
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
		stream:true
	}));
});

var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream:true
	}));
})

gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}));
})

var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
		stream:true
	}));
});

var browserSync=require('browser-sync')
gulp.task('serve', function () {
    browserSync({
        server:'./dist'
    },function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/*.html',['html']);
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);

    
});




