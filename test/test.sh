#!/usr/bin/env bash

now="$(date +'%Y-%m-%d-%H-%M-%S')"
reportsFolder=./reports
reportName=auto-test-$now

mocha ./test/test.js --reporter mochawesome --reporter-options reportDir=$reportsFolder,reportFilename=${reportName}-test-1,reportTitle="Auto Test $now",inlineAssets=true
mocha ./test/test-2.js --reporter mochawesome --reporter-options reportDir=$reportsFolder,reportFilename=$reportName-test-2,reportTitle="Auto Test $now",inlineAssets=true
