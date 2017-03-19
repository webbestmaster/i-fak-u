/*global describe, it, beforeEach, afterEach */

"use strict";

const {
    assert,
    addComparing,
    SITE_URL,
    server,
    beforeEachInitialization
} = require('./helper/vars');

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

    it('select country', function () {

        driver.get(SITE_URL);

        driver.findElement({css: '.lang-bar__base'}).click();

        driver.findElement({css: '.lang-bar__footer'}).click();

        driver.findElement({css: '.popup-form option[value="aw"]'}).click();

        ssm
            .compareOfSelector('.popup-content', './popup-content.png')
            .then(comparing => {

                addComparing(comparing, this);

                assert(comparing.info.misMatchPercentage === 0, 'Should be the same images');

            });

        return driver.findElement({css: '.popup-form select'})
            .getAttribute('value')
            .then(value => assert(value === 'aw'));

    });

});
