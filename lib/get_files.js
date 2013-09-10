
var grunt = require('grunt');

module.exports = exports = {

  get_files: function(options) {

    // get data specified in ejs_static options
    if (typeof options.path_to_data === 'string' || options.path_to_data && options.path_to_data.slice) {

      grunt.log.debug('get_files_to_render(): typeof data.options worked');
      var files_data = {};
      // get the files data
      if (typeof options.path_to_data === 'string') {
        files_data = grunt.file.readJSON(options.path_to_data);
        grunt.log.debug(JSON.stringify(files_data, null, 2));

        grunt.log.debug('Data successfully imported');

        // return the data
        return files_data;
      } else {
        var tmp_data,
          l = options.path_to_data.length;
        while (l--) {
          tmp_data = grunt.file.readJSON(options.path_to_data[l]);
          for (var d in tmp_data) {
            if (tmp_data.hasOwnProperty(d)) {
              files_data[d] = tmp_data[d];
            }
          }
        }
        return files_data;
      }
      
    } else {

      grunt.fail.warn('The path_to_data option is required... please specify in Gruntfile');
      return false;

    }
    // end get data specified in ejs_static options 

  }   

};