import express, { Application, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import indexRouter from './routes/index';
import Middlewares from './middlewares/index';
const app: Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', Middlewares.auth, indexRouter);

app.get('/health', (req: Request, res: Response) => {
  return res.send('ok');
});
// // catch 404 and forward to error handler
// app.use((req:Request, res:Response, next) => { next(createError(404)) });
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
export default app;
