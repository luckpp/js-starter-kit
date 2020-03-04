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
