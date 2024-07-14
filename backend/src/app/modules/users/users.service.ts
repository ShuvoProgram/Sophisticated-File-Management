import  bcrypt  from 'bcrypt';
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ApiError from '../../../error/ApiError'
import { ILoginUser, ILoginUserResponse, IUser } from './users.interface'
import { User } from './users.model'
import isUserFound from './users.utilis'
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';


const createUser = async (user: IUser): Promise<IUser | null> => {

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create')
  }
  return createdUser
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  //create access token & refresh token
  const { email: userEmail, role } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    userEmail,
    accessToken,
    refreshToken,
  }
}

//get all users

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find({})
  return result
}

//get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}


// Delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }
  const result = await User.findByIdAndDelete(id)
  return result
}

const profileUser = async (email: string): Promise<IUser | null> => {
  console.log(email)
  if (
    !(await User.findOne({
      email,
    }))
  ) {
    throw new ApiError(400, 'User not found')
  };

  const data = await User.findOne({
    email,
  })
  return data;
}

const updateProfile = async (userId: string, payload: IUser): Promise<IUser | null> => {
  if(!(await isUserFound(userId))) {
    throw new ApiError(400, "User not found");
  };

  const {name, ...userData} = payload;
  if (name && Object.keys(name).length) {
    Object.keys(name).map((field) => {
      const nameKey = `name.${field}`;
      (userData as any)[nameKey] = name[field as keyof typeof name];
    });
  }

  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bycrypt_salt_rounds)
  )

  const data = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true
  });

  return data;
}

export const UserService = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  profileUser,
  updateProfile,
  createUser,
  loginUser
}
