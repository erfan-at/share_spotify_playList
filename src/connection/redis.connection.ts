'use strict'
const chulk=require('chalk')
const appConfig = require('../config/application');
const Redis = require("ioredis");
const redisClient = new Redis(appConfig.Redis);
const log = console.log;
// console.log('======> appConfig.redis: ', JSON.stringify(appConfig.redis));
log(chulk.red('======> appConfig.redis: ', JSON.stringify(appConfig.redis)))
module.exports = { redisClient }