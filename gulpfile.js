//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    cssmin = require('gulp-minify-css'),
    jsmin=require('gulp-uglify'),
    concat=require('gulp-concat'),
    rename=require('gulp-rename');

//定义一个testLess任务（自定义任务名称）
gulp.task('testCssMin', function () {
    gulp.src('src/css/metinfo.css') //该任务针对的文件
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        })) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
});

gulp.task('jsMin', function() {
	gulp.src('src/js/jquery.js')
//		.pipe(concat('main.js'))         //合并所有js到main.js
		.pipe(rename({suffix: '.min'}))  //rename压缩后的文件名 让main.js变成main.min.js
		.pipe(jsmin())                  //执行压缩
		.pipe(gulp.dest('dist/js'))
});

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径