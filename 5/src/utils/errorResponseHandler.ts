import { ServerResponse } from 'http';
import { ServerError } from '../errors';
import { HttpStatusCode } from './constants';

const errorResponseHandler = (res: ServerResponse, err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  const resData = JSON.stringify({ data: null, error: message });

  res.statusCode = err instanceof ServerError ? err.statusCode : HttpStatusCode.InternalServerError;
  res.setHeader('Content-Type', 'application/json');
  res.end(resData);
};

export { errorResponseHandler };
