import { ServerResponse } from 'http';
import { ResponseHeader } from '../types';

const successResponseHandler = (
  res: ServerResponse,
  statusCode: number,
  data: object,
  headers: ResponseHeader[] = [],
) => {
  const resData = JSON.stringify({ data, error: null });

  headers.forEach((header) => res.setHeader(header.name, header.value));
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(resData);
};

export { successResponseHandler };
