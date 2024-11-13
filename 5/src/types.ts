import { IncomingMessage, ServerResponse } from 'http';

type UserRecord = {
  id: string;
  name: string;
  email: string;
  hobbies: string[];
};

type Route = {
  method: string;
  path: RegExp;
  handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
};

type ResponseHeader = {
  name: string;
  value: string;
};

export { UserRecord, Route, ResponseHeader };
