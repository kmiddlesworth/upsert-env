# upsert-env
A small tool to update .env config files.

## Install

```
$ npm install --save upsert-env
```

## Usage

### set(key-value-object, path, callback)

* key-value-object - object - required
	* Ex: `{'ENVVARKEY':'envvarvalue'}`
	* Notes: Multiples are allowed, and it does not matter whether the the variable currently exists or not.
* path - string - optional
	* Default: `./.env`
	* Ex: `./my-new-directory/.env`
* callback - function - optional
	* Returns: error, data
	* Ex: `function(error, data){ /* do something */ }`

## Example

```js
var upsertEnv = require('upsert-env');

var newEnvVars = {
	'MYNEWKEY':'a new value',
	'ANOTHERNEWKEY':'another new value'
};

upsertEnv.set(newEnvVars, null, function(error, data){

    if (error) console.log('Uh oh. ' + error);
    else console.log('Success!', data);

});

```
