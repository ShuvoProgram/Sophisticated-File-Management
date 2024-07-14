/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, UserModel } from './users.interface'
import validator from 'validator'

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    role: {
      type: String,
      enum: ['viewer', 'admin', 'editor'],
      default: 'viewer',
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      maxlength: 20,
      select: false,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    files: [
      {
        fileId: {
          type: String,
          ref: 'File',
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

// Pre-save hook for password hashing and other modifications
userSchema.pre('save', async function (next) {
  // If the password has not been modified, continue
  if (!this.isModified('password')) return next()

  const user = this

  // Hashing user password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds), // Make sure config.bycrypt_salt_rounds is a valid number
  )


  // Update passwordChangedAt if it's not set
  if (!user.passwordChangedAt) {
    user.passwordChangedAt = new Date()
  }

  next()
})

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne(
    { email },
    { id: 1, email: 1, password: 1, role: 1, needsPasswordChange: 1 }
  )
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

export const User = model<IUser, UserModel>('User', userSchema)
