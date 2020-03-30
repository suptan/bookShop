# book-shop

> my vue project for book shop

## Table of contents
[Project structure](#project-structure)

[Prerequisites](#prerequisites)

[Build Setup](#build-setup)

[Configuration](#configuration)

## Project Structure

````
src/
|- api/ ______________________________ # Gateway to API
|- assets/ ___________________________ # Application assets
|    |- icons/
|    |- styles/ ______________________ # Application Styles
|- components/ _______________________ # Shareable or Specific Components for view
|- layouts/ __________________________ # Application Layout
|- router/ ___________________________ # Application Routes
|- store/ ____________________________ # Application Storage
|    |- modules ______________________ # Manage based on namespace module structure
|       |- carts _____________________ # Represent to state in Vuex in this case is carts
|          |- actions.js
|          |- getters.js
|          |- index.js
|          |- mutations.js
|- utils/ ____________________________ # Utilities Functions
|- views/ ____________________________ # Application Pages
|- App.vue ___________________________ # Application Entry
|- config.js _________________________ # Application Configuration
|- main.js ___________________________ # Application Initialization
````

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## Build Setup

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

[commit guideline](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
