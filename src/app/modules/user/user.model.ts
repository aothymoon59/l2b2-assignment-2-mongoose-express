import { Schema, model } from 'mongoose';
import {
  TOrder,
  TUser,
  TUserAddress,
  TUserName,
  UserModel,
} from './user.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    _id: false,
  },
);

const userAddressSchema = new Schema<TUserAddress>(
  {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String, select: false },
  fullName: { type: userNameSchema },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: { type: userAddressSchema },
  orders: { type: [orderSchema] },
});

// creating custom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
