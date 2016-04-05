/**
 * webpack.config
 * Copyright 2016, webpack.config.js
 * MIT Licensed
 * @since 2016/2/22.
 * @modify 2016/4/5.
 * @author zhengzk
 **/
var webpack = require('webpack');
var path = require( 'path' );

module.exports = {
  //output: {
  //  filename: 'b.js'
  //},
  //resolve: {
  //  extensions: ['', '.css', '.js','.jade']
  //},
  //module: {
    loaders: [
      {test: /\.js/, loader:function(){
        //console.log('aaa');
        return "";
      }},
      {test: /\.jade$/, loader:"jade2js"},
      //{test: require.resolve("vergequery"), loader: "expose?$!expose?vergequery"},
      {test: /\.swf$/, loader: "file?name=[path][name].[ext]"}
      //{
      //  test: /\.js$/,
      //  exclude: /(node_modules)/,
      //  loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
      //}
    ],
  resolve: {
    alias:{
      js:"src/scripts/js",
      js$:"src/scripts/js",
      sass:"src/stylesheets/sass",
      sass$:"src/stylesheets/sass",
      jade:"src/templates/jade",
      jade$:"src/templates/jade"
    },
    root: [ path.resolve( '.' )],
    //modulesDirectories:["web_modules","node_modules"],
    extensions: ['', '.js', '.jade','sass','swf']
    //packageMains: [ "webpack" , "browser" , "web" , "browserify" , [ "jam" , "main" ], "main" ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "vQ": "vergequery",
      "verge":"js/verge.js",
      'TEXT':"js/text.js"
    })
  // new MyPlugin({}),
  //  new webpack.optimize.UglifyJsPlugin({
  //    compress: {
  //      drop_console:true
  //    },
  //    preserveComments: 'some'
  //  })
  ]
};

