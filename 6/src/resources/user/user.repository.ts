import { UserEntity } from '../../schemas';
import { users } from '../../data';

const getUser = async (id: UserEntity['id']) => users.find((user) => user.id === id);

export { getUser };
