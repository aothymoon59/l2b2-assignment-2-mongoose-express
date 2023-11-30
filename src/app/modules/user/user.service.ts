import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// create user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
  return result;
};

// get all user
const getAllUsersFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });

  return result;
};

// get single user by id
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// update user by id
const updateUserFromDB = async (userId: number, user: TUser) => {
  await User.updateOne({ userId }, { $set: user }, { new: true });

  const result = await User.findOne({ userId });
  return result;
};

// delete a user
const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

// Add New Product in Order
const addNewProductInUserIntoDb = async (userId: number, order: TOrder) => {
  const result = await User.updateOne(
    { userId },
    {
      $push: {
        orders: order,
      },
    },
    { new: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addNewProductInUserIntoDb,
};
