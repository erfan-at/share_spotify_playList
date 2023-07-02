import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import indexRouter from './routes/index';
import middlewares from './middlewares';
const app: Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', middlewares.auth.authenticateToken, indexRouter);

app.get('/health', (req, res) => {
  return res.send('ok');
});
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
export { app };
