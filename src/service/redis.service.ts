import { redisClient } from '../connection/redis.connection'
import appConfig from '../config/application'

export default {
    async put(key, value, timeout = null) {
        try {
            await redisClient.set(key, JSON.stringify(value));
            if (timeout) { await this.setExpire(key, timeout) }
        } catch (e) { console.error(`ERROR_009 => ${e}`) }
    },
    async get(key) {
        try {
            const data = await redisClient.get(key);
            return JSON.parse(data);
        } catch (e) { console.error(`ERROR_010 => ${e}`) }
    },

    // async getByPattern(pattern) {
    //     try {
    //         const data = await redisClient.keys(pattern);
    //         return JSON.parse(cryptography.base64.decode(await this.get(data[0])))
    //         // return JSON.parse(data);
    //     } catch (e) { console.error(`ERROR_010 => ${e}`) }
    // },
    // getPendingRequestsByKey: async (key)  {
    //     try {
    //         const data = await this.get(key);
    //         const stream = redisClient.scanStream({
    //             match: `${data.username + appConfig.request.pendingPrefix}*`,
    //         });
    //         stream.on('data', (keys) => {
    //             if (keys.length) {
    //                 console.info(keys);
    //                 // const pipeline = cache.redis.pipeline();
    //                 keys.forEach(async (key) => {
    //                     const req = JSON.parse(await this.get(key));
    //                     console.info(req.cache);
    //                 });
    //                 // pipeline.exec();
    //             }
    //         });
    //         return data.username;
    //     } catch (e) { console.error(`ERROR_011 => ${e}`) }
    // },

    async setExpire(key, value) {
        try {
            await redisClient.expire(key, value);
        } catch (e) { console.error(`ERROR_013 => ${e}`) }
    }
}