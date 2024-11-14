import { DI } from '../server';
import { User, roleType } from '../postgresql/entities/user';

export const createUser = async (mail: string, password: string, role: roleType) => {
  try {
    const user = new User(mail, password, role);
    DI.userRepository.create(user);
    
    const userCreated = await DI.userRepository.findOne({ mail });
    return userCreated;
  } catch (err) {
    console.error("Error creating user: ", err);
  }
};

export const getUserByEmail = async (mail: string) => {
  try {
    const user = await DI.userRepository.findOne({ mail });
    return user;
  } catch (err) {
    console.error("Error finding user: ", err);
  }
};