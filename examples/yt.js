/*global describe, it, beforeEach, afterEach */

"use strict";
const WebDriver = require('selenium-webdriver');

const until = WebDriver.until;

const {
    // assert,
    // addComparing,
    // SITE_URL,
    server,
    beforeEachInitialization
} = require('./../test/helper/vars');

describe('localization test', function () {

    // each test should be less than 10s
    this.timeout(60e3);

    let ssm, driver;

    before(() => server.start());

    after(() => server.stop());

    beforeEach(() => {

        const result = beforeEachInitialization();
        ssm = result.ssm;
        driver = result.driver;

        return result.promise;

    });

    afterEach(() => driver.quit());

    it('youtube test', function () {

        driver.get('https://www.youtube.com/watch?v=Or9AFLFYUuA');

        driver.wait(
            until.elementLocated({css: '.comment-simplebox-text'}),
            30000
        );

        driver.findElement({css: '.comment-simplebox-text'}).sendKeys('крутяк!!');

        driver.findElement({css: '#watch-discussion [aria-label="Comment"]'}).click();

        driver.findElement({css: '.popup-form option[value="aw"]'}).click();

        return driver.sleep(5000);


        /*
         ssm
         .compareOfSelector('.popup-content', './popup-content.png')
         .then(comparing => {

         addComparing(comparing, this);

         assert(comparing.info.misMatchPercentage === 0, 'Should be the same images');

         });

         return driver.findElement({css: '.popup-form select'})
         .getAttribute('value')
         .then(value => assert(value === 'aw'));
         */

    });

});
