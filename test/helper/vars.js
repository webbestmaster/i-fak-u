const fs = require('fs');

const WebDriver = require('selenium-webdriver');
const Ssm = require('selenium-screen-master');
const addContext = require('mochawesome/addContext');

const resemble = require('node-resemble');
const assert = require('chai').assert;
const util = require('./test-util');

const PORT = 4444;
const OS_NAME = util.detectOsName();

// const SITE_URL = 'http://localhost:3003/';
const SITE_URL = 'http://eyefitu.com/';
const WEB_DRIVER_SERVER_URL = 'http://localhost:' + PORT + '/wd/hub';

const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
const server = new SeleniumServer('./driver/selenium-server-standalone-3.0.1.jar', {
    port: PORT,
    jvmArgs: ['-Dwebdriver.chrome.driver=./driver/' + OS_NAME + '/chromedriver']
});

const TEST_MODE = process.env.MODE || (new Ssm()).MODE.TEST; // TEST || COLLECT

const addComparing = util.addComparing;

function beforeEachInitialization() {

    const driver = new WebDriver
        .Builder()
        .usingServer(WEB_DRIVER_SERVER_URL)
        .withCapabilities({'browserName': 'chrome'})
        .build();

    const ssm = new Ssm();
    ssm.setMode(TEST_MODE);
    ssm.setPathToReferenceFolder('./ssm-ref-folder');
    ssm.setDriver(driver);

    return {
        promise: ssm.setSize(1024, 768),
        driver: driver,
        ssm: ssm
    }

}

module.exports = {
    assert,
    addComparing,
    SITE_URL,
    server,
    beforeEachInitialization
};
