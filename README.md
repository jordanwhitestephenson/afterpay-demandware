#Afterpay Demandware Project

##Structure
* **package.json:** defines the project's variables and dependencies
* **client:** this folder contains the customisations for the client
* **gulpfile.js:** the build script for compiling CSS, minifying JS and copying assets


##Requirements
1. [Git](https://git-scm.com/downloads)
2. [Node.js](https://nodejs.org/en/) (NPM > v3.x)

##Getting started
Clone the repository
```sh
$ git clone git@bitbucket.org:amblique/afterpay-demandware.git
```

Install dependencies
```sh
$ cd afterpay-demandware
```
```sh
$ npm install
```

Install gulp globally
```sh
$ npm install -g gulp
```

Build the project (compile CSS/JS)
```sh
$ gulp build
```