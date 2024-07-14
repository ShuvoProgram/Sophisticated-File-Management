import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/users'
import auth from '../../middleware/auth'
import { UserController } from './users.controller'

const router = express.Router();


router.post('/register', UserController.createUsers)
router.post('/login', UserController.loginUser)

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.VIEWER),
  UserController.getAllUsers
)

router.get(
  '/profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.VIEWER),
  UserController.ProfileUser
)

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.VIEWER),
  UserController.updateProfile
)

// router.patch(
//   '/:id',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   UserController.updateUser
// )

// router.get(
//   '/:id',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   UserController.getSingleUser
// )

// router.delete(
//   '/:id',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   UserController.deleteUser
// )


export const UserRoutes = router
