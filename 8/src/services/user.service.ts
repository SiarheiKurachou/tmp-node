import { createUser, getUserByName } from "../repository/user.repository";

export function createNewUser(username: string) {
  createUser(username);
}

export function getUser(username: string) {
  return getUserByName(username);
}