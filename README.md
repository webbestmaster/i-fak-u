# i-fak-u
i fak u test

## Install

### Dependencies

This needed only for nodeJs canvas, see more here - https://www.npmjs.com/package/canvas

> Ubuntu: sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++

> OS X: brew install pkg-config cairo libpng jpeg giflib

#### Test

1 - Install all dependencies for selenium-screen-master<br />
2 - Install mocha globally

>$ npm i && sudo npm i -g mocha

Run test

>$ npm test

#### Recommendations

Use for test mocha + mochawesome + mochawesome/addContext + chai.<br />
See ./test/test.js and ./test/test.sh as example to create beautiful test report.<br />
To see my solution run tests for this projects.
