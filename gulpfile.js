const gulp = require("gulp");
const webserver = require('gulp-webserver');
const fs = require("fs");
const path = require('path');
gulp.task('webserver',function(){
    gulp.src('.')
        .pipe(webserver({
            host:'localhost',
            port: 8090,
            livereload: true,
            open: true,
            fallback:'index.html',
            middleware:function(req,res,next){
                var filename = req.url.split("/")[1];
                var dataFile = path.join(__dirname,"data",filename+".json"); 
                fs.exists(dataFile,function(exist){
                    if(exist){
                        fs.readFile(dataFile,function(err,data){
                            if(err){
                                throw err;
                            }
                            res.end(data)
                        }) 
                    }else{
                        next();
                    }
                })
                // if(req.url === "/data"){
                //     res.end(fs.readFileSync("data/data.json"));
                // }
                // next();
            }
    }))
});
gulp.task('default',function(){
    gulp.start("webserver");
});