# JavaScript Starter Kit

Starter kit that includes all tools required by a JS project.

## Steps required when starting a new project

### 1. Choose an IDE

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

### 2. Choose the Package Manager

`npm` is the most popular Package Manager for JavaScript and is becoming the defacto standard.
`npm` is installed along with Node.js.

NOTE:
- in order to manage multiple version of Node.js one can use the `nvm` tool (Node Version Manager).
- the 'npm' has buil in  security scanning; one should use the following commands: `npm audit` and `npm audit fix`

*** in the current project use the packages from: https://gist.github.com/coryhouse/29bd1029b623beb4c7f79b748dcba844

### 3. Choose a Web Server

`express` is the web application framework for Node.js that can be used both in in development and in production.

Alternatives for `express` that can be used only in development are:
- `koa` and `hapi`
- `webpack` (serves from memory, hot reloading)
- `Browsersync` (dedicated IP for sharing work on LAN, all interactions remain in sync -> you can hit the same IP on multiple devices and all devices will remain in sync, great for cross-device testing, integrates with Webpack/Browserify/Gulp/Express)


#### 3.1 Share the work-in-progress

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

### 4. Automation

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

#### 4.1. Run scripts in parallel

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

### 4. Transpiling

Transpiler is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language.

One significant option is:
- TypeScript (superset of JS)

Other options were:
- Babel (used to transpile the ;atest versions of JS down to ES5) -> at the moment the support for latest JS version added by Chrome, Node.js, Electron is greater than the one offered by Babel
- Elm (is a purely functional programming language, and is developed with emphasis on usability, performance, and robustness)

To see the ECMAScript compatibility table check: https://kangax.github.io/compat-table/es6/

NOTE: I prefere to not use a transpiler since you depend on an additional tool and you can not leverage all the packages which are most likely available sa JS packages.


### 5. Bundling

JavaScript code needs to be bundled up for usage.

`npm` packages use CommonJS pattern:
- Node.js can handle this
- browser do not understand it => one should bundle the `npm` packages into a format that the browsers can consume.

NOTE: **bundlers are not just for apps that run into the browser -> one can use a bundler to:**
- **package any JavaScript code into a single file**
- **strategically bundle JavaScript code into separate files for different parts of the app (eg the app has 5 pages => create a bundle for each page)**

#### 5.1. Modules format

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

#### 5.2. Sourcemaps

Once the code has been bundled it is hard to read when doing debugging wit the browser's developer tools.

The solution is to create `sourcemaps`:
- maps the code back to original source
- part of the build
- they are only downloaded when opening the developer tools

### 6. Linting

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


#### 6.1. Configuring ESLint

1. Config Format
    - a dedicated file
    - or inside package.json
    - see: https://eslint.org/docs/user-guide/configuring

2. Which rules?
    - catches dozens of potential errors out of the box
    - see: https://eslint.org/docs/rules/

3. Warnings or errors?
    - you should decide which of your rules produce warnings and which errors
    -
