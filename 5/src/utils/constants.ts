const Message = {
  ResourceNotFound: 'The resource at the specified URL {0} not found',
  HttpMethodNotImplemented: 'The HTTP {0} method not implemented',
  UserNotFound: "User with id {0} doesn't exist",
} as const;

const HttpStatusCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
  NotImplemented: 501,
} as const;

export { HttpStatusCode, Message };
