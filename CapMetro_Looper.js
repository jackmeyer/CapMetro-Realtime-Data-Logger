var util = require('util')
var exec = require('child_process').exec;
var child;

setInterval(function() {
    child = exec("node CapMetro_Data_Logger.js", function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}, 1800000); //30minute interval