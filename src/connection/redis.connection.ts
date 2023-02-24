import chulk from 'chalk'
// import appConfig from '../config/application'
import Redis from "ioredis"
// const redisClient = new Redis(appConfig.redis)


// function redisConnectretry() {
//     console.log('======> appConfig.redis: ', JSON.stringify(appConfig.redis));
//     // const redisClient = new Redis('localhost:6379')
//     return new Redis('localhost:6379')

//     // return { code: 200, redisClient: redisClient, message: "redis connected succcessfully" }
// }
// redisConnectretry()

// redisClient.on('error', () => {
//     console.log("redis err")
// })
// async function redisConnectretry() {
// try {
console.log("start con to redis")
const redisClient = new Redis({
    port: 6379, host: "127.0.0.1",
    connectTimeout: 4000,
    lazyConnect: true,

    // , {
    // connectTimeout: 1000,
    // maxRetriesPerRequest: 3,
}
);
// await redisClient.connect();
redisClient.connect();
redisClient.on('error', (err) => {
    console.log('**********')
    console.log("err")
    console.log(err)
    console.log('**********')
})

redisClient.on('connect', () => {
    console.log('****connect******')
})

// return { redisClient: redisClient }
// } catch (e) {
//     return { code: 500, redisClient: redisClient }

// }
// return redisClient
// }
export { redisClient }
// export { redisConnectretry }