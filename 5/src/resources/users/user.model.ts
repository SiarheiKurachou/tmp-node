import { Users } from '../../db';
import { ServerError } from '../../errors';
import { HttpStatusCode, Message, formatString } from '../../utils';
import { UserRecord } from '../../types';

const get = async (id: UserRecord['id']) => {
  const index = Users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new ServerError(formatString(Message.UserNotFound, [id]), HttpStatusCode.NotFound);
  }

  return Users[index];
};

const getAll = async () => Users;

const create = async (user: UserRecord) => {
  Users.push(user);
};

const remove = async (id: UserRecord['id']) => {
  const index = Users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new ServerError(formatString(Message.UserNotFound, [id]), HttpStatusCode.NotFound);
  }

  Users.splice(index, 1);
};

const getUserHobbies = async (id: UserRecord['id']) => {
  const index = Users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new ServerError(formatString(Message.UserNotFound, [id]), HttpStatusCode.NotFound);
  }

  return Users[index].hobbies;
};

const updateUserHobbies = async (id: UserRecord['id'], hobbies: UserRecord['hobbies']) => {
  const index = Users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new ServerError(formatString(Message.UserNotFound, [id]), HttpStatusCode.NotFound);
  }

  Users[index].hobbies = [...new Set([...Users[index].hobbies, ...hobbies])];
};

export { get, getAll, create, remove, getUserHobbies, updateUserHobbies };
