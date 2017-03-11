# Parts Framework
##  A lightweight NodeJS Framework
### Description
#### Quickly create node JS APIs

##### This framework onyl uses Mongo as database, for now.

### Usage
Start with node --harmony app.js

### Creating a model
Models are made with the help of Mongoose Schemas.
#### How to
Create a file with the name of the model in the models/ folder
As an example you have the models/user.js.
This will create a model named "User" (user.js => User)

### Creating a controller
#### How To
Create a file in the controllers folder.
#### Example
```js
// User Controller
module.exports = {
	name: 'User', // the name of the controller
	data: { // object of needed data, optional
		someData: true
	},
	methods: {
		all: function(req, res){
			res.json({
				users: []
			})
		}
	},
	needs: ['SomeController']
}
```
#### Controller parts
##### Name
The name of the controller
#### Data
Object containing data
```js
data: {
	property: true
}
```
This will be available as Controller.property , so don't use the same name for data and methods
#### Methods
Self explanatory
#### Needs
The framework loads all controllers with data and methods and then puts the dependencies in every one of them. In this case, other dependencies are controllers that may be needed.
```js
needs: ['Auth']
```
This will load the Auth controller in Controller.authController

### Creating routes
#### How to
You just have to edit the routes/http.js file. Out Route method is just a wrapper for Express app.method for now, we'll extend to express Router later.
#### Example
```js
Route.get('/users', 'User@getAll');
```
You can user Route.get exactly as you would use Express app.get. The only difference is that you can also use 'Controller@method' instead of a function.

### Config file
You should rename the example.config.js to config.js.
This file contains a example config file with all the info that Parts need to run.
You can add other keys to this config and they will be available.
```js
var config = use('Config');
console.log(config.http.port); // gives exactly that
console.log(config.http.asd); // gives undefined
console.log(config.getValue('config.asd')); // gives null
console.log(config.getValue('config.asd', 'aa')); // gives 'aa'
```

### Using the 'use' function
```js
var Config = use('Config'); // This will return the Config
var Route = use('Route'); // This will return Route object (the methods are the http methods from app in express)
var User = use('User'); // This will return the User controller. No, this is not predefined. Every capitalized string (except Config and Route) will be identified as a controller name.
var getAll = use('User@getAll'); // This will return getAll method / property of the User Controller
var User = use('#User'); // This will return the Mongoose Model named 'User';
```