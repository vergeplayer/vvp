/**
 * jsdoc-to-markdown
 * 借助jsdoc-to-markdown 生成帮助文档
 * Created by zhengzk on 2015/11/26.
 */
"use strict";
var jsdoc2md = require("jsdoc-to-markdown");
var through = require("through2");

function Jsdoc2md(options) {
    return through.obj(function(file, enc, callback) {
        var self = this;
        if (file.isNull()) {
            // Do nothing if no contents
        }
        //console.log(file.relative);
        if (file.isBuffer()) {
            var buf = new Buffer(0);
            var jsdoc2mdStream = jsdoc2md(options);
            jsdoc2mdStream.on("readable", function(){
                var chunk = this.read();
                if (chunk) buf = Buffer.concat([ buf, chunk ]);
            });
            jsdoc2mdStream.on("end", function(){
                file.contents = buf;
                self.push(file);
                return callback();
            });
            jsdoc2mdStream.on("error", function(err){
                //console.log(err);
                self.emit("error", 'jsdoc-to-markdown', err.message);
            });
            jsdoc2mdStream.end(file.contents);
        }

        if (file.isStream()) {
            file.contents = file.contents.pipe(jsdoc2md(options));
            self.push(file);
            return callback();
        }
    });
}
module.exports = Jsdoc2md;
