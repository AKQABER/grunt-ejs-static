var grunt = require('grunt');
module.exports = exports = {
  get_files: function(options) {
    // get data specified in ejs_static options
    if (typeof options.path_to_data === 'string' || options.data && options.data.path) {
      grunt.log.debug('get_files_to_render(): typeof data.options worked');
      var files_data = {};
      // get the files data
      if (typeof options.path_to_data === 'string' || !(options.data || {}).i18n) {
        files_data = grunt.file.readJSON(options.path_to_data || options.data.path);
        grunt.log.debug(JSON.stringify(files_data, null, 2));
        grunt.log.debug('Data successfully imported');
      // return the data
      } else {
        files_data = grunt.file.readJSON(options.data.path);
        var i18n = grunt.file.readJSON(options.data.i18n);
        for (var page in files_data) {
          if (files_data.hasOwnProperty(page)) {
            files_data[page].i18n = i18n;
          }
        }
      }
      return files_data;
    }
    grunt.fail.warn('The path_to_data option is required... please specify in Gruntfile');
    return false;
  }
};