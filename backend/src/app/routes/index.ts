import express from 'express'
import { UserRoutes } from '../modules/users/users.route'
import { FileRoutes } from '../modules/file/file.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/file',
    route: FileRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
