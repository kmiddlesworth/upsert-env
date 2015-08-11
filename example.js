'use strict';

var upsertEnv = require('./upsert.js');

var newEnvVars = {
    'MYNEWKEY':'a new value',
    'ANOTHERNEWKEY':'another new value'
};

console.log(newEnvVars);
console.log(typeof newEnvVars);

upsertEnv.set(newEnvVars, null, function(error, data){

    if (error) console.log('Uh oh. ' + error);
    else console.log('Success!', data);

});