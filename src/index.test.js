const { expect } = require('chai');
const { JSDOM } = require("jsdom");
const fs = require('fs');

describe('index.html', () => {
    it('should say "Ciocolom!"', () => {
        const index = fs.readFileSync('./src/index.html', 'utf-8');
        const dom = new JSDOM(index);
        const ciocolom = dom.window.document.getElementsByTagName("h1")[0].innerHTML;
        expect(ciocolom).to.equal('Ciocolom!');
        dom.window.close();
    });
});
