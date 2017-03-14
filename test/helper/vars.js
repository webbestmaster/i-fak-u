const fs = require('fs');

const WebDriver = require('selenium-webdriver');
const Ssm = require('selenium-screen-master');
const addContext = require('mochawesome/addContext');

const resemble = require('node-resemble');
const assert = require('chai').assert;
const util = require('./test-util');

const PORT = 4444;
const OS_NAME = util.detectOsName();

const SITE_URL = 'http://localhost:3003/';
const WEB_DRIVER_SERVER_URL = 'http://localhost:' + PORT + '/wd/hub';

const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
const server = new SeleniumServer('./driver/selenium-server-standalone-3.0.1.jar', {
    port: PORT,
    jvmArgs: ['-Dwebdriver.chrome.driver=./driver/' + OS_NAME + '/chromedriver']
});

const TEST_MODE = (new Ssm()).MODE.COLLECT; // TEST || COLLECT

function addComparing(comparing, context) {

    addContext(context, {
        title: 'Actual',
        value: util.createTag('img', ['src', comparing.actual])
    });

    addContext(context, {
        title: 'Expect',
        value: util.createTag('img', ['src', comparing.expect])
    });

    addContext(context, {
        title: 'Different',
        value: util.createTag('img', ['src', comparing.different])
    });

    addContext(context, {
        title: 'Different Info',
        value: comparing.info
    });

}

module.exports = {
    Ssm,
    assert,
    util,
    addComparing,
    WebDriver,
    SITE_URL,
    WEB_DRIVER_SERVER_URL,
    server,
    TEST_MODE
};
