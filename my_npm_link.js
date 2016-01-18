#!/usr/bin/env node

//https://dzone.com/articles/execute-unix-command-nodejs
var sys = require('util');
var exec = require('child_process').exec;
var child;

var readJson = require('read-package-json')
var the_path = "./package.json";

// readJson(filename, [logFunction=noop], [strict=false], cb)
readJson(the_path, console.error, false, function (er, data) {
  if (er) {
    console.error("There was an error reading the file");
    return;
  }

  var devDep = data.devDependencies;
  var tmp_array = [];
  var cmd = 'npm link';

  //https://stackoverflow.com/questions/684672/loop-through-javascript-object  
  for(var key in devDep) {
    if(devDep.hasOwnProperty(key)) {
      //console.log(key + " - version: " + devDep[key]);
      tmp_array.push(key);
    }
  }

  //console.log(tmp_array);
  for(var key in tmp_array) {
    cmd = cmd + " " + tmp_array[key];
  }
 
  console.log("The npm link command is"); 
  console.log(cmd);
  child = exec(cmd, function(error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null) {
      console.log('exec error: ' + error);
    }
    else {
      console.log('done.');
    }  
  });

});
