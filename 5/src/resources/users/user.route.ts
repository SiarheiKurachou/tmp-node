import { Path, getAll, create, remove, getUserHobbies, updateUserHobbies } from './user.service';
import { Route } from '../../types';

const routes: Route[] = [
  { method: 'GET', path: Path.GetAll, handler: getAll },
  { method: 'POST', path: Path.Create, handler: create },
  { method: 'DELETE', path: Path.Remove, handler: remove },
  { method: 'GET', path: Path.GetUserHobbies, handler: getUserHobbies },
  { method: 'PATCH', path: Path.UpdateUserHobbies, handler: updateUserHobbies },
];

export { routes };
