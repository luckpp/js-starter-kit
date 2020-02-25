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



