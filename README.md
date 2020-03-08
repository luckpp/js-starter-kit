# JavaScript Starter Kit

Starter kit that includes tools and steps required when starting a new project required by a JS project.

## 1. Choose an IDE

Visual Studio Code is my choice since it has the following features:
- free
- fast
- built-in terminal
- Git integration
- Node integration
- plug-in ecosystem

It is important to define the same configuration for the IDE that can be shared accorss the team. In order to accomplish this do the following steps:
- go to:  Manage (buttom-left corner of the IDE) -> Settngs -> Workspace
- update all required settings
- hit save
- => VS will generate the following file '.vscode/settings.json' (see the file in the current project)

NOTE: An alternative way to add an editor config is using an .editorconfig file added to the root of the project (more info can be found at https://editorconfig.org/)

## 2. Choose the Package Manager

`npm` is the most popular Package Manager for JavaScript and is becoming the defacto standard.
`npm` is installed along with Node.js.

NOTE:
- in order to manage multiple version of Node.js one can use the `nvm` tool (Node Version Manager).
- the 'npm' has buil in  security scanning; one should use the following commands: `npm audit` and `npm audit fix`

## 3. Choose a Web Server

`express` is the web application framework for Node.js that can be used both in in development and in production.

Alternatives for `express` that can be used only in development are:
- `koa` and `hapi`
- `webpack` (serves from memory, hot reloading)
- `Browsersync` (dedicated IP for sharing work on LAN, all interactions remain in sync -> you can hit the same IP on multiple devices and all devices will remain in sync, great for cross-device testing, integrates with Webpack/Browserify/Gulp/Express)


### 3.1 Share the work-in-progress

In order to share the work-in-progress there are several alternatives
1. Classical cloud providers: Google, AWS, Azure
2. Lightweight alternatives:
    - localtunnel (https://www.npmjs.com/package/localtunnel) - creates a tunnel to your local machine
        1. `npm i -g localtunnel`
        2. start your app
        3. `lt --port 3000` (exposes the app running on port 3000)
        - esiest setup / ultra-versatile
    - ngrok (https://www.npmjs.com/package/ngrok) - creates a secure tunnel to your local machine
        1. sign up
        2. install ngrok
        3. insatll authtoken
        4. start your app
        5. `./ngrok http 80` (specify the port you want to use)
        - easy setup / secure
    - now (https://www.npmjs.com/package/now) - quckly deploy Node.js to the cloud; any directory that contains a `package.json` can be uploaded to the cloud using one command.
        1. `npm i -g now`
        2. create start script that opens the preffered web server (eg. `express`)
        3. `now`
        - no firewall hole / supports Node.js projects / !!! publishing the the actual files to a public web server !!!
    - surge (https://www.npmjs.com/package/surge) - quickly hosts static files to public URL
        1. `npm i -g surge`
        2. `surge` (in the prject directory)
        - no firewall hole / !!! publishing the the actual files to a public web server !!!

NOTE: I prefere to use `localtunnel` due to easy setup.

## 4. Automation

The most popular options for JavaScript automation are:
1. Grunt
    - the first popular JavaScript task runner
    - configured over a Grunt file (a JSON that configures Grunt to work with your plug-ins)
    - writes intermediary files between steps
    - large plugin ecosystem
    * may people have moved to more modern task runners like Gulp
2. Gulp
    - focuses on in-memory streams (pipes) - so you don't have to write to disk like with Grunt
    - fast
    - configured over a Gulp (it is `code based` rather than `configuration based like in Grunt`) -> so you write actual JavaScript code in your Gulp tasks so you have more declarative power
    - large plugin ecosystem
    * although Gulp ia a great tool you can move on to just unsing `npm scripts`
3. npm scripts
    - declared in the `scripts` section of the `package.json`
    - with `npm scripts` you can leverage your OS command line
    - directly use npm packages (useful to write cross-platform npm scripts)
    - call separate Node scripts when a command line becomes too complicated
    - offers convention-based pre/post hooks (to run other scripts before and after your script)
    - you can use all the tools/packages available on `npm` package manager

The benefits of `npm scripts`:
- use the tool directly
- no need for separate plugins (eg. in Gulp you should have `Gulp config`, `Gulp-eslint` in order to use `ESLint`)
- simpler debugging
- better docs
- easy to learn
- allows to make command line calls
- use npm packages
- call separate scripts that use Node.js

NOTE: Packages called from npm scripts do not need to be installed globally.

### 4.1. Run scripts in parallel

Use npm package `npm-run-all` (https://www.npmjs.com/package/npm-run-all).
Update the scripts section of the `package.json`:

```javascript
"scripts": {
    "prestart": "node ./buildScripts/startMessage.js",
    "start": "npm-run-all --parallel start-server",
    "start-server": "node ./buildScripts/srcServer.js",
    "share": "npm-run-all --parallel start-server localtunnel",
    "localtunnel": "lt --port 3000"
}
```

NOTE: To suppress the noise made by `npm start` use `npm start -s`

NOTE: There is another way to run the `npm scripts` either sequential or parallel:
```
$ npm run pre-build && npm run build-logic && npm run post-build && npm run exit
```
- use **&&** (double ampersand) for sequential execution
- use **&** (single ampersand) for parallel execution


## 4. Transpiling

Transpiler is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language.

One significant option is:
- TypeScript (superset of JS)

Other options were:
- Babel (used to transpile the ;atest versions of JS down to ES5) -> at the moment the support for latest JS version added by Chrome, Node.js, Electron is greater than the one offered by Babel
- Elm (is a purely functional programming language, and is developed with emphasis on usability, performance, and robustness)

To see the ECMAScript compatibility table check: https://kangax.github.io/compat-table/es6/ and also for the browser you can check https://caniuse.com/.

NOTE: I prefere to not use a transpiler since you depend on an additional tool and you can not leverage all the packages which are most likely available sa JS packages.


## 5. Bundling

JavaScript code needs to be bundled up for usage.

`npm` packages use CommonJS pattern:
- Node.js can handle this
- browser do not understand it => one should bundle the `npm` packages into a format that the browsers can consume.

NOTE: **bundlers are not just for apps that run into the browser -> one can use a bundler to:**
- **package any JavaScript code into a single file**
- **strategically bundle JavaScript code into separate files for different parts of the app (eg the app has 5 pages => create a bundle for each page)**

### 5.1. Modules format

In the present there 2 formats for defining a module:
- CommonJS: `const jQuery = require('jQuery')`
- ES6 Module: `import jQuery from 'jQuery'` -> a standard based way of encapsulating the code (more details for Node.js on https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling)

Beneffits of of ES6 Modules:
- standardized
- staically analyzable
    - imporoved autocomplete
    - intelligent refactoring
    - fails fast (not at runtime)
    - tree shaking (elimination of dead code)
- easy to read
    - you can used named imports
    - default exports (to specify how others can use your module)

**Conclusion**: Bundlers take all your JavaScript files and intelligently package them for a target environment (such as browser ore Node.js). After packaging, the bundlers can also add some new feature on top of the bundle (eg. code minification).

Bundlers:

1. Browserify
    - the first bundler to reach mass adoption
    - bundles `npm packages` for the web (so bundles code that uses CommonJS pattern)
    - large plugin ecosystem (for minification, linting, transpiling)

2. webpack
    - bundles more than just JS (eg CSS, images, fonts, HTML)
    - is smart enough to inline images in styles if they are small enough to justify saving an HTTP request
    - includes a built in hot-reloading web server
    - serves files from memory
    - offers strategic buldle splitting (like for Angular modules)

3. Rollup
    - tree shaking (reduces bundle size smaller with 20%)
    - faster loading production code
    - the drwaback - is quite new (fewer online examples and companion libraries)
    - better suited for libraries in comparrison with Browserify and webpack which are better suited for applications development

4. JSPM:
    - uses SystemJS - an universal module loader
    - can load modules at runtime
    - has its own package manager
    - uses Rollup in its builder

Conclusion: `webpack` is the most mature, full-featured and powerful.

### 5.2. Sourcemaps

Once the code has been bundled it is hard to read when doing debugging wit the browser's developer tools.

The solution is to create `sourcemaps`:
- maps the code back to original source
- part of the build
- they are only downloaded when opening the developer tools

## 6. Linting

A linter programatically enforces consistency and help avoid mistakes:
- curly brace position
- trailing commas
- globals
- evals
- extra parenthesis
- overwriting a function
- assignment in conditional
- missing default case in switch
- debugger / console.log

Options:
- JSLint (the original and extremely opinionated)
- JSHint (improvement on JSLint, offers more configurability)
- ESLint (the most popular linter by far, powerful and configurable)

### 6.1. Configuring ESLint

1. Config Format
    - a dedicated file
    - or inside package.json
    - see: https://eslint.org/docs/user-guide/configuring

2. Which rules?
    - catches dozens of potential errors out of the box
    - see: https://eslint.org/docs/rules/

3. Warnings or errors?
    - you should decide which of your rules produce warnings and which errors

Use `eslint` in combination with `eslint-watch` (https://www.npmjs.com/package/eslint-watch) since it offers the following benefits:
- it is a wrapper around `eslint` and adds file watch
- not tied to webpack
- offers better warning/error format
- displays clean messages
- easy lint tests and build scripts too

In order to configure the linter add the `.eslintrc.json` file to the root of your project:

```javascript
{
    "root": true, // --> tells the eslint that this is the project root and it should not look into any parent folders for other config files
    "extends": [
        "eslint:recommended", // --> we use eslint recommended rulles
        "plugin:import/errors", // --> additional plugins
        "plugin:import/warnings"
    ],
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "rules": { // --> Additional rules to override
        "no-console": 1 // --> 0 - Off, 1 - Warning, 2 - Error
    }
}
```

In `package.json` add the following run script:
```javascript
"scripts": {
    // ...
    "lint": "esw **/buildScripts/* --color"
}
```

From the command line run the following command:
`$ npm run lint`

In order to displable a linting rule (like for example the `no-console` rule) just go inside the *.js file in which you want to disable the rule and do one of the following:
- add at the top of the file the following comment: `/* eslint-disable no-console */` to disable the linting rule for the entire file
- add on the line for which want to disable the linting the following comment: `// eslint-disable-line no-console`


### 6.2. Configuring eslint-watch

`eslint-watch` does not wathc our files by default. We have the option to add another `npm script` to our `package.json` file:

```javascript
"scripts": {
    ...
    "lint": "esw **/buildScripts/* --color",
    "lint-watch": "npm run lint -- --watch" // --> this line means to run the lint command and pass in the the --watch flag to the esw command
},
```

If you run the script: `$ npm run lint-watch` you should see that the linting watcher has started to watch the targeted directories and will give feedback once you start coding and do changes to the watched files.

NOTE: In order to make `eslint` run every time we start our application just update the **start** npm script in our `package.json`:

```javascript
"scripts": {
    ...
    "start": "npm-run-all --parallel start-server lint-watch",
    ...
    "lint": "esw **/buildScripts/* --color",
    "lint-watch": "npm run lint -- --watch"
},
```

NOTE: In order to be able to work with multiple Node.js version you can use: `nvm` (https://github.com/coreybutler/nvm-windows).


## 7. Testing and Continuous Integration

### 7.1. Testing

Important testing styles in JavaScript:
- Unit: focus on a single function or module and mock out external dependencies
- Integration: focus on interactions between modules
- UI: focus on automating interactions with UI (see **Selenium** tool)

There are 6 important decisions you need to consider when setting up automated unit testing in JavaScript:

1. Framework
    - Mocha (highly configurable, large ecosystem of support, does not have an assertion library included so you need to choose one)
    - Jasmine (smilar to Mocha but less configurable and it includes an assertion library )
    - Tape (siplicity and minimal configuration)
    - QUnit (created to test jQuery)
    - AVA (new framework)
    - Jest (from Facebook and quite popular for React developers, is a nice wrapper over Jasmine)

2. Assertion Library
    - Chai (the most popular) - https://www.chaijs.com/
    - Should.js - https://shouldjs.github.io/
    - expect - http://npm.im/expect

3. Helper Libraries
    - JSDOM (simulates the browser's DOM and you can run it in Node.js so it allows to run DOM-related tests without a browser) - https://github.com/jsdom/jsdom
    - Cheerio (jQuery for the server, useful if you use JSDOM and allows querying virtual DOM using jQuery selectors) - https://cheerio.js.org/

4. Where to run tests
    1. in the **Browser**:
        - Karma, Testem (popular test runners)
    2. using an **Headless Browser** (a browser that doesn't have a visible UI)
        - like ***PhantomJS*** (an headless browser)
    3. use an **In-memory DOM**
        - like JSDOM (the lighter-weight alterantive to PhantomJS)

5. Where do test files belong
    - centralizes (`Mocha` pushes into this direction)
    - alongside the tested code (allows clean imports, porvides clear visibility to our tests, convenient to open, avoids having to maintain two separate folder structures, easy file moves)

6. When should tests run
    - unit tests should run every time you hit sav (should be run automatic)
    - integration tests should be run on demand, or in QA

In order to start unit testing do the following steps:
- `npm i mocha chai --save-dev`
- update the npm scripts section in package.json:
```javascript
"scripts": {
    ...
    "test": "mocha --reporter progress buildScripts/testSetup.js \"buildScripts/**/*.test.js\" \"src/**/*.test.js\""
}
```
The **test npm script** explained:
- the reporter settings determines how the test output should display. The `progress` reporter is clean and simple.
- before running the actual tests the `buildScripts/testSetup.js` will be run
- next mocha will run any test files (that ends in *.test.js) under **buildScripts** and **src** and their sub-directories

#### 7.1.1 Configuring watching

In order to make sure that tests are re-run each time you hit save add the **test-watch npm script**:

```javascript
"scripts": {
    "start": "npm-run-all --parallel start-server lint-watch test-watch",
    ...
    "test": "mocha --reporter progress buildScripts/testSetup.js \"buildScripts/**/*.test.js\" \"src/**/*.test.js\"",
    "test-watch": "npm test -- --watch"
}
```

### 7.2. Continuous Integration

When your team commits code, it is important to confirm immediately that the commit works as expected on another machine (this is the resposibiliry of the Continuous Integration Server - CI Server).

Why CI?
- forgot to commit a new file
- forgot to update package.json
- commit doesn't work cross-platform
- node version conflicts
- bad merge
- didn't run tests

What does a CI Server do?
- run automated build (the moment you commit)
- run your tests
- check code coverage
- automate deploy

**CI Servers that work great for JavaScript apps**:
- **Travis** (https://travis-ci.org/ or https://travis-ci.com/)
    - is a Linux-based CI server
- **Appveyor** (https://www.appveyor.com/)
    - is a Windows-based CI server
- **Jenkins** (https://jenkins.io/)
    - a popular, highly-configurable option
- CircleCI (https://circleci.com/)
- Semaphore (https://semaphoreci.com/)

NOTE:
- Travis and Jenkisn are the most popular CIs
- Travis is a hosted solution
- Jenkins is a good choice if you prefere to host your CI server
- Appveyor is notable because of its Windows support


#### 7.2.1 Travis CI

In order to use Travis CI follow the steps:
- go to https://travis-ci.com/
- sign-in with your Github account
- give access to the desired Github repositories
- in the root of your project/repository add a **Travis** configuration file called `.travis.yml`:
```yaml
language: node_js
node_js:
  - 12
```

#### 7.2.1 Travis Appveyor

In order to use Appveyor CI follow the steps:
- https://www.appveyor.com/
- sign-in with your Github account
- give access to the desired Github repositories
- in the root of your project/repository add a **Appveyor** configuration file called `.appveyor.yml`:
```yaml
# Test against this version of Node.js
environment:
  matrix:
  # node.js
  - nodejs_version: "12"

# Install scripts. (runs after repo cloning)
install:
  # Get the latest stable version of Node.js or io.js
  - ps: Install-Product node $env:nodejs_version
  # install modules
  - npm install

# Post-install test scripts.
test_script:
  # Output useful info for debugging.
  - node --version
  - npm --version
  # run tests
  - npm test

# Don't actually build.
build: off
```

## 8. HTTP

Libraries to handle HTTP calls:
- Node.js:
    - `http` (built in package / low level library included in Node.js)
    - `request` (popular high level library) **-> recommended**
- Browser:
    - `XMLHttpRequest` (plain old XML HTTP requests, also known as XHR, the native and original way)
    - `jQuery` (jQuery's `$.ajax` was used to perform an asynchronous HTTP (Ajax) requests)
    - `Framework-based` (frameworks like **Angular** include their own HTTP service)
    - `Fetch` (a standard proposed by the **Web Hypertect Application Technology Working Group** or **What Working Group**, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) **-> recommended**
- Node.js and Browser:
    - `isomorphic-fetch` (https://www.npmjs.com/package/isomorphic-fetch)
    - `xhr` (https://www.npmjs.com/package/xhr)
    - `superagent` (full featured library, https://www.npmjs.com/package/superagent)
    - `axios` (full featured, https://www.npmjs.com/package/axios) **-> recommended**

NOTE: `superagent` and `axios` are popular and elegant but `axios` provides a clean promise based API.

**Centralize all HTTP calls** since it allows the following benefits:
- one place to configure all calls; eg:
    - base URL
    - response type
    - passing credentials
- handle preloader logic:
    - when asynchronus calls are in progress the user should be notified
- handle errors
- single seam for mocking

### 8.1. Polyfill

In web development, a polyfill is code that implements a feature on web browsers that do not support the feature.

In order to request polyfills you can use https://polyfill.io/v3/:
- in the `index.html` we add a `script` reference to polyfill.io with the desired feature
```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=fetch"></script>
```
- than polyfill.io will read the user-agent
    - uses this information to determine if the browser requires a polyfill for the features listed

### 8.2. Moking API

It is useful in the following situations:
- when unit testing
- when HTTP calls require an instant response
- to keep working when services are down
- for rapid prototyping
- avoid inter-team bottlenecks
- work offline

Mocking tools:
- Nock
    - **useful whe writing unit tests**
    - https://www.npmjs.com/package/nock
- static JSON
    - this can be done manually if you have centralized all API calls -> in a central place just point to a static JSON file
- create a development web server using
    - **JSON Server**
        - create a fake DB using static JSON
        - when starting JSON Server it creates a web service that works with the static JSON
        - POST/PUT/DELETE calls actually update the static JSON file
        - https://www.npmjs.com/package/json-server
    - **JSON Schema Faker**
        - generates JSON fake data
        - works well with (**chance.js**, **faker.js** or **randexo.js**)
        - https://www.npmjs.com/package/json-schema-faker
        - more docs on: https://json-schema-faker.js.org/
    - or just create a fake API using:
        - Browsersync
        - Express

The plan for moking HTTP:
1. Declare our schema using **JSON Schema Faker**
2. Generate random data using for example:
    - **chance.js** (https://www.npmjs.com/package/chance)
    - **faker.js** (https://github.com/marak/Faker.js/)
    - **randexo.js** (https://www.npmjs.com/package/randexp)
3. Serve data via API using **JSON Server**

NOTE: the JSON data format is decribed by several standards:
- **JSON Schema** (http://json-schema.org/)
- JSON Content Rules
- JSON LD
- RAML
- API related technologies like: GraphQL, Falcor, OData

#### 8.2.1. Generate mock data

Steps required to mock HTTP requests:

1. Write the schema that declares the shape of our mock data

    - add the following file `./buildScripts/mockDataSchema.js`:

```javascript
const schema = { // describes the shape of our mock JSON
    'type': 'object', // the datastructure is an object
    'properties': { // that object has a set of properties
        'users': { // the first property is 'users'
            'type': 'array', // that has a type of array
            'minItems': 3, // the array contains between
            'maxItems': 5, // 3 and 5 items
            'items': { // and define the shape of the items that should sit inside the 'users' array
                'type': 'object', // so inside the array we should find objects
                'properties': { // with the following properties
                    'id': {
                        'type': 'number', // 'id' should be a number
                        'unique': true, // should be unique to mimic a PrimaryKey in a DB
                        'minimum': 1 // and should be positive greater than 0
                    },
                    'firstName': {
                        'type': 'string', // 'firstName' should be a string
                        'chance': 'first' // and asking chance.js to geenerate a first name
                    },
                    'lastName': {
                        'type': 'string', // 'lastName' should be a string
                        'chance': 'last' // and asking chance.js to geenerate a last name
                    },
                    'email': {
                        'type': 'string', // 'email' should be a string
                        'chance': 'email' // and asking chance.js to geenerate a email
                    }
                },
                'required': ['id', 'firstName', 'lastName', 'email'] // all the 4 properties are required and will allways be populated
            }
        }
    },
    'required': ['users'] // also the top level property 'users' is required
};

module.exports.schema = schema;
```

2. Use the `json-schema-faker` to generate some mock using this schema

    - NOTE: check info here https://github.com/json-schema-faker/json-schema-faker/blob/master/docs/USAGE.md

    - run `npm i json-schema-faker --save-dev`
    - run `npm i chance --save-dev`

    - add the following file `./buildScripts/generateMockData.js`:
```javascript
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Chance = require('chance');
const jsf = require('json-schema-faker');
const { schema } = require('./mockDataSchema');

jsf.extend('chance', () => new Chance());

const json = JSON.stringify(jsf.generate(schema), null, 2);

const dir = './db';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

fs.writeFile(path.join(dir, 'db.json'), json, function (err) {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(chalk.green('Mock data generated.'));
    }
});

```

3. Update the `npm scripts` with a new script to generate the mock data:
```javascript
"scripts": {
    ...
    "generate-mock-data": "node buildScripts/generateMockData.js"
}
```

#### 8.2.2. Serve the generated mock data

After generating the mock data you can serve it using **JSON Server**.

NOTE: **JSON Server** will do the following:
- will parse the mock data JSON file and make a mock API for each top level object it finds.
- any HTTP operations will done against the **JSON Server** will reflect in the JSON file (which will be updated).

1. Install `json-server`:
    - run `npm i json-server --save-dev`

2. Add a new npm script to start the mock API server.
```javascript
"scripts": {
    ...
    "start-mockapi": "json-server --watch db/db.json --port 3001"
}
```

3. Add an npm script to generate data each time the app starts. This step is important since randomized data helps simulate the real world and it catches issues in development:
    - empty lists
    - long lists
    - long values
    - provides data for testing, filtering, sorting

```javascript
"scripts": {
    "start": "npm-run-all --parallel start-server lint-watch test-watch start-mockapi",
    ...
    "generate-mock-data": "node buildScripts/generateMockData.js",
    "prestart-mockapi": "npm run generate-mock-data",
    "start-mockapi": "json-server --watch db/db.json --port 3001"
}
```
NOTE: `prestart-mockapi` will be automatically run by npm run each time before `start-mockapi` since it respects the naming convention of the **npm scripts** and has the `pre` prefix in its name.


## 9. Project structure

**A demo app should be considered a critical piece of the team starter kit.**

A demo app gives examples of:
- directory structure and file naming
- framework usage
- testing
- mock API
- automated deployment

A demo app codifies decisions:
- it gives you a single place to codify your decisions
- the demo app should reflect your coding standards
- it's a place to update as you learn new techniques and patterns that you want to share with the team

A demo app offers an interactive example of the starter kit working in a realistic scenario:
- this helps new team members understand what life is like working in the selected stack

Tips:
- JS belongs to a .js file (not inside `script` HTML tags!)
    - avoid dynamically generating JavaScript logic, dynamically generate JSON data instead that JavaScript code can use
- organize the code by feature instead of by file type
- extract logic into 'POJOs' (plain old JavaScript objects)
    - POJOs should contain plain logic, that isn't tied to any framework
    - **when  structuring your application, strive to place as much logic as possible in JavaScript
    - eg: if you are working in React, much of your logic should exist outside the React components

NOTE: for the demo app select a domain that is related to your business.

## 10. Production build

Steps for creating a production build:

1. Minification
    - speeds page load
    - saves bandwidth
    - the minifier:
        - shortens variable and function names
        - removes comments
        - removes whitespace and new lines
        - some of the new bundlers like RollUp and Webpack2 do dead code elimination via tree-shaking
        - debug via sourcemap

2. Add gzip copmression for staticaly served files:
- `npm i compression`
- see more info on https://www.npmjs.com/package/compression

```javascript
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression()); // call before the subsequent call to express.static(...)
app.use(express.static('dist'));
```

### 10.1. Automate the production build

- install `rimraf` package: `npm i rimraf --save-dev`

- add the following `npm scripts`:

```javascript
"scripts": {
    ...
    "clean-dist": "rimraf ./dist && mkdir dist",
    "prebuild": "npm-run-all clean-dist test lint",
    "build": "node buildScripts/build.js",
    "postbuild": "node buildScripts/distServer.js"
}
```

- `npm run build`

### 10.2. Topics to consider when building a Node.js app

NOTE: many of the topics below are handled out of the box by frameworks like **Angular**.

Topics:

#### 10.2.1. Automatic index.html generation and **cache busting

- use `html-webpack-plugin` (https://www.npmjs.com/package/html-webpack-plugin)

#### 10.2.2. Use bundle splitting

- speed initial page load
- avoid re-downloading all libraries (eg. **Angular** bundles libraries like **lodash** in a separate **vendor.js** file that's cached separately)

#### 10.2.3. Cache busing

- to save bandwidth and avoid unnecessary HTTP requests, you can consider configuring your production web server so that your JavaScript bundle doesn't expire for up to a year
- saves HTTP requests (as long as you know that you can bust cache, you can set headers that tell your users browsers not to request your assets for up to a year - this means that after someone your JavaScript file, they won't make another HTTP request for that file up to one year)
- when it's time to deploy an update to your app, you can assure that user immediately receives the new bundle by generating a new file name for that bundle (you can force a request fot the latest version)
- how it is done: hash the bundle filename (it the code inside thebundle stays the same, the hash/filename stays the same) + generate HTML dynamically

**NOTE:  Have a look on how to accomplish setting `far future headers`on your web server. The ideea is to configure your web server to send headers that specify that your application JavaScript files shouldn't expire until some date in the distant future**

#### 10.2.4. Extract and minify CSS

- minify and place all your CSS into a separate bundle

#### 10.2.5. Production error logging

In order to be aware of when your application throws a JavaScript error in production you can use a long list of services:
- TrackJS (https://trackjs.com/) - specific to JS - **recommended**
- Sentry (https://sentry.io/for/javascript/)
- New Relic (https://newrelic.com/)
- Raygun (https://raygun.com/)

When yoou're evaluating error logging services, here are some key concerns to consider:
- does provide good **error metadata**
    - does it tell me what **browser** the error occured in
    - does it captures **stack trace**
    - does it captures **previous actions** that the user was performing so I can reporduce the issue
    - does it offer a **custom API for enhanced tracking**
- does it offer **notifications & integrations**
    - so you can receive e-mails when error occur
    - and integrat it with other popular platforms like `Slack` (https://slack.com/) so we are notified there instead of e-mail
- does it offer **analytics and filtering**:
    - so you can filter out the noise by aggregating errors, filtering the list and setting rules for when you should be notified using specific tresholds
- **pricing**:
    - you will end up paying by the month

**RECOMMENDATION: Do not try to solve this issues yourself. Doing JavaScript error logging well is a much harder problem than you think, because errors are very hard to reproduce and fix without the rich metadata and filtering that these tools provide.**

Use `Track.js` for adding error logging:
- `Track.js` requires you to add a reference to it inside the `index.html`
- the `index.html` should reference `Track.js` only in production
    - to accomplish conditionally add the reference using a templating engine like:
        - EJS (https://ejs.co/) - **recommended**
        - Jade (http://jade-lang.com/)
        - Underscore (https://underscorejs.org/)
        - Handlebars (https://handlebarsjs.com/)

## 11. Production deploy

### 11.1. Separte UI and API code

It is important to keep the UI and API code in complete separate projects. The benefits are:

1. Simple, low-risk, UI only deploys:
    - a static front-end is easy to deploy
    - you just need to upload the files generated in the `dist` folder to a public web server
    - you do not have to wory about regressing the service layer

2. Separates concerns:
    - separate teams for the front-end and for the back-end
    - less to understand
    - scale the back-end separately (the traffic for the UI may differ from the traffic for the API)

3. Cheap UI hosting
    - when your front-end is just static HTML, JavaScript and CSS you can select any host in the world

4. Serve UI via a content delivery network (CDN):
    - a CDN handles caching and scalability
    - a CDN is especially useful for high traffic sites and applications that are used arround the world since CDNs intelligently serve assets from the closest physical server, to speed downloads.

5. Use the API tech you like (C#, Java, Ruby, ...)

### 11.2. Cloud hosting

Virtually any cloud host can serve a JavaScript app these days with minimum configuration.

Popular cloud providers include:
- Amazon Web Services
- Microsoft Azure
- Heroku
- Firebase
- Google Cloud Platform
- Netlify (focused solely on serving static files)
- GitHub Pages (focused solely on serving static files)
- Surge https://surge.sh/ (focused solely on serving static files)

For the current demo the following services will be used:
- **Heroku** for API:
    - popular
    - powerful
    - has an elegant automated deployment process
- **Surge** for the UI:
    - simple to set up
    - it is focused solely on serving static files

Deployment to **Heroku** (https://heroku.com/)
- create an Heroku account
- from the account create an Heroku app and bind it to the GitHub repository
- each time a check-in occurs in GitHub, an automatic build will be triggered on Heroku and the app will be updated
- for more info see https://github.com/luckpp/js-starter-kit-api

Deployment to **Surge** (https://surge.sh/)
- the process to set up for the fron-end should be:
    - `npm start`
    - `npm run build`
    - `npm run deploy`
- first install surge npm package:
    - `npm i surge --save-dev`
- edit the `package.json` to add the steps for the process:
```javascript
"scripts": {
    ...
    "start": "ng serve -o",
    "build": "ng build --prod",
    "deploy": "surge --domain js-starter-kit-ui.surge.sh  ./dist/js-starter-kit-ui",
},
"devDependencies": {
    ...
    "surge": "^0.21.3"
}
```
- for more info see https://github.com/luckpp/js-starter-kit-ui
