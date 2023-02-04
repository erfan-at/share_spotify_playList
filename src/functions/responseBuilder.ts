import { Router,Response } from 'express';

// export default {
 function error (response:Response, status:any, error:any, message:string) {
    const res = {
      status: status.toString(),
      error: error,
      message: message
    };
    // res.message = global.trans(res.message);
 return response.status(status).send(res);
  }

   function success (response:Response, data:any, message:string) {
    const res = {
      status: '200',
      data: data ? data : undefined,
      message: message ? message : undefined,
    };
    return response.status(200).send({ response: res });
  }

  function created (response:Response, data:any, message:string) {
    const res = {
      status: '201',
      data: data ? data : undefined,
      message: message ? message : undefined,
    };
    return response.status(201).send({ response: res });
  }

  function conflict (response:Response, data:any, message:string){
    const res = {
      status: '409',
      data: data ? data : undefined,
      message: message ? message : undefined,
    };
    // res.message = global.trans(res.message);
    return response.status(409).send({ response: res });
  }

  function badRequest (response:Response, data:any, message:string) {
    const res = {
      status: '400',
      data: data ? data : undefined,
      message: message ? message : "bad_request",
    };
    response.status(412).send({ response: res })
  }

  function internal (response:Response, message:string) {
    const res = {
      status: '500',
      error: 'internal',
      message: message ? message : 'internal server error'
    };
    return response.status(500).send({ response: res })
  }

  function internalFa (response:Response, message:string) {
    const res = {
      status: '500',
      error: 'internal',
      message: message ? message : ".مشکلی پیش آمده است با پشتسبانی تماس بگیرید"
    };
    return response.status(500).send({ response: res })
  }

  function notFound (response:Response, message:string) {
    const res = {
      status: '404',
      error: 'not_found',
      message: message,
    };
    // res.message = global.trans(res.message);
    response.status(404).send({ response: res })
  }

  function queued (response:Response) {
    const res = {
      status: 'queued',
    };
    // res.message = global.trans(res.message);
  return response.status(200).send({ response: res });
  }

  function unauthorized (response:Response, error:any) {
    const res = {
      status: '401',
      error: 'unauthorized',
      message: error,
    };
    // res.message = global.trans(res.message);
    response.status(401).send(res);
  }

  function forbidden (response:Response, error:any){
    const res = {
      status: '403',
      error: 'forbidden',
      message: error,
    };
    // res.message = global.trans(res.message);
  return  response.status(403).send(res);
  }

 function notAcceptable(response:Response, error:any) {
    const res = {
      status: '406',
      error: 'not_acceptable',
      message: error,
    };
    res.message = global.trans(res.message);
    response.status(406).send(res);
  }

 function respHandler(response:Response, error:any, code:any) {
    const res = {
      status: code,
      error: code == 404 ? 'not_found' : code == 401 ? 'unauthorized' : code == 200 ? 'success' : code == 409 ? 'conflict' : code == 500 ? 'internal' : code == 400 ? 'badRequest' : code == 403 ? 'forbidden' : code == 406 ? 'notAcceptable' : 500,
      message: error,
    };
    response.status(parseInt(code)).send({ response: res })
  }
// };
export default{error,success,internal,internalFa,notAcceptable
    ,notFound,respHandler,forbidden,queued,badRequest,conflict,created}