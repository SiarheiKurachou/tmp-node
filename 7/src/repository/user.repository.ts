import UserModel from '../mongo/mongo-models/user';

export const createUser = async (username: string) => {
  try {
    const user = new UserModel({ id: username });
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    console.error("Error creating user: ", err);
  }
};

export const getUserByName = async (username: string) => {
  try {
    const user = await UserModel.findOne({ id: username });
    return user;
  } catch (err) {
    console.error("Error finding user: ", err);
  }
};