/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IFileId = {
  fileId: string
}

export type ILoginUser = {
  email: string
  password: string
}

// Response after user login
export type ILoginUserResponse = {
  userEmail: string
  accessToken: string
  refreshToken?: string
}

// Response after refreshing access token
export type IRefreshTokenResponse = {
  accessToken: string
}

export type TSocialAuth = {
  name: string;
  email: string;
  // avatar: string;
};

export type IUser = {
  _id: string
  name: string
  email: string
  role: string
  password: string
  passwordChangedAt?: Date
  files: Array<{ fileId: string }>
}

export type IProfile = {
  userId: string;
  role: string;
}

export type UserModel = Model<IUser> & {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'name' | 'email' | 'role' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}
