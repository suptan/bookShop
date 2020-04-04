# book-shop

> my vue project for Little Brown Book Shop

## Table of contents
[Demo](#demo)

[Repository](#repository)

[Project structure](#project-structure)

[Prerequisites](#prerequisites)

[Build Setup](#build-setup)

[Configuration](#configuration)

[Running Your Application](#running-your-application)
## Demo

[Live Demo](https://suptantesting1.github.io)

## Repository

[Repository](https://github.com/suptan/bookShop/tree/master/book-shop)

## Project Structure

````
config/
|- dev.env.js ________________________ # Configuration for Development environment
|- prod.env.js _______________________ # Configuration for Production environment
|- test.env.js _______________________ # Configuration for Test environment
src/
|- api/ ______________________________ # Gateway to API
|- assets/ ___________________________ # Application assets
|    |- icons/
|    |- styles/ ______________________ # Application Styles
|- components/ _______________________ # Shareable or Specific Components for view
|- layouts/ __________________________ # Application Layout
|- router/ ___________________________ # Application Routes
|- store/ ____________________________ # Application Storage
|    |- modules ______________________ # A namespaced module based Vuex store structure
|       |- carts _____________________ # Represent to carts state in Vuex
|          |- actions.js
|          |- getters.js
|          |- index.js
|          |- mutations.js
|        .
|        .
|        .
|- utils/ ____________________________ # Utilities Functions
|- views/ ____________________________ # Application Pages
|- App.vue ___________________________ # Application Entry
|- config.js _________________________ # Application Configuration Wrapper
|- main.js ___________________________ # Application Initialization
````

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## Build Setup

Make sure you go inside project folder before execute any command below
```
$ npm cd book-shop/
```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run unit tests in watch mode
npm run unit:watch

# generate unit test coverage report
npm run unit:coverage

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Configuration
```
{
    ALLOW_LOG_LEVEL: 'debug' #Enable debug log when set to 'debug' mode
    NODE_ENV: 'development' #Application running environment
    PROXY_URL: '' #Fallback http request when encounter CORS
    RESOURCE_URL: 'https://json-bin.netlify.com/books.json' #API for fetch available book resource
}
```

## Running Your Application

Run your application using npm:
```
$ npm run dev
```
Your application should run on port 8080 with the development environment configuration, so in your browser just go to http://localhost:8080
