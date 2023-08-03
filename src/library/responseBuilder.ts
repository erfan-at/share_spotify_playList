import { Response } from 'express';

export default {
  error(response: Response, status: any, error: any, message?: string) {
    const res = {
      status: status.toString(),
      error: error ? error : undefined,
      message: message ? message : undefined,
    };
    // res.message = global.trans(res.message);
    return response.status(status).send(res);
  },

  success(response: Response, data: any, message?: string) {
    const res = {
      status: '200',
      data: data ? data : undefined,
      message: message ? message : undefined,
    };
    return response.status(200).send({ response: res });
  },

  created(response: Response, data: any, message?: string) {
    const res = {
      status: '201',
      data: data ? data : undefined,
      message: message ? message : undefined,
    };
    return response.status(201).send({ response: res });
  },

  conflict(response: Response, data: any, message?: string) {
    const res = {
      status: '409',
      error: 'Conflict',
      data: data ? data : undefined,
      message: message ? message : undefined,
    };
    // res.message = global.trans(res.message);
    return response.status(409).send({ response: res });
  },
  badRequest(response: Response, data: any, message?: string) {
    const res = {
      status: '400',
      data: data ? data : undefined,
      error: 'bad_request',
      message: message ? message : undefined,
    };
    response.status(400).send({ response: res });
  },

  internal(response: Response, message?: string) {
    const res = {
      status: '500',
      error: 'internal_server_error',
      message: message ? message : 'internal server error',
    };
    return response.status(500).send({ response: res });
  },

  internalErr(response: Response, message?: string) {
    const res = {
      status: '500',
      error: 'internal_server_error',
      message: message ? message : 'Sorry!, Something went wrong',
    };
    return response.status(500).send(res);
  },

  internalFa(response: Response, message?: string) {
    const res = {
      status: '500',
      error: 'internal',
      message: message ? message : '.مشکلی پیش آمده است با پشتسبانی تماس بگیرید',
    };
    return response.status(500).send({ response: res });
  },

  notFound(response: Response, data: any, message?: string) {
    const res = {
      status: '404',
      error: 'not_found',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    // res.message = global.trans(res.message);
    response.status(404).send({ response: res });
  },

  unauthorized(response: Response, data: any, message?: string) {
    const res = {
      status: '401',
      error: 'unauthorized',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    // res.message = global.trans(res.message);
    response.status(401).send(res);
  },

  forbidden(response: Response, data: any, message?: string) {
    const res = {
      status: '403',
      error: 'forbidden',
      message: message ? message : undefined,
      data: data ? data : undefined,
    };
    // res.message = global.trans(res.message);
    return response.status(403).send(res);
  },

  notAcceptable(response: Response, message?: string) {
    const res = {
      status: '406',
      error: 'not_acceptable',
      message: message ? message : undefined,
    };
    // res.message = global.trans(res.message);
    return response.status(406).send(res);
  },

  // respHandler(response: Response, error: any, code: any) {
  //   const res = {
  //     status: code,
  //     error: code == 404 ? 'not_found' : code == 401 ? 'unauthorized' : code == 200 ? 'success' : code == 409 ? 'conflict' : code == 500 ? 'internal' : code == 400 ? 'badRequest' : code == 403 ? 'forbidden' : code == 406 ? 'notAcceptable' : 500,
  //     message: error,
  //   };
  //   response.status(parseInt(code)).send({ response: res })
  // }
};
