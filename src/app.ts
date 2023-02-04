import express, {Application, Express, Request, Response } from 'express';
import mongoose from 'mongoose'
import createError  from 'http-errors';
import path  from 'path';
import cookieParser  from 'cookie-parser';
import morgan  from 'morgan';
// import indexRouter  from './routes/index';
import  redisClient  from './connection/redis.connection';

const app: Application = express();

// mongoose.connect("mongodb://localhost:27017/share_Spotify_PlayList", {
//   // useUnifiedTopology: true,
//   // useNewUrlParser: true,
//   // useFindAndModify: false,
// }).then(() => {
//   console.log('Connected to the mongoDB...');
// }).catch((err) => console.log({ message: err.message, stack: err.stack }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
app.get("/", (req:Request, res:Response) => {
  res.send("good")
})
// catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404)) });
// error handler
app.use((err:any, req:Request, res:Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
 res.status(err.status || 500);
  return res.render('error');
});

// export default { app, redisClient }
export { app, redisClient }