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
    TEST_MODE
} = require('./helper/vars');

describe('selenium screen master test', function () {

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

    it('Take screenshot of selector', function () {

        driver.get(SITE_URL);

        return ssm
            .compareOfSelector('.main-header__aside', './header.png')
            .then(comparing => {

                addComparing(comparing, this);

                assert(comparing.info.misMatchPercentage === 0, 'Should be the same images');

            });

    });

});
