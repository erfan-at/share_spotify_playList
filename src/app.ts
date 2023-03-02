import express, { Application, Express, Request, Response } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';
import middlewares from './middlewares';
const app: Application = express();

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', middlewares.auth.authenticateToken, indexRouter);


// // catch 404 and forward to error handler
// app.use((req, res, next) => { next(createError(404)) });
// // error handler

// app.use((err:any, req:Request, res:Response) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//  res.status(err.status || 500);
//   return res.render('error');
// });

// export default { app, redisClient }
// export { app, redisClient }
export { app }