import { IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';
import * as Model from './user.model';
import { HttpStatusCode, successResponseHandler, errorResponseHandler, getDataFromRequest } from '../../utils';
import { UserRecord, ResponseHeader } from '../../types';

type CreateUserRequestData = Pick<UserRecord, 'name' | 'email'>;

type UpdateUserHobbiesRequestData = Pick<UserRecord, 'hobbies'>;

const Path = {
  GetAll: /^\/api\/users$/,
  Create: /^\/api\/users$/,
  Remove: /^\/api\/users\/([^/]+)$/,
  GetUserHobbies: /^\/api\/users\/([^/]+)\/hobbies$/,
  UpdateUserHobbies: /^\/api\/users\/([^/]+)\/hobbies$/,
} as const;

const prepareResponseDataForUser = (user: UserRecord) => ({
  user: { id: user.id, name: user.name, email: user.email },
  links: {
    self: `/api/users/${user.id}`,
    hobbies: `/api/users/${user.id}/hobbies`,
  },
});

const prepareResponseDataForUserHobbies = (hobbies: UserRecord['hobbies'], id: UserRecord['id']) => ({
  hobbies,
  links: {
    self: `/api/users/${id}/hobbies`,
    user: `/api/users/${id}`,
  },
});

const getAll = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await Model.getAll();

    const headers: ResponseHeader[] = [{ name: 'Cache-Control', value: 'public, max-age=3600' }];
    const responseData = users.map((user) => prepareResponseDataForUser(user));
    successResponseHandler(res, HttpStatusCode.Ok, responseData, headers);
  } catch (err) {
    errorResponseHandler(res, err);
  }
};

const create = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data = (await getDataFromRequest(req)) as CreateUserRequestData;
    const user: UserRecord = { ...data, id: randomUUID(), hobbies: [] };
    await Model.create(user);

    const responseData = prepareResponseDataForUser(user);
    successResponseHandler(res, HttpStatusCode.Created, responseData);
  } catch (err) {
    errorResponseHandler(res, err);
  }
};

const remove = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // router has already checked that path and url match
    const id = String(Path.Remove.exec(req.url ?? '')?.[1]);
    await Model.remove(id);

    const responseData = { success: true };
    successResponseHandler(res, HttpStatusCode.Ok, responseData);
  } catch (err) {
    errorResponseHandler(res, err);
  }
};

const getUserHobbies = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // router has already checked that path and url match
    const id = String(Path.GetUserHobbies.exec(req.url ?? '')?.[1]);
    const hobbies = await Model.getUserHobbies(id);

    const headers: ResponseHeader[] = [{ name: 'Cache-Control', value: 'private, max-age=3600' }];
    const responseData = prepareResponseDataForUserHobbies(hobbies, id);
    successResponseHandler(res, HttpStatusCode.Ok, responseData, headers);
  } catch (err) {
    errorResponseHandler(res, err);
  }
};

const updateUserHobbies = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // router has already checked that path and url match
    const id = String(Path.UpdateUserHobbies.exec(req.url ?? '')?.[1]);
    const data = (await getDataFromRequest(req)) as UpdateUserHobbiesRequestData;
    await Model.updateUserHobbies(id, data.hobbies);
    const user = await Model.get(id);

    const responseData = prepareResponseDataForUser(user);
    successResponseHandler(res, HttpStatusCode.Ok, responseData);
  } catch (err) {
    errorResponseHandler(res, err);
  }
};

export { Path, getAll, create, remove, getUserHobbies, updateUserHobbies };
