import { DI } from '../server';
import { User } from '../postgresql/entities/user';

export const createUser = async (username: string) => {
  try {
    const user = new User(username);
    DI.userRepository.create(user);
    
    const userCreated = await DI.userRepository.findOne({ name: username });
    return userCreated;
  } catch (err) {
    console.error("Error creating user: ", err);
  }
};

export const getUserByName = async (username: string) => {
  try {
    const user = await DI.userRepository.findOne({ name: username });
    return user;
  } catch (err) {
    console.error("Error finding user: ", err);
  }
};