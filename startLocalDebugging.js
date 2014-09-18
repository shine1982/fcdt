//test keys
//change these with your app keys
var appId = "iwGsOVQf75GczDN5rbPWBnpVjRnihfldbFx7wpYq";
var javaScriptKey = "gTUfi1ECtDr29soNjEAdXmCUcwrUGKvw5NVMGHTw";
var masterKey = "ovEmslcMH3vtmu0e32wQoDllUJemzcur0uYK7dZ5";

//local module
global.Parse = require("./../parse-cloud-debugger").Parse;

//npm module
//global.Parse = require("parse-cloud-debugger").Parse;

//init parse modules
Parse.initialize(appId, javaScriptKey, masterKey);

//run cloud code
require('./cloud/main.js');