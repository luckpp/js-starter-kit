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

#### 4.1 Run scripts in parallel

Use npm package `npm-run-all` (https://www.npmjs.com/package/npm-run-all).
Update the scripts section of the `package.json`:

```javascript
"scripts": {
        "prestart": "node ./buildScripts/startMessage.js",
        "start": "npm-run-all --parallel start-server",
        "start-server": "node ./buildScripts/srcServer.js",
        "share": "npm-run-all --parallel start-server localtunnel",
        "localtunnel": "lt --port 3000"
    },
```

NOTE: To suppress the noise made by `npm start` use `npm start -s`
