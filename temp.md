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


#### Watching with eslint-watch

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

### NVM

In order to be able to work with multiple Node.js version you can use: `nvm` (https://github.com/coreybutler/nvm-windows).



### Testing and Continuous Integration

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
        - like ***PhantomJS***
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
    "test": "mocha --reporter progress buildScripts/testSetup.js \"buildScripts/**/*.test.js\""
}
```
The **test npm script** explained:
- the reporter settings determines how the test output should display. The `progress` reporter is clean and simple.
- before running the actual tests the `buildScripts/testSetup.js` will be run
- next mocha will run any test files (that ends in *.test.js) under **buildScripts** and its sub-directories
