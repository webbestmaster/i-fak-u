/*global describe, it, beforeEach, afterEach */

"use strict";

const {
    Ssm,
    assert,
    addComparing,
    WebDriver,
    SITE_URL,
    WEB_DRIVER_SERVER_URL,
    server,
    TEST_MODE,
    byCss
} = require('./helper/vars');

describe('localization test', function () {

    // each test should be less than 10s
    this.timeout(60e3);

    let ssm, driver;

    before(() => server.start());

    after(() => server.stop());

    beforeEach(() => {
        driver = new WebDriver
            .Builder()
            .usingServer(WEB_DRIVER_SERVER_URL)
            .withCapabilities({'browserName': 'chrome'})
            .build();

        ssm = new Ssm();
        ssm.setMode(TEST_MODE);
        ssm.setPathToReferenceFolder('./ssm-ref-folder');
        ssm.setDriver(driver);

        return ssm.setSize(1024, 768);

    });

    afterEach(() => driver.quit());

    it('select country', function () {

        driver.get(SITE_URL);

        driver.findElement(byCss('.lang-bar__base')).click();

        driver.findElement(byCss('.lang-bar__footer')).click();

        driver.findElement(byCss('.popup-form option[value="aw"]')).click();

        ssm
            .compareOfSelector('.popup-content', './popup-content.png')
            .then(comparing => {

                addComparing(comparing, this);

                assert(comparing.info.misMatchPercentage === 0, 'Should be the same images');

            });

        return driver.findElement(byCss('.popup-form select'))
            .getAttribute('value')
            .then(value => assert(value === 'aw'));

    });

});
