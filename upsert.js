'use strict';

var fs = require('fs');

module.exports = {

	set: function(object, path, callback){

		if (!object || typeof object !== 'object') {
			if (callback) return callback('Error: the first parameter must be supplied as an object.', null); 
		} 

		var path = (path) ? path : './.env';
		var returnObj = {};

		fs.readFile(path, 'utf8', function (err, data) {
		
			// if there is an error, throw it           
	        if (err) { 
	        	if (callback) return callback(err, null);
	        	throw err;
	        }

	        // break the content into an array of line numbers
	        var configArr = data.split('\n');

	        // loop through the line numbers
	        for (var i = 0, len = configArr.length; i < len; i++) {
	        	
	        	// ensure the current line has a variable declaration and is not a comment 
	        	if (configArr[i].indexOf('=') != -1 && configArr[i][0] != '#') {

	        		var envKey = configArr[i].split('=')[0];

	        		// loop through the entered parameters
	        		for (var key in object){

	        			if (envKey == key) {
	        				configArr[i] = key + '=' + object[key];
	        				delete object[key];
	        			}
	        		}
	        	}
	        }

	        // add new items that are not already in the .env configuration file
	        // note: anything already included was deleted from the object above
	        for (var i = 0, len = configArr.length; i < len; i++) {
	        	
	        	// ensure the current line has a variable declaration and is not a comment 
	        	if (configArr[i].indexOf('=') != -1 && configArr[i][0] != '#') {

	        		var envItem = configArr[i].split('=');
	        		returnObj[envItem[0]] = envItem[1]

	        	}
	        } 
	         
	        // write the new file, with the joined array
	        fs.writeFile (path, configArr.join('\n'), function(err) {
	            if (err) {
	            	if (callback) return callback(err);
	            	throw err;
	            }
	            //console.log(returnObj, ' is successfully added/updated on .env.');
	            if (callback) callback(null, returnObj);
	        });
		});
	}
};