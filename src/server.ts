#!/usr/bin/env node
import http from 'http';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { connectWithRetry } from './connection/db.connection';
// import { redisConnectretry } from './connection/redis.connection'
import app from './app';
// const port = normalizePort(process.env.PORT || '3000');
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
async function bootstrap(): Promise<any> {
  // try {
  // console.clear()
  // await connectWithRetry()
  const DBconnectionsuccessfull = await connectWithRetry();
  // await redisConnectretry()
  if (DBconnectionsuccessfull.statusCode == 200) {
    // console.log(DBconnectionsuccessfull)
    // connection = DBconnectionsuccessfull.connection
    return server.listen(port, () => {
      // console.clear()
      console.log(chalk.white.green.bold('✔ [success] server listen to', port, '💥'), '\n \n \n');
    });
  } else {
    server.close();
  }
}
bootstrap();

mongoose.connection.on('connecting', function () {
  console.log(chalk.blue('trying to establish a connection to mongo'));
});
mongoose.connection.on('connected', function () {
  console.log(chalk.green('mongo connected successfully '));
  // return bootstrap()
});
mongoose.connection.on('disconnected', async (err) => {
  console.log(chalk.red("mongoose 'disconnected !!  server closed "));
  server.close();
  return setTimeout(bootstrap, 4000);
  // return setTimeout(connectWithRetry, 4000);
});
// mongoose.connection.on('reconnected', function () {
//   console.log('++Reconnected to MongoDB++');
// });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Force to close the MongoDB conection');
    process.exit(0);
  });
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥');
  // console.error({ message: err.message, stack: err.stack });
});
// Handle uncaughtException errors globally
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception!  Sutting down...');
  console.error({ message: err.message, stack: err.stack });
  // Shutdown application
  process.exit(1);
});
