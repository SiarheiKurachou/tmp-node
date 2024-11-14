import { roleType } from "../postgresql/entities/user";
import { createUser, getUserByEmail,  } from "../repository/user.repository";

export function createNewUser(
  mail: string,
  password: string,
  role: roleType
) {
  return createUser(mail, password, role);
}

export function getUser(email: string) {
  return getUserByEmail(email);
}