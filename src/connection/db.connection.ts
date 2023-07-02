import { boolean } from 'joi'
import mongoose from 'mongoose'

// const connectDB = async () => {
//     try {
//         const DBconnect = await mongoose.connect("mongodb://localhost:27017/spotify")
//         return { statusCode: 200, DBconnect }
//     } catch (err) {
//         return { statusCode: 500, message: 'MongoDB connected!!' }
//         console.log('Failed to connect to MongoDB', err)
//     }
// }


// const connectWithRetry = function () {
//     const checkConnection = connectDB()
//     if (checkConnection.statusCode == 500)
//         setTimeout(connectWithRetry, 5000);
// }


// connectWithRetry();


// export { connectDB }

const connectWithRetry = async () => {
    // try {
    // console.log('try to connnect to mongo for first time...')
    await mongoose.connect("mongodb://localhost:27017/spotify", {
        serverSelectionTimeoutMS: 1000, // Timeout after 5s instead of 30s
        // socketTimeoutMS: 10, //
    })
    return { statusCode: 200, message: "DB connected" }
    // return true
    // } catch (err) {
    // console.clear()
    // console.log('err')
    // console.log(err)
    // console.log('err')
    // console.error('Failed to connect to mongo on startup - retrying in 4 sec');
    // return setTimeout(connectWithRetry, 10);
    // return connectWithRetry
    // }
}
export { connectWithRetry }
