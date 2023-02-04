import chulk from 'chalk'
import appConfig from '../config/application'
import Redis from "ioredis"
const redisClient = new Redis(appConfig.Redis)
// console.log('======> appConfig.redis: ', JSON.stringify(appConfig.redis));
export default redisClient 