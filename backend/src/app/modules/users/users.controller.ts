
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IUser } from './users.interface';
import { UserService } from './users.service';
import { RequestHandler } from 'express-serve-static-core'
import config from '../../../config';


const createUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body
    const result = await UserService.createUser(user)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await UserService.loginUser(loginData)
  const { refreshToken, ...others } = result
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  })
})


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers()

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    data: result,
  })
})

//Get single user

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.getSingleUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An User retrieved successfully',
    data: result,
  })
})


// Delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has been deleted successfully !',
    data: result,
  })
})


const ProfileUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req?.user?.userEmail
    // console.log(userId);
    const result = await UserService.profileUser(email)
   sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully!",
    data: result,
  });

  } catch (error) {
     res.status(500).json({
      message: "Internal Server Error"
    })
  }
};

const updateProfile = catchAsync(async(req, res) => {
  const id = req?.user?.userId;
  const userData = req.body;
  const result = await UserService.updateProfile(id, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
     message: "User profile data Updated Successfully!",
    data: result,
  })
})

export const UserController = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  ProfileUser,
  updateProfile,
  loginUser,
  createUsers
}
