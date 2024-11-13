import { IncomingMessage } from 'http';

// eslint-disable-next-line arrow-body-style
const getDataFromRequest = (req: IncomingMessage): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      resolve(JSON.parse(data));
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};

export { getDataFromRequest };
