/*
 * grunt-ejs-static
 * https://github.com/shaekuronen/grunt-ejs-static
 *
 * Copyright (c) 2013 Shae Kuronen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // create grunt multitask
  grunt.registerMultiTask('ejs_static', 'Render EJS templates as static HTML.', function() {

    // get ejs_static methods
    var ejs_static = require('../lib/ejs_static');

    // set defaults for options
    var options = this.options({
      dest: 'dist',
      parent_dirs: false,
      file_extension: '.html',
      underscores_to_dashes: true
    });
    function proc (opts) {
      // get the files to render, which are declared in the options.path_to_data JSON file
      var files = ejs_static.get_files(opts);

      // iterate through the files
      Object.keys(files).forEach(function(key) {

        // get the data specified for the file
        var file_data = ejs_static.get_data(key, files);

        // get the layout specified for the file
        var layout_data = ejs_static.get_layout(key, files, opts);

        // render the file 
        var rendered_file = ejs_static.render_file(layout_data, file_data);

        // write the file to the destination directory
        ejs_static.write_file(key, files, rendered_file, opts);

      });
    }
    if (options.data && options.data.lang && options.data.lang.splice) {
      //do something funky for me.
      var l = options.data.lang.length;
      while (l--) {
        var i18n = options.data.lang[l];
        options.data.i18n = i18n;
        i18n = i18n.split('/')[i18n.split('/').length -1].replace('.json', '');
        if (i18n === options.data.defaultlang) {
          options.dest = options.dir;
          proc(options);
        }
        options.dest = options.dir + i18n + '/';
        proc(options);
      }
    } else {
      proc();
    }
  });

};
