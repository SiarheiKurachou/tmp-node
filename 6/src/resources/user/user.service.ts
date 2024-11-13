import { UserEntity } from '../../schemas';
import { AppError } from '../../errors';
import { HttpStatusCode, Message } from '../../utils';
import * as repository from './user.repository';

const checkAuthorization = async (id: UserEntity['id'] | undefined) => {
  if (!id) {
    throw new AppError(Message.UserMustBeAuthorized, HttpStatusCode.Unauthorized);
  }

  const user = await repository.getUser(id);
  if (!user) {
    throw new AppError(Message.UserNotAuthorized, HttpStatusCode.NotFound);
  }
};

export { checkAuthorization };
